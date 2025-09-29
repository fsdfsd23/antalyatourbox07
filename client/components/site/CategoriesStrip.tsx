type Category = { name: string; image: string };

const defaultCats: Category[] = [
  {
    name: "Doğa",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Şehir",
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Deniz",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Kültür",
    image:
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Macera",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Balayı",
    image:
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Kayak",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Spa",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Kamp",
    image:
      "https://images.unsplash.com/photo-1504280390368-3971f660dd4b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Gastronomi",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Aile",
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Gece Hayatı",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop",
  },
];

export default function CategoriesStrip({
  categories = defaultCats,
}: {
  categories?: Category[];
}) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8">
      <div className="overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8">
        <div className="flex gap-5 py-2">
          {categories.map((c) => (
            <button
              key={c.name}
              className="group flex w-[84px] flex-col items-center text-center"
            >
              <span className="relative inline-flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gradient-to-tr from-accent to-primary p-[3px]">
                <span className="rounded-full bg-white p-[2px]">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                </span>
              </span>
              <span className="mt-2 text-xs font-medium text-slate-700 group-hover:text-slate-900 truncate w-full">
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
