import React, { CSSProperties } from "react"

type LogoProps = {
  style?: CSSProperties
}

export const Logo: React.FC<LogoProps> = props => (
  <svg viewBox="0 0 500 100" width={250} height={50} {...props}>
    <defs>
      <linearGradient id="gradient" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#4f96d8" />
        <stop offset="1" stopColor="#1c68c0" />
      </linearGradient>
    </defs>

    <path fill="none" d="M-1-1h642v102H-1z" />
    <g fill="url(#gradient)">
      <path d="M53.333 10v6.692c16.85 1.68 30 15.951 30 33.308 0 17.354-13.15 31.624-30 33.304V90C73.864 88.298 90 71.052 90 50c0-21.055-16.136-38.294-36.667-40zm-6.666 73.304c-16.843-1.68-30-15.95-30-33.304 0-17.356 13.157-31.628 30-33.308V10C26.14 11.706 10 28.945 10 50c0 21.052 16.14 38.298 36.667 40v-6.696z" />
      <path d="M30.3 46.667C31.888 37.21 40.091 30 50 30s18.112 7.21 19.7 16.667h6.735C74.795 33.516 63.601 23.333 50 23.333c-13.594 0-24.792 10.183-26.436 23.334H30.3zm39.4 6.666C68.112 62.786 59.909 70 50 70s-18.112-7.214-19.7-16.667h-6.735C25.208 66.484 36.406 76.667 50 76.667c13.601 0 24.795-10.183 26.436-23.334H69.7z" />
      <path d="M50 36.667c-7.363 0-13.333 5.97-13.333 13.333S42.637 63.333 50 63.333c7.366 0 13.333-5.97 13.333-13.333S57.366 36.667 50 36.667zm0 20a6.667 6.667 0 1 1 0-13.334 6.667 6.667 0 0 1 0 13.334z" />
      <text
        letterSpacing={10}
        stroke="#000"
        transform="matrix(1.04651 0 0 1 -5.558 0)"
        fontWeight="bold"
        fontFamily="Helvetica, sans-serif"
        fontSize={36}
        y={62.227}
        x={120.122}
        strokeWidth={0}
      >
        {"TRIALSEARCH"}
      </text>
    </g>
  </svg>
)
