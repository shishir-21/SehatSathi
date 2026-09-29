import Link from "next/link";
export default function Home() {
  return <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">Your health, supported by AI</div>
    <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">Welcome to <span className="text-blue-700">MediBrain</span></h1>
    <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Get AI-powered health guidance, explore hospitals, and keep your health information in one place.</p>
    <div className="mt-10 flex flex-wrap justify-center gap-4">
      <Link href="/ai-assistant" className="rounded-full bg-blue-600 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-blue-700">Open AI Assistant</Link>
      <Link href="/hospitals" className="rounded-full border border-blue-200 bg-white px-7 py-3 font-bold text-blue-700 transition hover:bg-blue-50">Explore Hospitals</Link>
    </div>
  </div>;
}
