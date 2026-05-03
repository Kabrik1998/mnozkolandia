export default function Mascot({ mood = 'neutral', size = 'large' }) {
  return (
    <div className={`mascot-wrap mascot-${mood} ${size === 'small' ? 'scale-75' : ''}`} aria-label="Maskotka Mnożek">
      <svg className="mascot" viewBox="0 0 260 300" role="img">
        <defs>
          <radialGradient id="headGrad" cx="35%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#78f1de" />
            <stop offset="62%" stopColor="#28c7b8" />
            <stop offset="100%" stopColor="#13a9a3" />
          </radialGradient>
          <linearGradient id="shirtGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffe082" />
            <stop offset="100%" stopColor="#ffc94d" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="9" floodColor="#0d5361" floodOpacity="0.22" />
          </filter>
        </defs>
        <ellipse cx="130" cy="282" rx="72" ry="13" fill="#17405a" opacity="0.14" />
        <g className="mascot-body" filter="url(#shadow)">
          <path className="arm left-arm" d="M73 185 C38 188 31 220 54 229 C72 236 87 214 92 194" fill="#22bfb4" />
          <path className="arm right-arm" d="M187 185 C222 188 229 220 206 229 C188 236 173 214 168 194" fill="#22bfb4" />
          <path d="M78 174 C82 143 179 143 183 174 L190 241 C170 259 92 259 70 241 Z" fill="url(#shirtGrad)" />
          <text x="130" y="220" textAnchor="middle" fontSize="58" fontWeight="900" fill="#17324d">×</text>
          <path d="M95 247 C98 276 116 278 122 250" stroke="#17324d" strokeWidth="12" strokeLinecap="round" />
          <path d="M165 247 C162 276 144 278 138 250" stroke="#17324d" strokeWidth="12" strokeLinecap="round" />
          <circle cx="130" cy="105" r="87" fill="url(#headGrad)" />
          <circle cx="98" cy="103" r="32" fill="none" stroke="#17324d" strokeWidth="10" />
          <circle cx="162" cy="103" r="32" fill="none" stroke="#17324d" strokeWidth="10" />
          <path d="M130 102 H130" stroke="#17324d" strokeWidth="10" strokeLinecap="round" />
          <g className="eyes">
            <ellipse cx="98" cy="103" rx="9" ry="13" fill="#17324d" />
            <ellipse cx="162" cy="103" rx="9" ry="13" fill="#17324d" />
            <circle cx="94" cy="98" r="3" fill="#fff" />
            <circle cx="158" cy="98" r="3" fill="#fff" />
          </g>
          <g className="sad-eyes">
            <path d="M88 103 Q98 94 108 103" stroke="#17324d" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M152 103 Q162 94 172 103" stroke="#17324d" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
          <path className="smile" d="M102 139 Q130 162 158 139" stroke="#17324d" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path className="sad-mouth" d="M105 153 Q130 135 155 153" stroke="#17324d" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="71" cy="126" r="12" fill="#ffd966" opacity="0.75" />
          <circle cx="189" cy="126" r="12" fill="#ffd966" opacity="0.75" />
        </g>
      </svg>
    </div>
  );
}

