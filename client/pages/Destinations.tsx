import { AspectRatio } from "@/components/ui/aspect-ratio";

const cities = [
  {
    name: "ANTALYA",
    image:
      "https://images.unsplash.com/photo-1577512077204-3c1c1f261c5e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "MUĞLA",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "ALANYA",
    image:
      "https://images.unsplash.com/photo-1590416291037-3e1fcf68df2e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "TRABZON",
    image:
      "https://images.unsplash.com/photo-1603985529862-9f3b6b7f6b84?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "İSTANBUL",
    image:
      "https://images.unsplash.com/photo-1561204987-021f4f42e3d9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "İZMİR",
    image:
      "https://images.unsplash.com/photo-1589287705542-b73ebdea6d5d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Destinations() {
  return (
    <div className="container max-w-7xl container-px py-12">
      <h1 className="text-3xl font-extrabold text-slate-900">Destinasyonlar</h1>
      <p className="mt-3 text-slate-600 max-w-2xl">
        Popüler şehirlerimizi keşfedin. Bir destinasyon seçerek turları görüntüleyin.
      </p>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {cities.map((c) => (
          <div key={c.name} className="group relative overflow-hidden rounded-xl border bg-white shadow-sm">
            <AspectRatio ratio={1}>
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-md bg-black/40 px-3 py-1.5 text-white text-sm font-semibold tracking-wide">
                  {c.name}
                </span>
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  );
}
