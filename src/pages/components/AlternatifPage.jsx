/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Trash2, Calculator, ArrowLeft, Database } from "lucide-react";

const AlternatifPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const criteria = location.state?.criteria || [];

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    if (criteria.length > 0) {
      const defaultData = [
        {
          name: "wardah colorfit ultralight lipstick",
          values: {
            Harga: 69000,
            "Jumlah Shade": 13,
            Ketahanan: 7.5,
            Pigmentasi: 9,
          },
        },
        {
          name: "wardah matte lip cream",
          values: {
            Harga: 85000,
            "Jumlah Shade": 24,
            Ketahanan: 8,
            Pigmentasi: 9,
          },
        },
        {
          name: "wardah moist dew tint",
          values: {
            Harga: 96000,
            "Jumlah Shade": 8,
            Ketahanan: 6.5,
            Pigmentasi: 7,
          },
        },
        {
          name: "wardah glossicle peptide balm",
          values: {
            Harga: 99000,
            "Jumlah Shade": 8,
            Ketahanan: 6,
            Pigmentasi: 6.5,
          },
        },
        {
          name: "hanasui mattedorable lip cream",
          values: {
            Harga: 40688,
            "Jumlah Shade": 16,
            Ketahanan: 7,
            Pigmentasi: 8.5,
          },
        },
        {
          name: "hanasui next level liplast cream",
          values: {
            Harga: 43125,
            "Jumlah Shade": 6,
            Ketahanan: 8,
            Pigmentasi: 9,
          },
        },
        {
          name: "hanasui next level butter balm tint",
          values: {
            Harga: 41580,
            "Jumlah Shade": 6,
            Ketahanan: 7,
            Pigmentasi: 8,
          },
        },
        {
          name: "hanasui tintdorable lip stain",
          values: {
            Harga: 28816,
            "Jumlah Shade": 9,
            Ketahanan: 6,
            Pigmentasi: 6,
          },
        },
        {
          name: "hanasui mattedorable lip cream matcha",
          values: {
            Harga: 40688,
            "Jumlah Shade": 6,
            Ketahanan: 7,
            Pigmentasi: 8.5,
          },
        },
        {
          name: "OMG colorlast lip vinyl",
          values: {
            Harga: 57750,
            "Jumlah Shade": 8,
            Ketahanan: 8,
            Pigmentasi: 9,
          },
        },
        {
          name: "OMG mattelast lip cream",
          values: {
            Harga: 41250,
            "Jumlah Shade": 18,
            Ketahanan: 7,
            Pigmentasi: 7.5,
          },
        },
        {
          name: "OMG glassy lip tint",
          values: {
            Harga: 40500,
            "Jumlah Shade": 9,
            Ketahanan: 8,
            Pigmentasi: 8,
          },
        },
        {
          name: "azarine mattelite lock lipstick",
          values: {
            Harga: 89000,
            "Jumlah Shade": 14,
            Ketahanan: 8,
            Pigmentasi: 8,
          },
        },
        {
          name: "azarine tinted lippie cake lip tint",
          values: {
            Harga: 49000,
            "Jumlah Shade": 9,
            Ketahanan: 7,
            Pigmentasi: 8,
          },
        },
        {
          name: "bioaqua darling me matte lip tint",
          values: {
            Harga: 40599,
            "Jumlah Shade": 4,
            Ketahanan: 8,
            Pigmentasi: 9,
          },
        },
        {
          name: "purbasari lipstick color matte",
          values: {
            Harga: 38900,
            "Jumlah Shade": 15,
            Ketahanan: 7,
            Pigmentasi: 5,
          },
        },
        {
          name: "dazzle me ink-jelly glow tint",
          values: {
            Harga: 34675,
            "Jumlah Shade": 5,
            Ketahanan: 5,
            Pigmentasi: 5,
          },
        },
        {
          name: "dazzle me color chrome lip glaze",
          values: {
            Harga: 36004,
            "Jumlah Shade": 5,
            Ketahanan: 7,
            Pigmentasi: 8,
          },
        },
        {
          name: "somethinc ceralump tinted lip balm",
          values: {
            Harga: 76418,
            "Jumlah Shade": 12,
            Ketahanan: 8,
            Pigmentasi: 7,
          },
        },
        {
          name: "somethinc checkmatte transferproof lipstick",
          values: {
            Harga: 86478,
            "Jumlah Shade": 21,
            Ketahanan: 8,
            Pigmentasi: 9,
          },
        },
        {
          name: "implora caffe matte lip cream",
          values: {
            Harga: 27000,
            "Jumlah Shade": 6,
            Ketahanan: 5,
            Pigmentasi: 8,
          },
        },
        {
          name: "implora jelly tint",
          values: {
            Harga: 24500,
            "Jumlah Shade": 9,
            Ketahanan: 6,
            Pigmentasi: 8,
          },
        },
      ];

      const mapping = {
        C1: "Harga",
        C2: "Jumlah Shade",
        C3: "Ketahanan",
        C4: "Pigmentasi",
      };

      const initialized = defaultData.map((alt) => {
        const newValues = {};

        criteria.forEach((c) => {
          const legacyKey = mapping[c.id]; // Ambil "Harga", "Ketahanan", dll berdasarkan ID

          if (legacyKey) {
            // Jika ini adalah kriteria bawaan (C1-C4), ambil dari defaultData
            newValues[c.id] = alt.values[legacyKey] || 0;
          } else {
            // Jika ini kriteria baru yang ditambah user (ID custom), beri nilai 0
            newValues[c.id] = 0;
          }
        });

        return {
          id: generateId(),
          name: alt.name,
          values: newValues,
        };
      });
      setAlternatives(initialized);
    }
  }, [criteria]);

  const addAlternative = () => {
    const initialValues = {};
    criteria.forEach((c) => (initialValues[c.id] = 0));
    setAlternatives([
      ...alternatives,
      { id: generateId(), name: "", values: initialValues },
    ]);
  };

  const handleCalculate = () => {
    window.scrollTo(0, 0);
    navigate("/hasil", {
      state: {
        criteria: JSON.parse(JSON.stringify(criteria)),
        alternatives: JSON.parse(JSON.stringify(alternatives)),
      },
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 relative">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-600 via-purple-500 to-pink-500"></div>

      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <button
              onClick={() => navigate("/kriteria")}
              className="flex items-center text-sm font-bold text-slate-400 hover:text-indigo-600 mb-2 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" /> Edit Kriteria
            </button>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Input Alternatif
            </h2>
            <p className="text-slate-500">
              Masukkan nilai performa untuk setiap produk lipstick.
            </p>
          </div>
          <button
            onClick={addAlternative}
            className="flex items-center justify-center px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:shadow-lg transition-all shadow-sm"
          >
            <Plus size={20} className="mr-2 text-indigo-600" /> Tambah Produk
          </button>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-6 text-slate-600 text-xs uppercase tracking-widest font-black">
                    Detail Produk
                  </th>
                  {criteria.map((c) => (
                    <th
                      key={c.id}
                      className="px-6 py-6 text-center text-slate-600 text-xs uppercase tracking-widest font-black"
                    >
                      {c.name}
                    </th>
                  ))}
                  <th className="px-8 py-6 text-center text-slate-400 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {alternatives.map((alt) => (
                  <tr
                    key={alt.id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <input
                        type="text"
                        value={alt.name}
                        onChange={(e) =>
                          setAlternatives(
                            alternatives.map((a) =>
                              a.id === alt.id
                                ? { ...a, name: e.target.value }
                                : a
                            )
                          )
                        }
                        placeholder="Nama produk..."
                        className="w-full bg-transparent border-none p-0 text-slate-800 font-bold placeholder:text-slate-300 focus:ring-0 uppercase text-sm"
                      />
                    </td>
                    {criteria.map((c) => (
                      <td key={c.id} className="px-6 py-5">
                        <input
                          type="number"
                          value={alt.values[c.id]}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            setAlternatives(
                              alternatives.map((a) =>
                                a.id === alt.id
                                  ? {
                                      ...a,
                                      values: { ...a.values, [c.id]: val },
                                    }
                                  : a
                              )
                            );
                          }}
                          className="w-20 mx-auto block bg-slate-50 border-none rounded-xl px-2 py-2 text-center text-slate-600 font-mono focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </td>
                    ))}
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() =>
                          setAlternatives(
                            alternatives.filter((a) => a.id !== alt.id)
                          )
                        }
                        className="text-slate-200 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleCalculate}
            disabled={alternatives.length < 2}
            className="group flex items-center px-12 py-5 bg-slate-900 text-white font-black rounded-4xl hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Calculator className="mr-3 w-6 h-6" /> ANALISIS HASIL VIKOR
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlternatifPage;
