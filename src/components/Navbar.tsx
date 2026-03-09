import React from 'react';
import { GraduationCap, Globe, BookOpen, MessageSquare } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-zinc-900">GrantWay <span className="text-blue-600">KZ</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#grants" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Гранты</a>
            <a href="#database" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">База вузов</a>
            <a href="#calculator" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Калькулятор</a>
            <a href="#roadmap" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">Путь студента</a>
            <a href="#ai-consultant" className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors">ИИ-Консультант</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
              Начать путь
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
