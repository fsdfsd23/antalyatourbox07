import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const defaultImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2400&auto=format&fit=crop", // Deniz/tatil
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=85&w=2400&auto=format&fit=crop", // Tropik sahil
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=2400&auto=format&fit=crop", // Doğa
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=85&w=2400&auto=format&fit=crop", // Şehir/turizm
];

export default function Hero({
  images = defaultImages,
}: {
  images?: string[];
}) {
  const imgs = useMemo(
    () => (images.length ? images : defaultImages),
    [images],
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % imgs.length);
    }, 1000); // 1000 ms
    return () => clearInterval(id);
  }, [imgs.length]);

  return (
    <section
      className="relative h-[350px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2400&auto=format&fit=crop)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Background slider */}
      <div className="absolute inset-0 -z-10">
        <div className="relative h-full w-full overflow-hidden">
          {imgs.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt="Hero slide"
              className={
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
                (i === index ? "opacity-100" : "opacity-0")
              }
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white/40" />
        </div>
      </div>

      <div className="container max-w-7xl container-px h-full text-white">
        <div className="flex h-full items-center">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-white/90">
              Hayalinizdeki Tatil
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
              Dünyayı Keşfetmeye Hazır Mısınız?
            </h1>
            <p className="mt-3 text-white/90 max-w-xl">
              Unutulmaz destinasyonlar, esnek planlar ve güvenilir rehberlerle
              dolu turlar. Şimdi planlamaya başlayın.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link to="#search" className="btn btn-accent h-10 px-5">
                Turları Keşfet
              </Link>
              <Link
                to="/about"
                className="btn btn-outline h-10 px-5 border-white text-white hover:bg-white/10"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
