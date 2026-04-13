"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDoctors, seedDoctors } from "@/lib/api";
import styles from "./page.module.css";

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search state with debounce
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  
  const router = useRouter();

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors on load
  useEffect(() => {
    fetchDoctors();
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
      await seedDoctors();
      await fetchDoctors();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) return <div className={styles.loader}>Injecting modern aesthetics... Loading doctors...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Available Doctors</h1>
      </header>

      {/* Modern Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <input 
            type="text"
            placeholder="Search by Name, Specialization, or Speciality..."
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

      {/* Group doctors by specialization */}
      {(() => {
        const filteredDoctors = doctors.filter((doc: any) => 
          doc.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
          doc.specialization?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          doc.location?.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        if (filteredDoctors.length === 0) {
          return (
            <div className={styles.emptyState}>
               <svg style={{margin: '0 auto', marginBottom: '1rem', color: '#94a3b8'}} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
               </svg>
               <h3 style={{color: '#334155', marginBottom: '0.5rem'}}>No Doctors Found</h3>
               <p style={{color: '#64748b', marginBottom: '1rem'}}>There are no specialists available at the moment.</p>
               {/* Simple english comment: Add a button to load demo data if none exists */}
               <button onClick={handleSeed} disabled={isSeeding} className={styles.seedAction}>
                 {isSeeding ? "Seeding..." : "Start Seeding Mock Data ✨"}
               </button>
            </div>
          );
        }

        // Simple english comment: Group the filtered doctors by their specialization
        const grouped: { [key: string]: any[] } = {};
        for (const doc of filteredDoctors) {
          const spec = doc.specialization || "Other";
          if (!grouped[spec]) grouped[spec] = [];
          grouped[spec].push(doc);
        }

        // Simple english comment: Define desired order to match request roughly
        const order = ["General Physician", "Cardiologist", "Dermatologist", "Pediatrician", "Gynecologist", "Neurologist", "Psychiatrist", "Orthopedician"];
        
        // Sort keys based on requested order, pushing unlisted ones to the end
        const sortedSpecs = Object.keys(grouped).sort((a, b) => {
           let indexA = order.indexOf(a);
           let indexB = order.indexOf(b);
           if (indexA === -1) indexA = 999;
           if (indexB === -1) indexB = 999;
           return indexA - indexB;
        });

        // Simple english comment: Map over each specialization and render a horizontal list
        return sortedSpecs.map(spec => (
          <div key={spec} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{spec}</h2>
              <Link href={`/doctors?specialization=${encodeURIComponent(spec)}`} className={styles.seeAllBtn}>
                ... SEE ALL
              </Link>
            </div>
            
            <div className={styles.scrollContainer}>
              {grouped[spec].map((doc: any) => (
                <div key={doc._id} className={styles.card}>
                  <div>
                    {/* Profile Image Banner */}
                    <div className={styles.cardHeader}>
                      {doc.photoUrl ? (
                         <img src={doc.photoUrl} alt={doc.name} className={styles.avatar} />
                      ) : (
                         <div className={styles.avatarFallback}>👨‍⚕️</div>
                      )}
                      <div>
                        <h3 className={styles.docName}>{doc.name}</h3>
                        <p className={styles.docSpec}>{doc.specialization}</p>
                      </div>
                    </div>
                    
                    <div className={styles.cardMeta}>
                       <span className={styles.ratingBadge}>⭐ {doc.rating || 'N/A'}</span>
                       {doc.consultationModes && (
                          <span className={styles.modeBadge}>
                             {doc.consultationModes.includes('online') ? 'Online Avail' : 'In-Person'}
                          </span>
                       )}
                    </div>
                  </div>
                  
                  {/* View Profile Action */}
                  <Link 
                    href={`/doctor/${doc._id}`}
                    target="_blank"
                    className={styles.bookBtn}
                  >
                    View Profile & Book
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ));
      })()}
      
    </div>
  );
}
