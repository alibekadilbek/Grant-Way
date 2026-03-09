import React, { useState, useEffect } from 'react';
import { Search, MapPin, GraduationCap, ExternalLink, Mail, Filter } from 'lucide-react';

interface UniversityProgram {
  id: number;
  name: string;
  country: string;
  city: string;
  website: string;
  email: string;
  description: string;
  program_name: string;
  specialty: string;
  degree: string;
  grant_name: string;
  criteria: string;
}

export default function UniversityDatabase() {
  const [data, setData] = useState<UniversityProgram[]>([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (country) params.append('country', country);
      if (specialty) params.append('specialty', specialty);
      
      const res = await fetch(`/api/universities?${params.toString()}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, country, specialty]);

  return (
    <section id="database" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">База университетов и программ</h2>
          <p className="text-zinc-600">Найди свой идеальный университет среди сотен доступных вариантов</p>
        </div>

        {/* Filters */}
        <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Поиск по названию..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            
            <select 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
            >
              <option value="">Все страны</option>
              <option value="Germany">Германия</option>
              <option value="Hungary">Венгрия</option>
              <option value="Turkey">Турция</option>
              <option value="United Kingdom">Великобритания</option>
              <option value="South Korea">Южная Корея</option>
              <option value="China">Китай</option>
            </select>

            <select 
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
            >
              <option value="">Все специальности</option>
              <option value="Computer Science">IT / Computer Science</option>
              <option value="Engineering">Инженерия</option>
              <option value="Social Sciences">Социальные науки</option>
              <option value="Business">Бизнес</option>
              <option value="Design">Дизайн / Архитектура</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.length > 0 ? data.map((item) => (
              <div key={item.id} className="bg-white border border-zinc-100 rounded-3xl p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">{item.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <MapPin className="w-3 h-3" />
                      {item.city}, {item.country}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
                    {item.degree}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm font-bold">{item.program_name}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Специальность: {item.specialty}</p>
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Грант: {item.grant_name}</p>
                    <p className="text-xs text-zinc-600">{item.criteria}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-50">
                  <a 
                    href={item.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Сайт вуза
                  </a>
                  <a 
                    href={`mailto:${item.email}`}
                    className="flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    Контакты
                  </a>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 text-zinc-400">
                Ничего не найдено по вашему запросу.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
