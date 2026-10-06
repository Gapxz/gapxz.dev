export function SetupArt() {
  return (
    <svg
      viewBox="0 0 800 420"
      fill="none"
      role="img"
      aria-label="Ilustração do setup com dois monitores, gabinete aquário e periféricos claros"
      className="mx-auto w-full max-w-3xl"
    >
      <defs>
        <linearGradient
          id="screen"
          x1="250"
          y1="100"
          x2="470"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#170e11" />
          <stop offset="1" stopColor="#49111c" />
        </linearGradient>
        <linearGradient
          id="glass"
          x1="560"
          y1="130"
          x2="700"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e1d8d3" stopOpacity=".15" />
          <stop offset="1" stopColor="#49111c" stopOpacity=".3" />
        </linearGradient>
        <radialGradient id="deskglow">
          <stop stopColor="#7f293d" stopOpacity=".35" />
          <stop offset="1" stopColor="#49111c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="250" rx="340" ry="170" fill="url(#deskglow)" />
      <path
        d="M77 298 595 267 736 336 191 385 77 298Z"
        fill="#181516"
        stroke="#4b3d3f"
      />
      <path d="m77 298 1 10 113 89 545-50v-11M191 385v12" stroke="#4b3d3f" />
      <path
        d="m130 143 137-17v122l-137 4V143Z"
        fill="#171517"
        stroke="#8d8182"
        strokeWidth="3"
      />
      <path d="m138 152 120-15v100l-120 6v-91Z" fill="url(#screen)" />
      <path d="m195 251 1 35m-22 8 44-5" stroke="#a69999" strokeWidth="5" />
      <path
        d="m278 106 257 8v150l-257 2V106Z"
        fill="#191516"
        stroke="#b8abaa"
        strokeWidth="3"
      />
      <path d="m287 116 239 7v130l-239 2V116Z" fill="url(#screen)" />
      <path
        d="M288 223c62-50 96 30 158-3 36-20 57-13 80-3v36l-239 2Z"
        fill="#692133"
      />
      <path
        d="M288 242c60-28 100 20 158-3 34-16 57-8 80-3v17l-239 2Z"
        fill="#943a50"
      />
      <text
        x="387"
        y="205"
        fill="#eee3dd"
        fontSize="64"
        fontWeight="600"
        fontFamily="Arial"
        letterSpacing="-7"
      >
        g.
      </text>
      <path d="m409 265 1 35m-31 4 63-2" stroke="#bbadac" strokeWidth="6" />
      <path
        d="m559 146 79-20 62 26v156l-80 22-61-30V146Z"
        fill="url(#glass)"
        stroke="#b7abab"
        strokeWidth="2"
      />
      <path
        d="m559 146 61 27 80-21m-80 21v157"
        stroke="#b7abab"
        strokeWidth="2"
      />
      <ellipse
        cx="658"
        cy="193"
        rx="22"
        ry="25"
        stroke="#c48a97"
        strokeWidth="4"
      />
      <ellipse
        cx="658"
        cy="253"
        rx="22"
        ry="25"
        stroke="#c48a97"
        strokeWidth="4"
      />
      <ellipse
        cx="658"
        cy="193"
        rx="10"
        ry="12"
        fill="#49111c"
        stroke="#9e6672"
      />
      <ellipse
        cx="658"
        cy="253"
        rx="10"
        ry="12"
        fill="#49111c"
        stroke="#9e6672"
      />
      <path
        d="m274 322 146-7 38 21-149 10-35-24Z"
        fill="#c5bdb8"
        stroke="#ded4ce"
      />
      <path
        d="m291 324 120-6m-110 13 121-7m-108 13 119-7"
        stroke="#827677"
        strokeWidth="3"
        strokeDasharray="6 3"
      />
      <path
        d="M487 323c-2-13 22-18 30-4l4 8c4 11-27 16-30 5l-4-9Z"
        fill="#d1c5c0"
      />
      <path d="m499 314 3 8" stroke="#827677" strokeWidth="2" />
      <path d="m189 308 44-9m-23 5-8-47" stroke="#c5bdb8" strokeWidth="5" />
      <rect
        x="188"
        y="211"
        width="24"
        height="49"
        rx="11"
        fill="#cbc0bc"
        transform="rotate(-12 188 211)"
      />
      <path
        d="m193 223 16-3m-14 10 16-3m-14 10 16-3"
        stroke="#827677"
        strokeWidth="2"
      />
      <path d="m95 333 1 56m606-23v33" stroke="#504447" strokeWidth="6" />
      <path
        d="M117 104h50m-25-25v50M685 87h24m-12-12v24"
        stroke="#9a5665"
        strokeOpacity=".5"
      />
    </svg>
  );
}
