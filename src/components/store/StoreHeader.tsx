export default function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[rgba(242,242,247,0.85)] backdrop-blur-xl border-b border-black/5">
      <div className="max-w-5xl mx-auto px-5 flex items-end justify-between h-14">
        <div>
          <p className="text-[11px] font-semibold text-[#636366] uppercase tracking-wider">KamTech</p>
          <h1 className="text-[22px] font-bold text-[#1c1c1e] leading-tight">Store</h1>
        </div>
        <nav className="flex gap-5 pb-1">
          <a href="#featured" className="text-[15px] font-medium text-[#007aff]">En vedette</a>
          <a href="#apps" className="text-[15px] font-medium text-[#007aff]">Apps</a>
        </nav>
      </div>
    </header>
  );
}
