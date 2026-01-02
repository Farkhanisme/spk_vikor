import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, Shield, Settings } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans antialiased text-slate-800 overflow-x-hidden relative">
      {/* 1. Dekorasi Garis Atas */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      {/* 2. Dekorasi Blobs (Penyebab ruang kosong jika tanpa overflow-hidden) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <main className="relative z-10 w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium transition-all hover:bg-indigo-100">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-ping"></span>
          SPK Digital Solution
        </div>

        {/* Hero Section */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Decision Making <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Simplified.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Platform Sistem Pendukung Keputusan dengan metode{" "}
          <strong className="text-slate-700">VIKOR</strong>. Bantu Anda
          menemukan solusi terbaik yang objektif, cepat, dan akurat.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/kriteria")}
            className="group flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-200 w-full sm:w-auto"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* <button className="px-8 py-4 bg-white text-slate-600 font-semibold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto">
            Pelajari Dokumentasi
          </button> */}
        </div>

        {/* Feature Grid - Minimalist */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-12">
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
              <BarChart2 size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Analisis Akurat</h3>
            <p className="text-sm text-slate-500 mt-1">
              Algoritma VIKOR yang presisi.
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
              <Settings size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Fleksibel</h3>
            <p className="text-sm text-slate-500 mt-1">
              Kustomisasi kriteria tak terbatas.
            </p>
          </div>

          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="font-bold text-slate-800">Objektif</h3>
            <p className="text-sm text-slate-500 mt-1">
              Hasil tanpa bias subjektivitas.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="mt-20 text-slate-400 text-sm">
        © {new Date().getFullYear()} VIKOR Decision Engine. Built for
        Efficiency.
      </footer>
    </div>
  );
};

export default Welcome;
