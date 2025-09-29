import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MENU_OPTIONS,
  EXTRA_SERVICES_YACHT,
  ENTERTAINMENT_PACKAGES,
} from "@/lib/yachts";
import { useYachtRental } from "@/context/YachtRentalContext";

export default function ExtrasModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { setQty, quantities } = useYachtRental();

  const renderList = (items: { id: string; name: string; price: number }[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((i) => (
        <div
          key={i.id}
          className="border rounded-lg p-4 flex items-center justify-between gap-3"
        >
          <div>
            <div className="font-medium">{i.name}</div>
            <div className="text-xs text-slate-600">
              ₺ {i.price.toLocaleString("tr-TR")} / kişi
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setQty(i.id, Math.max(0, (quantities[i.id] || 0) - 1))
              }
            >
              -
            </Button>
            <Input
              className="w-16 text-center"
              value={quantities[i.id] || 0}
              onChange={(e) => setQty(i.id, Number(e.target.value || 0))}
            />
            <Button
              type="button"
              onClick={() => setQty(i.id, (quantities[i.id] || 0) + 1)}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Yemek, Paket ve Ekstra Hizmetler</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="menu">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="menu">Yemek Seçenekleri</TabsTrigger>
            <TabsTrigger value="extra">Ekstra Hizmetler</TabsTrigger>
            <TabsTrigger value="ent">Eğlence Paketleri</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">{renderList(MENU_OPTIONS)}</TabsContent>
          <TabsContent value="extra">
            {renderList(EXTRA_SERVICES_YACHT)}
          </TabsContent>
          <TabsContent value="ent">
            {renderList(ENTERTAINMENT_PACKAGES)}
          </TabsContent>
        </Tabs>
        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Kaydet</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
