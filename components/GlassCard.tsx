import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group
        bg-[#0B1D35]/40 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        overflow-hidden
        transition-all duration-300 
        
        /* Visor Effects */
        hover:-translate-y-1
        hover:shadow-2xl 
        hover:shadow-cyan-900/20
        hover:border-cyan-500/50
        hover:backdrop-blur-2xl
        
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;