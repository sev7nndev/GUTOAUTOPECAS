import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Guto Auto Peças"
    >
      <defs>
        {/* Chrome Gradient Definition */}
        <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#D0D0D0" />
          <stop offset="50%" stopColor="#606060" />
          <stop offset="51%" stopColor="#A0A0A0" />
          <stop offset="80%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        
        {/* Text Shadow/Outline Filter */}
        <filter id="outline">
           <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2" />
           <feFlood floodColor="black" floodOpacity="1" result="BLACK" />
           <feComposite in="BLACK" in2="DILATED" operator="in" result="OUTLINE" />
           <feMerge>
             <feMergeNode in="OUTLINE" />
             <feMergeNode in="SourceGraphic" />
           </feMerge>
        </filter>
      </defs>

      <g filter="url(#outline)">
        {/* Top Text */}
        <text
          x="200"
          y="45"
          textAnchor="middle"
          fontFamily="serif"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="32"
          fill="url(#chromeGradient)"
          stroke="black"
          strokeWidth="0.5"
        >
          Auto Peças
        </text>

        {/* Main GUTO Text */}
        <text
          x="200"
          y="135"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontStyle="italic"
          fontWeight="900"
          fontSize="110"
          fill="url(#chromeGradient)"
          letterSpacing="-4"
        >
          GUTO
        </text>

        {/* Bottom Text */}
        <text
          x="200"
          y="170"
          textAnchor="middle"
          fontFamily="serif"
          fontStyle="italic"
          fontWeight="bold"
          fontSize="24"
          fill="#E5E7EB"
          stroke="black"
          strokeWidth="0.5"
        >
          Nacionais &amp; Imports
        </text>
      </g>
    </svg>
  );
};