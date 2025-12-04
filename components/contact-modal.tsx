"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { sendEmail } from "@/actions/sendEmail";
import { useTranslations } from "next-intl"; // <-- 1. IMPORT ET

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations('Contact'); // <-- 2. TRANSLATION HOOK'U BAŞLAT
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading");
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 2000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg p-4 pointer-events-auto"
            >
              <div className="bg-zinc-50 dark:bg-[#0a0a0a] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                {/* --- BURADAN AŞAĞISI DEĞİŞTİ --- */}
                <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white tracking-tight">
                  {t('title')} 
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-sm">
                  {t('description')}
                </p>

                <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 mb-1.5 block">
                      {t('email_label')}
                    </label>
                    <input
                      name="senderEmail"
                      type="email"
                      required
                      placeholder={t('email_placeholder')} // Placeholder çevirisi
                      className="w-full h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-black dark:text-white focus:ring-2 focus:ring-zinc-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider ml-1 mb-1.5 block">
                      {t('message_label')}
                    </label>
                    <textarea
                      name="message"
                      required
                      placeholder={t('message_placeholder')} // Placeholder çevirisi
                      className="w-full h-32 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-black dark:text-white focus:ring-2 focus:ring-zinc-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-12 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center mt-2"
                  >
                    {status === "loading" ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : status === "success" ? (
                       t('success') 
                    ) : (
                       t('submit')
                    )}
                  </button>
                </form>
                 {/* --- DEĞİŞİKLİK SONU --- */}

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}