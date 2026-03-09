import React, { useState } from 'react';
import { Calculator, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { calculateProbability } from '../services/dataService';

interface CalculationResult {
  uni_name: string;
  country: string;
  name: string;
  specialty: string;
  degree: string;
  grant_name: string;
  probability: number;
}

export default function GrantCalculator() {
  const [gpa, setGpa] = useState<string>('');
  const [ielts, setIelts] = useState<string>('');
  const [country, setCountry] = useState('Any');
  const [specialty, setSpecialty] = useState('Any');
  const [results, setResults] = useState<CalculationResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!gpa || !ielts) return;
    setLoading(true);
    try {
      const data = calculateProbability(
        parseFloat(gpa),
        parseFloat(ielts),
        country,
        specialty
      );
      setResults(data as CalculationResult[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
              <Calculator className="w-3 h-3" />
              <span>Узнай свои шансы за 1 минуту</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Калькулятор шансов <br /> на получение гранта</h2>
            <p className="text-zinc-400 text-lg mb-10">
              Введите свои текущие показатели, чтобы получить персональный список программ 
              с оценкой вероятности поступления.
            </p>

            <div className="space-y-6 bg-white/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">GPA (из 4.0)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="4"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    placeholder="3.8"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">IELTS Score</label>
                  <input 
                    type="number" 
                    step="0.5" 
                    min="0" 
                    max="9"
                    value={ielts}
                    onChange={(e) => setIelts(e.target.value)}
                    placeholder="6.5"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Страна</label>
                  <select 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                  >
                    <option value="Any">Любая</option>
                    <option value="Germany">Германия</option>
                    <option value="Hungary">Венгрия</option>
                    <option value="Turkey">Турция</option>
                    <option value="United Kingdom">Великобритания</option>
                    <option value="South Korea">Южная Корея</option>
                    <option value="China">Китай</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Специальность</label>
                  <select 
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                  >
                    <option value="Any">Любая</option>
                    <option value="Computer Science">IT / CS</option>
                    <option value="Engineering">Инженерия</option>
                    <option value="Social Sciences">Социальные науки</option>
                    <option value="Business">Бизнес</option>
                    <option value="Design">Дизайн</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={loading || !gpa || !ielts}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? 'Рассчитываем...' : 'Рассчитать шансы'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative">
            {results ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  Подходящие программы
                </h3>
                {results.map((res, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{res.uni_name}</h4>
                        <p className="text-zinc-400 text-sm">{res.name} ({res.degree})</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        res.probability >= 80 ? 'bg-green-500/20 text-green-400' : 
                        res.probability >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        Шанс: {Math.round(res.probability)}%
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                      Грант: {res.grant_name}
                    </div>
                  </div>
                ))}
                {results.length === 0 && (
                  <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400">К сожалению, программ по вашим критериям не найдено.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square rounded-[40px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                  <Calculator className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Результаты появятся здесь</h3>
                <p className="text-zinc-500 text-sm">Заполните форму слева, чтобы увидеть персональные рекомендации.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
