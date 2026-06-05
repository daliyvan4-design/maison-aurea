'use client'

// Overlay de grain de film — purement CSS/SVG, aucune dépendance JS.
// steps(4) donne un grain cinématographique discret plutôt qu'un flou.
export function GrainOverlay() {
  return (
    <>
      <style>{`
        .grain-overlay {
          position: fixed;
          inset: -150%;
          z-index: 9000;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: grain-shift 0.9s steps(4) infinite;
          will-change: transform;
        }
        @keyframes grain-shift {
          0%   { transform: translate(0, 0);   }
          50%  { transform: translate(-2%, 1%); }
          100% { transform: translate(1%, -2%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .grain-overlay { animation: none; }
        }
      `}</style>
      <div
        className="grain-overlay"
        aria-hidden="true"
        data-testid="grain-overlay"
      />
    </>
  )
}
