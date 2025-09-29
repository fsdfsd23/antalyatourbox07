import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-white to-slate-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
