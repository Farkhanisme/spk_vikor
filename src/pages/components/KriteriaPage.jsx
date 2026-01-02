/* eslint-disable react-hooks/purity */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const KriteriaPage = () => {
  const navigate = useNavigate();

  // State untuk kriteria (dengan data bawaan)
  const [criteria, setCriteria] = useState([
    { id: Date.now(), name: "Harga", weight: 0.3, type: "cost" },
    { id: Date.now() + 1, name: "Jumlah Shade", weight: 0.3, type: "benefit" },
    { id: Date.now() + 2, name: "Ketahanan", weight: 0.2, type: "benefit" },
    { id: Date.now() + 3, name: "Pigmentasi", weight: 0.2, type: "benefit" },
  ]);

  const [isValidated, setIsValidated] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);

  // Menghitung total bobot setiap kali criteria berubah
  useEffect(() => {
    const total = criteria.reduce(
      (sum, item) => sum + parseFloat(item.weight || 0),
      0
    );
    setTotalWeight(total);
    setIsValidated(false); // Reset validasi jika ada perubahan data
  }, [criteria]);

  const addCriteria = () => {
    setCriteria([
      ...criteria,
      { id: Date.now(), name: "", weight: 0, type: "benefit" },
    ]);
  };

  const removeCriteria = (id) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const updateCriteria = (id, field, value) => {
    const updated = criteria.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    setCriteria(updated);
  };

  const handleValidate = () => {
    if (Math.abs(totalWeight - 1) < 0.001) {
      setIsValidated(true);
    } else {
      alert(`Total bobot harus 1.0. Total saat ini: ${totalWeight.toFixed(2)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Konfigurasi Kriteria
          </h2>
          <p className="text-slate-500 mt-2">
            Tentukan parameter penilaian dan bobot kepentingan (Total harus
            1.0).
          </p>
        </div>

        {/* Table / List Kriteria */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Kriteria</th>
                <th className="px-6 py-4 font-semibold">Bobot (0-1)</th>
                <th className="px-6 py-4 font-semibold">Jenis</th>
                <th className="px-6 py-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {criteria.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-slate-700">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        updateCriteria(item.id, "name", e.target.value)
                      }
                      placeholder="Contoh: Garansi"
                      className="w-full bg-transparent border-none focus:ring-0 placeholder:text-slate-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      step="0.1"
                      value={item.weight}
                      onChange={(e) =>
                        updateCriteria(item.id, "weight", e.target.value)
                      }
                      className="w-20 bg-slate-100 border-none rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.type}
                      onChange={(e) =>
                        updateCriteria(item.id, "type", e.target.value)
                      }
                      className="bg-transparent border-none text-sm font-medium text-slate-600 focus:ring-0 cursor-pointer"
                    >
                      <option value="benefit">Benefit</option>
                      <option value="cost">Cost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => removeCriteria(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Button Area */}
          <div className="p-4 bg-slate-50/30 text-center">
            <button
              onClick={addCriteria}
              className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700"
            >
              <Plus size={18} className="mr-1" /> Tambah Kriteria
            </button>
          </div>
        </div>

        {/* Validation Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl ${
                isValidated
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {isValidated ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total Bobot Saat Ini
              </p>
              <p
                className={`text-2xl font-black ${
                  isValidated ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                {totalWeight.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleValidate}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Validasi Bobot
            </button>

            <button
              disabled={!isValidated}
              onClick={() => navigate("/alternatif", { state: { criteria } })}
              className={`px-8 py-3 flex items-center gap-2 font-bold rounded-2xl transition-all shadow-lg ${
                isValidated
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              Lanjut ke Alternatif
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KriteriaPage;
