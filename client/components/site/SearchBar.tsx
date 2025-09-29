function OtobusForm() {
  const navigate = useNavigate();
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const from = fromRef.current?.value?.trim() || "İstanbul";
        const to = toRef.current?.value?.trim() || "İzmir";
        const date = dateRef.current?.value || new Date().toISOString().slice(0, 10);
        navigate(`/otobus?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
      }}
    >
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">Nereden</label>
        <input ref={fromRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir" defaultValue="İstanbul" />
      </div>
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">Nereye</label>
        <input ref={toRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir" defaultValue="İzmir" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">Tarih</label>
        <input ref={dateRef} type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={new Date().toISOString().slice(0, 10)} />
      </div>
      <div className="lg:col-span-1 flex items-end">
        <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
      </div>
    </form>
  );
}
