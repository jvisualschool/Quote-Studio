import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Languages, Sparkles, ChevronRight } from 'lucide-react';

interface WisdomData {
  q: string;
  a: string;
  author_profile?: string;
  ko_q: string | null;
  author_ko?: string;
  author_image?: string;
  image_url?: string;
  category?: string;
  tags?: string[];
  source_name?: string;
  is_translated: boolean;
  cached?: boolean;
  total_count?: number;
  translated_count?: number;
}

function App() {
  const [wisdom, setWisdom] = useState<WisdomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadWisdom = useCallback(async () => {
    setLoading(true);
    setImageLoaded(false);
    try {
      const response = await fetch('api.php');
      const data = await response.json();
      setWisdom(data);
    } catch (error) {
      console.error("Failed to fetch wisdom", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWisdom();
  }, [loadWisdom]);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ko' : 'en');
  };

  const authorImageUrl = wisdom?.author_image || wisdom?.image_url;
  const primaryText = lang === 'ko' ? (wisdom?.ko_q || wisdom?.q) : wisdom?.q;
  const secondaryText = lang === 'ko' ? wisdom?.q : wisdom?.ko_q;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
        }}
      />

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Quote Studio
            </h1>
            {wisdom?.total_count && (
              <p className="text-xs text-purple-300/60">
                {wisdom.translated_count?.toLocaleString()} / {wisdom.total_count.toLocaleString()} quotes
              </p>
            )}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={toggleLang}
          className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition-all flex items-center gap-2 group"
        >
          <Languages className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-medium">{lang === 'ko' ? 'EN' : 'KO'}</span>
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-r-pink-500 border-b-transparent border-l-transparent animate-spin" />
              </div>
              <p className="text-purple-300 font-medium tracking-wider">Loading wisdom...</p>
            </motion.div>
          ) : wisdom && (
            <motion.div
              key={wisdom.q}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl w-full"
            >
              <div className="grid lg:grid-cols-[300px,1fr] gap-8 items-start">
                {/* Author Card */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:sticky lg:top-24"
                >
                  <div className="relative group">
                    {/* Author Image */}
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10">
                      {authorImageUrl ? (
                        <>
                          <img
                            src={authorImageUrl}
                            alt={wisdom.a}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                              }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold">
                            {wisdom.a.charAt(0)}
                          </div>
                        </div>
                      )}

                      {/* Translation Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-xl border ${wisdom.is_translated
                          ? 'bg-emerald-500/90 border-emerald-400/50 text-white'
                          : 'bg-amber-500/90 border-amber-400/50 text-white'
                        }`}>
                        {wisdom.is_translated ? '✓ Translated' : '⏳ Pending'}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="mt-6 space-y-2">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        {wisdom.a}
                      </h2>
                      {wisdom.author_ko && (
                        <p className="text-lg text-purple-300/80">
                          {wisdom.author_ko}
                        </p>
                      )}
                      {wisdom.source_name && (
                        <p className="text-sm text-purple-400/50">
                          {wisdom.source_name}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Quote Content */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  {/* Main Quote */}
                  <div className="relative">
                    <div className="absolute -top-8 -left-4 text-8xl font-serif text-purple-500/10 select-none">
                      "
                    </div>
                    <blockquote className="relative space-y-6">
                      <p className={`${
                        lang === 'ko'
                          ? primaryText && primaryText.length > 100
                            ? 'text-xl md:text-2xl lg:text-3xl font-bold'
                            : primaryText && primaryText.length > 50
                              ? 'text-2xl md:text-3xl lg:text-4xl font-bold'
                              : 'text-3xl md:text-4xl lg:text-5xl font-bold'
                          : primaryText && primaryText.length > 150
                            ? 'text-2xl md:text-3xl lg:text-4xl font-serif'
                            : primaryText && primaryText.length > 80
                              ? 'text-3xl md:text-4xl lg:text-5xl font-serif'
                              : 'text-4xl md:text-5xl lg:text-6xl font-serif'
                        } leading-tight bg-gradient-to-br from-white via-purple-100 to-pink-100 bg-clip-text text-transparent transition-all duration-300`}>
                        {primaryText}
                      </p>

                      {wisdom.is_translated && secondaryText && (
                        <p className={`${lang === 'ko'
                            ? 'text-xl md:text-2xl italic font-serif'
                            : 'text-lg md:text-xl'
                          } text-purple-300/60 leading-relaxed`}>
                          {secondaryText}
                        </p>
                      )}
                    </blockquote>
                  </div>

                  {/* Next Quote Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={loadWisdom}
                    className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center gap-3 overflow-hidden"
                  >
                    <span className="relative z-10 font-bold text-lg">Next Quote</span>
                    <RefreshCw className="relative z-10 w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    <ChevronRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 text-center">
        <p className="text-sm text-purple-400/50">
          Powered by Database & Papago AI • 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
