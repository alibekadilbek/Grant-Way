import React from 'react';
import { ExternalLink, MapPin, Calendar, GraduationCap } from 'lucide-react';

interface GrantProps {
  title: string;
  country: string;
  description: string;
  deadline: string;
  tags: string[];
  link: string;
}

export default function GrantCard({ title, country, description, deadline, tags, link }: GrantProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-zinc-400">
          <Calendar className="w-3 h-3" />
          Дедлайн: {deadline}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-zinc-900 mb-2">{title}</h3>
      
      <div className="flex items-center gap-1 text-sm text-zinc-500 mb-4">
        <MapPin className="w-3 h-3" />
        {country}
      </div>
      
      <p className="text-zinc-600 text-sm mb-6 line-clamp-3">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-zinc-50 text-zinc-500 text-[10px] font-semibold uppercase tracking-wider rounded-md">
            {tag}
          </span>
        ))}
      </div>
      
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-50 text-zinc-900 rounded-xl text-sm font-medium hover:bg-blue-600 hover:text-white transition-all"
      >
        Подробнее
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
