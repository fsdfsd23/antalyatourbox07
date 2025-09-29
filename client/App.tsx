import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/site/Layout";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TourDetail from "./pages/TourDetail";
import TransferResults from "./pages/TransferResults";
import { CarRentalProvider } from "@/context/CarRentalContext";
import CarRentalList from "./pages/CarRentalList";
import CarRentalDetail from "./pages/CarRentalDetail";
import CarRentalCheckout from "./pages/CarRentalCheckout";
import CarRentalConfirmation from "./pages/CarRentalConfirmation";
import { YachtRentalProvider } from "@/context/YachtRentalContext";
import YachtList from "./pages/YachtList";
import YachtDetail from "./pages/YachtDetail";
import BusResults from "./pages/BusResults";
import BusCheckout from "./pages/BusCheckout";
import BusVoucher from "./pages/BusVoucher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CarRentalProvider>
        <YachtRentalProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/:id" element={<TourDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/transfer-sonuclar"
                  element={<TransferResults />}
                />
                <Route path="/arac-kiralama" element={<CarRentalList />} />
                <Route
                  path="/arac-kiralama/arac/:id"
                  element={<CarRentalDetail />}
                />
                <Route
                  path="/arac-kiralama/checkout"
                  element={<CarRentalCheckout />}
                />
                <Route
                  path="/arac-kiralama/sonuc"
                  element={<CarRentalConfirmation />}
                />
                <Route path="/yat-kiralama" element={<YachtList />} />
                <Route path="/yat-kiralama/:id" element={<YachtDetail />} />
                <Route path="/otobus" element={<BusResults />} />
                <Route path="/otobus/checkout" element={<BusCheckout />} />
                <Route path="/otobus/voucher" element={<BusVoucher />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </YachtRentalProvider>
      </CarRentalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
