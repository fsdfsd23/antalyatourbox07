import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container max-w-7xl container-px py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="https://antalyatourbox.com/image/cache/catalog/yeni-logo-400x84.png.webp"
                alt="Antalya Tourbox"
                className="h-9 w-auto"
                width={120}
                height={25}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Dünyanın dört bir yanındaki eşsiz destinasyonları keşfedin.
              Güvenilir tur partneriniz.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Şirket</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/about" className="hover:text-slate-900">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-slate-900">
                  Turlar
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-slate-900">
                  Destinasyonlar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-slate-900">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Destek</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link to="#" className="hover:text-slate-900">
                  SSS
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-slate-900">
                  Gizlilik
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-slate-900">
                  Şartlar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Bülten</h4>
            <p className="mt-4 text-sm text-slate-600">
              Kampanyalar ve yeni turlar için kayıt olun.
            </p>
            <form className="mt-3 flex items-center gap-2">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="h-10 flex-1 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn btn-primary h-10 px-4">
                Kayıt Ol
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Antalya Tourbox. Tüm Hakları Saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:text-slate-700">
              Twitter
            </Link>
            <Link to="#" className="hover:text-slate-700">
              Instagram
            </Link>
            <Link to="#" className="hover:text-slate-700">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
