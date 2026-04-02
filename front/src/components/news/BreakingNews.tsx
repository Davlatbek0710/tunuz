import { AlertCircle } from "lucide-react";

const breakingHeadlines = [
  "TEZKOR: O'zbekistonda benzin narxlari bo'yicha yangi tartib e'lon qilindi",
  "TEZKOR: Toshkentda yomg'ir tufayli yo'llarda transport tirbandliklari yuzaga keldi",
  "TEZKOR: O'zbekiston va Yevroittifoq muzokaralari muvaffaqiyatli yakunlandi",
  "TEZKOR: Prezident yangi farmonga imzo chekdi",
];

export function BreakingNews() {
  return (
    <div className="bg-breaking text-breaking-foreground overflow-hidden">
      <div className="container py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0 bg-breaking-foreground text-breaking px-3 py-1 rounded font-bold text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>TEZKOR XABAR</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex animate-ticker whitespace-nowrap">
              {[...breakingHeadlines, ...breakingHeadlines].map((headline, index) => (
                <a
                  key={index}
                  href="#"
                  className="inline-block px-8 hover:underline font-medium"
                >
                  {headline}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
