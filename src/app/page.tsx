import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <LeafIcon className="h-6 w-6 text-green-600" />
          <span className="ml-2 text-lg font-bold text-slate-800 dark:text-slate-100">DietTracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-green-600 transition-colors" href="/features">
            Fitur
          </Link>
          <Link className="text-sm font-medium hover:text-green-600 transition-colors" href="/about">
            Tentang
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">Masuk</Button>
          </Link>
          <Link href="/onboarding">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Mulai</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6 text-center max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
              Gaya Hidup Sehat, <span className="text-green-600">Tanpa Tersiksa.</span>
            </h1>
            <p className="mt-4 mx-auto max-w-[700px] text-lg text-slate-600 dark:text-slate-300 md:text-xl leading-relaxed">
              Pantau nutrisi, rencanakan porsi makan, dan diskusikan target kalori Anda dengan Asisten AI pintar yang peduli pada kesehatan fisik & mental Anda.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/onboarding">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-full px-8">
                  Mulai Program Anda
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8">
                  Masuk ke Akun
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-900 flex justify-center">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CalculatorIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Kalkulator Cerdas</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Hitung BMI, BMR, dan TDEE secara otomatis untuk menemukan target kalori harian terbaik Anda.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <CameraIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">AI Food Scanner</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Foto makanan Anda, dan biarkan AI kami mengestimasi kalori serta makronutrien secara instan.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <MessageCircleIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">Asisten Diet Personal</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Konsultasikan keluhan atau tanya rekomendasi menu sehat kapan saja dengan AI Dietitian kami.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-slate-950">
        <p className="text-xs text-slate-500 dark:text-slate-400">© 2026 DietTracker. All rights reserved. Bukan pengganti anjuran medis.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Syarat & Ketentuan
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privasi
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function LeafIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 14 6c.5 0 1.2 1.5 2 2a7 7 0 1 1-5 12Z" />
      <path d="M11 20c-1-3.5 0-8 3-12" />
    </svg>
  );
}

function CalculatorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  );
}

function CameraIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
