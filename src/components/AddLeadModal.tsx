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
        className="bg-[var(--color-gold)] text-black font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 text-sm shadow-sm"
      >
        <Plus className="w-4 h-4" />
        Añadir Lead
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border/50 bg-black/5 dark:bg-white/5">
              <h2 className="text-xl font-bold text-foreground font-editorial">Prospectar Nuevo Lead</h2>
              <button 
                onClick={() => !isLoading && setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <p className="text-muted-foreground text-sm mb-4">
                Introduce la página web del concesionario. Nuestro motor de IA analizará la web y extraerá todos sus datos de contacto automáticamente.
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">URL del sitio web</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="ej: www.levanauto.com"
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={isLoading || !url}
                  className="bg-[var(--color-gold)] text-black font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm"
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
