export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
      {tag}
    </span>
  );
}
