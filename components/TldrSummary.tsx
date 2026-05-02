interface TldrSummaryProps {
  points: string[];
}

export default function TldrSummary({ points }: TldrSummaryProps) {
  return (
    <div className="tldr-summary bg-gray-900 border-4 border-white p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
      <h2 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
        <span>&#9632;</span> TL;DR
      </h2>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="text-gray-300 flex items-start gap-2 text-sm leading-relaxed">
            <span className="text-white mt-0.5 shrink-0">&#9656;</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
