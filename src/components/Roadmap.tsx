import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const steps = [
  {
    title: "Выбор программы и страны",
    description: "Определись с направлением обучения и изучи доступные гранты (Болашак, DAAD, Chevening и др.).",
    status: "done"
  },
  {
    title: "Подготовка к языковым тестам",
    description: "Сдай IELTS (обычно 6.5+) или TOEFL. Для некоторых стран (Германия, Франция) может понадобиться знание местного языка.",
    status: "current"
  },
  {
    title: "Сбор документов",
    description: "Транскрипты, дипломы, рекомендательные письма и, самое главное, мотивационное письмо.",
    status: "upcoming"
  },
  {
    title: "Подача заявки",
    description: "Заполни анкеты на сайтах вузов и грантовых программ до дедлайна.",
    status: "upcoming"
  },
  {
    title: "Интервью и виза",
    description: "Пройди собеседование (если требуется) и подавай документы на студенческую визу.",
    status: "upcoming"
  }
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">Твой путь к гранту</h2>
          <p className="text-zinc-600">Пошаговый план действий для успешного поступления</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-100 hidden md:block" />
          
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col md:flex-row gap-8 items-start">
                <div className="hidden md:flex absolute left-8 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-zinc-100 items-center justify-center z-10">
                  {step.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : step.status === 'current' ? (
                    <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
                  ) : (
                    <Circle className="w-5 h-5 text-zinc-300" />
                  )}
                </div>
                
                <div className="md:ml-16 flex-1 bg-zinc-50 rounded-3xl p-8 border border-zinc-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Шаг {i + 1}</span>
                    {step.status === 'current' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full">Сейчас</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
