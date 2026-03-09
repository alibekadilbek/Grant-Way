import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartJourney: () => void;
}

export default function Hero({ onStartJourney }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3 h-3" />
            <span>Твой путь к мировому образованию начинается здесь</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.1]">
            Гранты на обучение <br />
            <span className="text-blue-600">за рубежом</span> для казахстанцев
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-zinc-600 mb-10 leading-relaxed">
            Мы помогаем студентам из Казахстана находить лучшие стипендиальные программы, 
            готовить документы и поступать в топовые вузы мира совершенно бесплатно.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#ai-consultant"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-2xl font-medium hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 group"
            >
              Спросить ИИ-консультанта
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={onStartJourney}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-medium hover:bg-zinc-50 transition-all"
            >
              Начать путь
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
