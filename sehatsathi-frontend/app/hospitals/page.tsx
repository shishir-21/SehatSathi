"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHospitals, seedHospitals } from "@/lib/api";
import styles from "./hospitals.module.css";

export default function HospitalsDirectory() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // Search state with debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isListening, setIsListening] = useState(false);

  async function fetchAll() {
    try {
      const data = await getHospitals();
      setHospitals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  // Debounce effect logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const startVoiceSearch = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Voice Search. Please use Chrome/Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const speech = event.results[0][0].transcript;
      setSearchQuery(speech);
      setDebouncedSearch(speech);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSeed = async () => {
    try {
      setIsSeeding(true);
      await seedHospitals();
      await fetchAll();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) return <div className={styles.loader}>Injecting modern aesthetics... Loading Hospitals...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
         <div className={styles.titleGroup}>
           <h1 className={styles.title}>Hospitals in India</h1>
           <p className={styles.subtitle}>Find the best care facilities and their respective specialists.</p>
         </div>
      </header>

      {/* Modern Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <input 
            type="text"
            placeholder="Search by Hospital Name or City... (Type or speak)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') setDebouncedSearch(searchQuery); }}
            className={styles.searchInput}
          />
          <button 
            type="button"
            title="Voice Search"
            onClick={startVoiceSearch}
            className={`${styles.micBtn} ${isListening ? styles.micBtnActive : ''}`}
          >
            🎤
          </button>
        </div>
        <button 
          onClick={() => setDebouncedSearch(searchQuery)}
          className={styles.searchBtn}
        >
          Search
        </button>
      </div>

      <div className={styles.grid}>
        {hospitals
          .filter((hosp: any) => 
            hosp.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
            hosp.location?.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((hosp: any) => (
          <div key={hosp._id} className={styles.card}>
             <div className={styles.imageWrapper}>
               <div 
                 className={styles.cardImage} 
                 style={{ backgroundImage: `url(${hosp.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80'})` }} 
               />
             </div>
             
             <div className={styles.cardContent}>
                 <h2 className={styles.hospName}>{hosp.name}</h2>
                 <p className={styles.locationContainer}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                   {hosp.location}
                 </p>
                 <span className={styles.ratingBadge}>
                    ⭐ {hosp.rating}
                 </span>
                 <p className={styles.description}>{hosp.description}</p>
                 
                 <Link 
                   href={`/hospitals/${hosp._id}`}
                   className={styles.bookBtn}
                 >
                   View Details & Doctors
                 </Link>
             </div>
          </div>
        ))}
        {hospitals.length === 0 && (
          <div className={styles.emptyState}>
             <svg style={{margin: '0 auto', marginBottom: '1rem', color: '#94a3b8'}} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
             </svg>
             <h3 style={{color: '#334155', marginBottom: '0.5rem'}}>No Hospitals Active</h3>
             <p style={{color: '#64748b', marginBottom: '1rem'}}>There are no facilities loaded in the system right now.</p>
             <button onClick={handleSeed} disabled={isSeeding} className={styles.seedAction}>
               {isSeeding ? "Loading..." : "Load Test Hospitals ✨"}
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
