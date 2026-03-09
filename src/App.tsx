import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GrantCard from './components/GrantCard';
import AIConsultant from './components/AIConsultant';
import Roadmap from './components/Roadmap';
import UniversityDatabase from './components/UniversityDatabase';
import GrantCalculator from './components/GrantCalculator';
import LeadFormModal from './components/LeadFormModal';
import { Globe, GraduationCap, Award, Users } from 'lucide-react';

const popularGrants = [
  {
    title: "Международная стипендия «Болашак»",
    country: "Весь мир",
    description: "Государственная программа Республики Казахстан для обучения в ведущих вузах мира. Покрывает все расходы: обучение, проживание, перелет, страховку.",
    deadline: "Круглый год",
    tags: ["Магистратура", "Докторантура", "Стажировки"],
    link: "https://bolashak.gov.kz/"
  },
  {
    title: "DAAD Scholarship",
    country: "Германия",
    description: "Одна из самых популярных программ для обучения в Германии. Предлагает широкий спектр стипендий для студентов всех специальностей.",
    deadline: "Октябрь - Ноябрь",
    tags: ["Магистратура", "PhD", "Исследования"],
    link: "https://www.daad.kz/"
  },
  {
    title: "Chevening Scholarship",
    country: "Великобритания",
    description: "Глобальная стипендиальная программа правительства Великобритании для будущих лидеров. Полное финансирование обучения в любом вузе UK.",
    deadline: "Ноябрь",
    tags: ["Магистратура", "Лидерство"],
    link: "https://www.chevening.org/scholarship/kazakhstan/"
  },
  {
    title: "Stipendium Hungaricum",
    country: "Венгрия",
    description: "Межправительственный грант между Казахстаном и Венгрией. Покрывает обучение, проживание в общежитии и дает ежемесячную стипендию.",
    deadline: "Январь",
    tags: ["Бакалавриат", "Магистратура", "PhD"],
    link: "https://stipendiumhungaricum.hu/"
  },
  {
    title: "Fulbright Program",
    country: "США",
    description: "Престижная программа обмена правительства США. Позволяет получить степень магистра или проводить исследования в американских университетах.",
    deadline: "Май - Июнь",
    tags: ["Магистратура", "Исследования"],
    link: "https://kz.usembassy.gov/education-culture/opportunities/fulbright-graduate-student-program/"
  },
  {
    title: "Türkiye Bursları",
    country: "Турция",
    description: "Государственная программа Турции для иностранных студентов. Включает бесплатное обучение, курсы турецкого языка, проживание и перелет.",
    deadline: "Февраль",
    tags: ["Бакалавриат", "Магистратура", "PhD"],
    link: "https://www.turkiyeburslari.gov.tr/"
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar onStartJourney={openModal} />
      
      <main>
        <Hero onStartJourney={openModal} />
        
        {/* Stats Section */}
        <section className="py-12 border-y border-zinc-100 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 mb-1">500+</div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Грантов ежегодно</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 mb-1">40+</div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Стран мира</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 mb-1">10k+</div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Студентов из КЗ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 mb-1">100%</div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Бесплатная помощь</div>
              </div>
            </div>
          </div>
        </section>

        {/* Grants Catalog */}
        <section id="grants" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-zinc-900 mb-4">Популярные программы</h2>
                <p className="text-zinc-600">Мы отобрали самые надежные и выгодные гранты, доступные для граждан Казахстана в этом году.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-sm font-medium">Все</button>
                <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-sm font-medium hover:bg-zinc-50">Европа</button>
                <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-sm font-medium hover:bg-zinc-50">Азия</button>
                <button className="px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-xl text-sm font-medium hover:bg-zinc-50">США</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularGrants.map((grant, i) => (
                <GrantCard key={i} {...grant} />
              ))}
            </div>
          </div>
        </section>

        <UniversityDatabase />

        <GrantCalculator />

        <Roadmap />
        
        <AIConsultant />

        {/* Features / Why Us */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-zinc-900 mb-8 leading-tight">Почему стоит начать <br /> подготовку сейчас?</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-1">Глобальные возможности</h4>
                      <p className="text-zinc-600 text-sm">Диплом зарубежного вуза открывает двери в международные компании и дает уникальный культурный опыт.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-1">Полное финансирование</h4>
                      <p className="text-zinc-600 text-sm">Многие программы покрывают не только обучение, но и перелет, проживание и даже ежемесячные расходы.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-900 mb-1">Сообщество единомышленников</h4>
                      <p className="text-zinc-600 text-sm">Тысячи казахстанцев уже учатся за рубежом. Мы поможем тебе стать частью этого комьюнити.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1523050853063-bd8012fec042?auto=format&fit=crop&q=80&w=1000" 
                    alt="Students studying" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-zinc-100 max-w-[240px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Присоединяйся</span>
                  </div>
                  <p className="text-sm font-bold text-zinc-900">1,240 студентов уже начали подготовку в этом месяце</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold tracking-tight text-zinc-900">Grant <span className="text-blue-600">Hunter</span></span>
            </div>
            <div className="flex gap-8 text-sm text-zinc-500">
              <a href="#" className="hover:text-blue-600 transition-colors">О проекте</a>
              <a 
                href="https://www.instagram.com/granthunter.kz?igsh=MTUwMm12N3Y2N2htNA%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Контакты
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">Политика конфиденциальности</a>
            </div>
            <p className="text-xs text-zinc-400">© 2024 Grant Hunter. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <LeadFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
