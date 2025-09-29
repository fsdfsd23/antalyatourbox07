import { useEffect, useState } from "react";
import { DemoResponse } from "@shared/api";
import Hero from "@/components/site/Hero";
import SearchBar from "@/components/site/SearchBar";
import SectionHeading from "@/components/site/SectionHeading";
import DestinationCard from "@/components/site/DestinationCard";
import CategoriesStrip from "@/components/site/CategoriesStrip";
import TourSummaryCard from "@/components/site/TourSummaryCard";

const destinations = [
  {
    title: "Bali Adası",
    country: "Endonezya",
    priceFrom: "₺8.500'den",
    image:
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Kapadokya",
    country: "Türkiye",
    priceFrom: "₺4.200'den",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Paris",
    country: "Fransa",
    priceFrom: "₺9.900'den",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Maldivler",
    country: "Hint Okyanusu",
    priceFrom: "₺12.500'den",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400&auto=format&fit=crop",
  },
];

const tourSummaries = [
  {
    title: "Antalya Şehir Turu",
    summary: "Kaleiçi, Duden Şelalesi ve Konyaaltı sahili ile dolu bir gün.",
    price: "₺1.200",
    image:
      "https://images.unsplash.com/photo-1600271886715-4d3bde1d9742?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Kapadokya Balon Deneyimi",
    summary: "Peri bacaları üzerinde gün doğumu.",
    price: "₺4.500",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "İstanbul Boğaz Turu",
    summary: "Vapur ile Asya-Avrupa arasında tarihi bir rota.",
    price: "₺950",
    image:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Ege Koyları Tekne Turu",
    summary: "Turkuaz koylarda yüzme molaları.",
    price: "₺2.600",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pamukkale ve Hierapolis",
    summary: "Beyaz travertenler ve antik şehir keşfi.",
    price: "₺1.800",
    image:
      "https://images.unsplash.com/photo-1609582848250-8867287cab4c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Efes Antik Kenti",
    summary: "Tarihi sokaklarda rehberli yürüyüş.",
    price: "₺1.900",
    image:
      "https://images.unsplash.com/photo-1607326948082-5f3199a5742f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Bursa Uludağ Kayak",
    summary: "Gün boyu skipass ve ekipman dahil.",
    price: "₺3.400",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Fethiye Yamaç Paraşütü",
    summary: "Babadağ’dan Ölüdeniz manzarası.",
    price: "₺3.200",
    image:
      "https://images.unsplash.com/photo-1516221031470-8cd59a4ab674?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Nemrut Dağı Güneş Doğumu",
    summary: "Anıtsal heykeller arasında büyüleyici anlar.",
    price: "₺2.200",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Rize Ayder Yaylası",
    summary: "Karadeniz’in yeşil köşelerinde doğa yürüyüşü.",
    price: "₺2.000",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Mardin Eski Şehir",
    summary: "Taş evleri ve dar sokaklarıyla kültür turu.",
    price: "₺1.700",
    image:
      "https://images.unsplash.com/photo-1589731441569-3677e8d11940?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Bodrum Gece Hayatı",
    summary: "Marina ve barlar sokağında eğlence.",
    price: "₺1.300",
    image:
      "https://images.unsplash.com/photo-1566125882310-e7672e36b96a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Datça Doğa Kaçamağı",
    summary: "Knidos ve ıssız koylar.",
    price: "₺2.300",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Amasra Lezzet Turu",
    summary: "Balık ve salata molalı Karadeniz günü.",
    price: "₺1.150",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Kars Doğu Ekspresi",
    summary: "Kış manzaralarıyla masalsı yolculuk.",
    price: "₺4.800",
    image:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Ağva Nehir Turu",
    summary: "Gondol ile sakin bir gün.",
    price: "₺1.000",
    image:
      "https://images.unsplash.com/photo-1516908205727-40afad9449d9?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Index() {
  const [exampleFromServer, setExampleFromServer] = useState("");
  const [showAllTours, setShowAllTours] = useState(false);
  useEffect(() => {
    fetchDemo();
  }, []);

  const fetchDemo = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setExampleFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  const visibleTours = showAllTours ? tourSummaries : tourSummaries.slice(0, 8);

  return (
    <div>
      <Hero />
      <SearchBar />

      <section className="container max-w-7xl container-px py-14">
        <SectionHeading title="Popüler Destinasyonlar" subtitle="Keşfet" />
        <CategoriesStrip />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.title} {...d} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1706725/pexels-photo-1706725.jpeg"
            alt="Antalya kıyı manzarası - tur temalı arka plan"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/70 via-red-600/60 to-black/60" />
        </div>
        <div className="container max-w-7xl container-px py-14 text-white relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Erken Rezervasyon Fırsatları
              </h3>
              <p className="mt-3 text-white/90 max-w-xl">
                Yaz tatilinizi bugünden planlayın, en iyi fiyatları kaçırmayın.
                Esnek iptal hakkı ve güvenli ödeme ile rahat edin.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#search" className="btn btn-accent h-11 px-6">
                Fiyatları Gör
              </a>
              <a
                href="/tours"
                className="btn btn-outline h-11 px-6 border-white text-white hover:bg-white/10"
              >
                Turlara Göz At
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-7xl container-px pt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleTours.map((t) => (
            <TourSummaryCard key={t.title} {...t} />
          ))}
        </div>
        {!showAllTours && (
          <div className="mt-6 flex justify-center">
            <button
              className="btn btn-outline h-11 px-6"
              onClick={() => setShowAllTours(true)}
            >
              Load JS
            </button>
          </div>
        )}
      </section>

      <section className="container max-w-7xl container-px py-14">
        <SectionHeading title="Neden DreamsTour?" subtitle="Avantajlarımız" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Uzman Rehberler",
              desc: "Bölgesini en iyi bilen profesyonellerle güvenli keşif.",
              icon: (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
            {
              title: "Esnek Planlar",
              desc: "İhtiyacınıza göre değiştirilebilir tarih ve rotalar.",
              icon: (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M3 6h18M3 12h12m-7 6h13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
            {
              title: "Uygun Fiyat",
              desc: "Erken rezervasyonda özel kampanyalar ve taksit.",
              icon: (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M12 1v22M3 8h18M3 16h18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
            {
              title: "7/24 Destek",
              desc: "Her adımda yanınızdayız, hızlı müşteri desteği.",
              icon: (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M21 15a4 4 0 00-4-4H7a4 4 0 000 8h2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              ),
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {f.icon}
              </div>
              <h4 className="mt-4 font-semibold text-slate-900">{f.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container max-w-7xl container-px py-14">
        <div className="rounded-2xl bg-slate-900 p-8 sm:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Bültene Kayıt Olun
              </h3>
              <p className="mt-3 text-white/80">
                İndirimler ve yeni turlar için e-posta alın.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="h-11 flex-1 rounded-md border border-white/20 bg-white/10 px-3 text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="btn btn-accent h-11 px-6">Kayıt Ol</button>
            </form>
          </div>
        </div>
      </section>

      <p className="sr-only">{exampleFromServer}</p>
    </div>
  );
}
