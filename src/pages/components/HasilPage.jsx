/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Trophy,
  ArrowLeft,
  RefreshCw,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
} from "lucide-react";

const HasilPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [finalResults, setFinalResults] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [dataPerhitungan, setDataPerhitungan] = useState(null);

  useEffect(() => {
    const criteria = location.state?.criteria || [];
    const alternatives = location.state?.alternatives || [];

    if (criteria.length > 0 && alternatives.length > 0) {
      // --- LANGKAH 1: Menentukan f* (Ideal) dan f- (Anti-Ideal) ---
      const fStar = {};
      const fMinus = {};

      criteria.forEach((c) => {
        const values = alternatives.map((alt) => alt.values[c.id] || 0);
        if (c.type === "benefit") {
          fStar[c.id] = Math.max(...values);
          fMinus[c.id] = Math.min(...values);
        } else {
          fStar[c.id] = Math.min(...values);
          fMinus[c.id] = Math.max(...values);
        }
      });

      // --- LANGKAH 2: Menghitung Nilai S (Utility) dan R (Regret) ---
      const computedSteps = alternatives.map((alt) => {
        let S = 0;
        let R_vals = [];
        const detailPerKriteria = {};

        criteria.forEach((c) => {
          const weight = parseFloat(c.weight) || 0;
          const val = alt.values[c.id] || 0;
          const range = fStar[c.id] - fMinus[c.id];

          // Rumus: w * (f* - f) / (f* - f-)
          const score =
            range === 0
              ? 0
              : weight * ((fStar[c.id] - val) / (fStar[c.id] - fMinus[c.id]));

          detailPerKriteria[c.id] = score;
          S += score;
          R_vals.push(score);
        });

        return {
          ...alt,
          S,
          R: Math.max(...R_vals),
          stepScores: detailPerKriteria,
        };
      });

      // --- LANGKAH 3: Menghitung Nilai Q (Indeks VIKOR) ---
      const S_vals = computedSteps.map((r) => r.S);
      const R_vals = computedSteps.map((r) => r.R);

      const S_star = Math.min(...S_vals);
      const S_minus = Math.max(...S_vals);
      const R_star = Math.min(...R_vals);
      const R_minus = Math.max(...R_vals);

      const v = 0.5; // Strategi bobot mayoritas (consensus)

      const final = computedSteps.map((r) => {
        const S_term =
          S_minus - S_star === 0 ? 0 : (r.S - S_star) / (S_minus - S_star);
        const R_term =
          R_minus - R_star === 0 ? 0 : (r.R - R_star) / (R_minus - R_star);

        // Rumus Q: v * [(S - S*) / (S- - S*)] + (1-v) * [(R - R*) / (R- - R*)]
        const Q = v * S_term + (1 - v) * R_term;
        return { ...r, Q };
      });

      setDataPerhitungan({
        criteria,
        fStar,
        fMinus,
        S_star,
        S_minus,
        R_star,
        R_minus,
        v,
      });

      setFinalResults([...final].sort((a, b) => a.Q - b.Q));
    } else {
      navigate("/kriteria");
    }
  }, []);

  const handleReset = () => navigate("/", { replace: true });

  if (finalResults.length === 0 || !dataPerhitungan) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Hasil Analisis
            </h2>
            <p className="text-slate-500 font-medium italic">
              Metode VIKOR: Optimisasi Multikriteria & Solusi Kompromi
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center justify-center px-6 py-3 bg-rose-50 text-rose-600 border border-rose-100 font-bold rounded-2xl hover:bg-rose-100 transition-all shadow-sm"
          >
            <RefreshCw size={18} className="mr-2" /> Mulai Ulang Sesi
          </button>
        </header>

        {/* Highlight Pemenang */}
        <div className="bg-slate-900 rounded-[3rem] p-10 text-white mb-8 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-400/20 rounded-2xl text-yellow-400">
                <Trophy size={32} />
              </div>
              <span className="font-black uppercase tracking-[0.3em] text-xs text-indigo-300">
                Rekomendasi Terbaik (Q Terkecil)
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter leading-tight">
              {finalResults[0].name}
            </h1>
            <div className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-emerald-400 font-mono font-bold text-2xl tracking-widest">
                Q = {finalResults[0].Q.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Toggle Langkah Detail */}
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="w-full mb-8 py-4 bg-white border border-slate-200 rounded-3xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
        >
          {showSteps ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          {showSteps
            ? "Sembunyikan Proses Hitung"
            : "Lihat Langkah-Langkah Perhitungan Lengkap"}
        </button>

        {/* Detail Perhitungan (Hidden by Default) */}
        {showSteps && (
          <div className="space-y-8 mb-12 animate-in fade-in duration-500">
            {/* Tabel f* dan f- */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs">
                  01
                </span>
                Nilai Ideal Bersama (f*) dan Anti-Ideal (f-)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                      <th className="py-4 text-left">Kriteria</th>
                      <th className="py-4 text-center">Tipe</th>
                      <th className="py-4 text-center text-emerald-600">
                        Ideal (f*)
                      </th>
                      <th className="py-4 text-center text-rose-600">
                        Anti-Ideal (f-)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerhitungan.criteria.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-slate-50 hover:bg-slate-50/50"
                      >
                        <td className="py-4 font-bold text-slate-700">
                          {c.name}
                        </td>
                        <td className="py-4 text-center capitalize">
                          {c.type}
                        </td>
                        <td className="py-4 text-center font-mono font-bold text-emerald-600">
                          {dataPerhitungan.fStar[c.id]}
                        </td>
                        <td className="py-4 text-center font-mono font-bold text-rose-600">
                          {dataPerhitungan.fMinus[c.id]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel S dan R */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-2 flex items-center gap-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-xs">
                  02
                </span>
                Nilai Utility (S) dan Regret (R)
              </h3>
              <p className="text-xs text-slate-400 mb-6 italic">
                *S dihitung dari total deviasi berbobot, R dihitung dari deviasi
                berbobot maksimum.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                      <th className="py-4 text-left">Alternatif</th>
                      <th className="py-4 text-center">S (Sum)</th>
                      <th className="py-4 text-center">R (Max)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalResults.map((alt) => (
                      <tr
                        key={alt.id}
                        className="border-b border-slate-50 hover:bg-slate-50/50"
                      >
                        <td className="py-4 font-bold text-slate-700 uppercase">
                          {alt.name}
                        </td>
                        <td className="py-4 text-center font-mono text-indigo-600">
                          {alt.S.toFixed(4)}
                        </td>
                        <td className="py-4 text-center font-mono text-amber-600">
                          {alt.R.toFixed(4)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tabel Ranking Utama */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center gap-3">
            <BarChart3 className="text-indigo-600" />
            <h4 className="font-black text-slate-800 uppercase tracking-widest text-sm">
              Ranking Akhir (Qi)
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-10 py-5">Rank</th>
                  <th className="px-10 py-5">Nama Produk</th>
                  <th className="px-10 py-5 text-center">Indeks Q</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {finalResults.map((res, index) => (
                  <tr
                    key={res.id}
                    className={
                      index === 0
                        ? "bg-emerald-50/30"
                        : "hover:bg-slate-50/50 transition-colors"
                    }
                  >
                    <td className="px-10 py-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                          index === 0
                            ? "bg-yellow-400 text-white shadow-lg shadow-yellow-200"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-10 py-6 font-black text-slate-800 uppercase tracking-tight text-sm">
                      {res.name}
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span
                        className={`font-mono font-black text-sm px-5 py-2 rounded-xl ${
                          index === 0
                            ? "text-emerald-600 bg-emerald-100"
                            : "text-indigo-600 bg-indigo-50"
                        }`}
                      >
                        {res.Q.toFixed(4)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-12 flex items-center text-slate-400 font-black hover:text-indigo-600 transition-all group"
        >
          <ArrowLeft
            size={20}
            className="mr-2 group-hover:-translate-x-2 transition-transform"
          />
          KEMBALI KE INPUT DATA
        </button>
      </div>
    </div>
  );
};

export default HasilPage;
