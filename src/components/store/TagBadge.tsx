export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#636366] bg-black/5">
      {tag}
    </span>
  );
}
