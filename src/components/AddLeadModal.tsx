"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { prospectCompany } from "@/app/actions/prospect";

export function AddLeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Basic URL validation
    let finalUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      finalUrl = "https://" + url;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await prospectCompany(finalUrl);
      if (res.success) {
        setIsOpen(false);
        setUrl("");
      } else {
        setError(res.error || "Ocurrió un error inesperado.");
      }
    } catch (err: any) {
      setError(err.message || "Error al comunicarse con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2 text-sm"
      >
        <Plus className="w-4 h-4" />
        Añadir Lead
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-graphite)] border border-white/10 rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Prospectar Nuevo Lead</h2>
              <button 
                onClick={() => !isLoading && setIsOpen(false)}
                className="text-[var(--color-gray-medium)] hover:text-white transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <p className="text-[var(--color-gray-medium)] text-sm mb-4">
                Introduce la página web del concesionario. Nuestro motor de IA analizará la web y extraerá todos sus datos de contacto automáticamente.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-2">URL del sitio web</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="ej: www.levanauto.com"
                  className="w-full bg-[var(--color-graphite-light)] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-[var(--color-gray-medium)] hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isLoading || !url}
                  className="bg-[var(--color-gold)] text-[var(--color-graphite-dark)] px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-gold-light)] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analizando web...
                    </>
                  ) : (
                    <>Capturar Datos</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
