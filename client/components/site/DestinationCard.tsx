type Props = {
  title: string;
  country: string;
  priceFrom: string;
  image: string;
};

export default function DestinationCard({
  title,
  country,
  priceFrom,
  image,
}: Props) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h3 className="text-base sm:text-lg font-semibold leading-tight">
              {title}
            </h3>
            <p className="text-xs opacity-90">{country}</p>
          </div>
          <span className="rounded-md bg-white/20 px-2 py-1 text-xs backdrop-blur">
            {priceFrom}
          </span>
        </div>
      </div>
      <div className="p-4">
        <button className="btn btn-primary h-10 w-full">Detayları Gör</button>
      </div>
    </div>
  );
}
