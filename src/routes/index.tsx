import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import suri from "@/assets/suri.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Suri · Día de Muertos" },
      { name: "description", content: "Un altar digital de Día de Muertos para recordar a Suri, nuestra gata querida." },
      { property: "og:title", content: "Altar de Suri · Día de Muertos" },
      { property: "og:description", content: "Cempasúchil, veladoras y papel picado para honrar a Suri." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Marigold({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      {[0, 30, 60, 90, 120, 150].map((r) => (
        <ellipse key={r} cx="20" cy="20" rx="18" ry="8" transform={`rotate(${r} 20 20)`} fill="var(--marigold)" opacity="0.85" />
      ))}
      {[15, 45, 75, 105, 135, 165].map((r) => (
        <ellipse key={r} cx="20" cy="20" rx="12" ry="6" transform={`rotate(${r} 20 20)`} fill="var(--flame)" opacity="0.9" />
      ))}
      <circle cx="20" cy="20" r="5" fill="var(--marigold)" />
    </svg>
  );
}

function Velvet({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M20 4c6 6 14 10 14 20a14 14 0 0 1-28 0C6 14 14 10 20 4z" fill="var(--velvet)" />
      <path d="M20 10c4 4 9 7 9 14a9 9 0 0 1-18 0c0-7 5-10 9-14z" fill="var(--pink)" opacity=".55" />
    </svg>
  );
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 0.7) % 12,
        dur: 8 + ((i * 3) % 8),
        drift: `${((i * 53) % 160) - 80}px`,
        size: 10 + ((i * 7) % 14),
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-10 rounded-[60%_0_60%_0] bg-marigold"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--drift" as string]: p.drift,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

const picadoColors = ["var(--pink)", "var(--marigold)", "var(--velvet)", "var(--water)", "var(--flame)"];

function PapelPicado() {
  return (
    <div className="relative flex w-full justify-center gap-1 overflow-hidden pt-2">
      <div className="absolute left-0 right-0 top-2 h-px bg-foreground/50" />
      {Array.from({ length: 14 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 60 70"
          className="sway grow h-20 w-14 shrink-0 md:h-24 md:w-16"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <path
            d="M0 0h60v58l-5 6-5-6-5 6-5-6-5 6-5-6-5 6-5-6-5 6-5-6-5 6z"
            fill={picadoColors[i % picadoColors.length]}
          />
          {/* cat face cut-out */}
          <path d="M19 14l4 7a10 10 0 0 1 14 0l4-7 1 12a11 11 0 1 1-24 0z" fill="var(--background)" />
          <circle cx="26" cy="27" r="1.8" fill={picadoColors[i % 5]} />
          <circle cx="34" cy="27" r="1.8" fill={picadoColors[i % 5]} />
          <path d="M28.5 31h3l-1.5 2z" fill={picadoColors[i % 5]} />
          <path d="M8 46c3-4 7-4 10 0M42 46c3-4 7-4 10 0" stroke="var(--background)" strokeWidth="2.5" fill="none" />
          <path d="M8 8h5v5H8zM47 8h5v5h-5z" fill="var(--background)" />
        </svg>
      ))}
    </div>
  );
}

function Arch() {
  const n = 22;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[520px] w-full max-w-4xl">
      {Array.from({ length: n }).map((_, i) => {
        const a = Math.PI - (i / (n - 1)) * Math.PI;
        const x = 50 + Math.cos(a) * 46;
        const y = 92 - Math.sin(a) * 86;
        return (
          <div
            key={i}
            className="pointer-events-auto grow absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {i % 3 === 1 ? <Velvet /> : <Marigold size={i % 2 ? 50 : 62} />}
          </div>
        );
      })}
    </div>
  );
}

function Candle({ delay = 0 }: { delay?: number }) {
  return (
    <div className="grow flex flex-col items-center">
      <div className="flame h-10 w-6 rounded-[50%_50%_50%_50%/60%_60%_40%_40%]" style={{ animationDelay: `${delay}s` }} />
      <div className="relative flex h-28 w-16 items-center justify-center overflow-hidden rounded-t-md bg-gradient-to-b from-flame/90 to-marigold">
        <img src={suri.url} alt="Suri en veladora" className="h-12 w-12 rounded-full border-2 border-velvet object-cover" />
      </div>
    </div>
  );
}

function Splash({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <p className="font-display text-5xl text-marigold md:text-7xl">Para Suri</p>
      <p className="max-w-sm text-muted-foreground">Toca la naricita para entrar al altar</p>
      <button
        onClick={onEnter}
        aria-label="Entrar al altar"
        className="nose-pulse grow relative"
      >
        <svg width="180" height="150" viewBox="0 0 180 150">
          <path d="M90 140c-30 0-80-30-80-80C10 25 50 10 90 10s80 15 80 50c0 50-50 80-80 80z" fill="var(--velvet)" />
          <path d="M90 128c-24 0-66-24-66-66C24 34 56 22 90 22s66 12 66 40c0 42-42 66-66 66z" fill="oklch(0.18 0.03 300)" />
          <ellipse cx="62" cy="70" rx="12" ry="18" fill="var(--background)" transform="rotate(-20 62 70)" />
          <ellipse cx="118" cy="70" rx="12" ry="18" fill="var(--background)" transform="rotate(20 118 70)" />
          <ellipse cx="70" cy="40" rx="20" ry="8" fill="var(--foreground)" opacity=".25" />
        </svg>
      </button>
    </div>
  );
}

function Index() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@500;800&family=Josefin+Sans:wght@300;500&display=swap"
      />
      <Petals />
      {!entered && <Splash onEnter={() => setEntered(true)} />}

      {entered && (
        <main className="rise">
          <header>
            <PapelPicado />
          </header>

          <section className="relative mx-auto mt-6 flex max-w-4xl flex-col items-center px-4 pb-10 pt-24">
            <Arch />
            <h1 className="font-display relative z-10 text-6xl text-marigold md:text-8xl">Suri</h1>
            <p className="relative z-10 mt-2 tracking-[0.3em] text-muted-foreground uppercase text-sm">
              Siempre en nuestro corazón
            </p>
            <div className="grow relative z-10 mt-8 rounded-full border-8 border-marigold p-2 shadow-[0_0_60px_var(--marigold)]">
              <img src={suri.url} alt="Suri, mi gata" className="h-56 w-56 rounded-full object-cover md:h-72 md:w-72" />
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 pb-24">
            <div className="rounded-t-3xl border-t-8 border-velvet bg-card px-6 pb-10 pt-12">
              <div className="flex flex-wrap items-end justify-center gap-6 md:gap-10">
                <Candle />
                <Candle delay={0.3} />
                <div className="grow flex flex-col items-center gap-2">
                  <div className="text-5xl">🐟</div>
                  <div className="h-10 w-28 rounded-b-full border-4 border-pink bg-marigold/70" />
                  <span className="text-xs text-muted-foreground">Su comida favorita</span>
                </div>
                <div className="grow flex flex-col items-center gap-2">
                  <div className="h-10 w-28 overflow-hidden rounded-b-full border-4 border-water">
                    <div className="mt-3 h-full bg-water/70" />
                  </div>
                  <span className="text-xs text-muted-foreground">Agüita fresca</span>
                </div>
                <Candle delay={0.6} />
                <Candle delay={0.15} />
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="grow">
                    {i % 2 ? <Velvet size={34} /> : <Marigold size={40} />}
                  </div>
                ))}
              </div>
            </div>
            <p className="font-display mt-12 text-center text-3xl text-flame md:text-4xl">
              “Los que amamos nunca mueren, solo se adelantan.”
            </p>
          </section>
        </main>
      )}
    </div>
  );
}
