import { Clock, ChevronRight } from "lucide-react";

const latestNews = [
  {
    id: 1,
    title: "Samarqandda xalqaro turizm forumi o'tkazildi",
    time: "15 daqiqa oldin",
    category: "Jamiyat",
  },
  {
    id: 2,
    title: "Oliy Majlis yangi qonun loyihasini tasdiqladi",
    time: "32 daqiqa oldin",
    category: "Siyosat",
  },
  {
    id: 3,
    title: "Dollar kursi barqarorlashmoqda",
    time: "1 soat oldin",
    category: "Iqtisodiyot",
  },
  {
    id: 4,
    title: "Toshkent viloyatida yangi korxona ochildi",
    time: "1 soat oldin",
    category: "Iqtisodiyot",
  },
  {
    id: 5,
    title: "Maktablarda qishki ta'til e'lon qilindi",
    time: "2 soat oldin",
    category: "Jamiyat",
  },
  {
    id: 6,
    title: "Namangan shahri rivojlanish rejasi tasdiqlandi",
    time: "2 soat oldin",
    category: "Jamiyat",
  },
];

const categoryStyles: Record<string, string> = {
  Jamiyat: "text-category-society",
  Siyosat: "text-category-politics",
  Iqtisodiyot: "text-category-economy",
  Sport: "text-category-sports",
};

export function LatestNews() {
  return (
    <section className="bg-card rounded-lg shadow-card p-4 md:p-6 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
        <h2 className="font-serif text-xl font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          So'nggi yangiliklar
        </h2>
        <a
          href="#"
          className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Barchasi
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {latestNews.map((news) => (
          <article key={news.id} className="flex items-start gap-3 group">
            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                <a href="#">{news.title}</a>
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-medium ${categoryStyles[news.category] || "text-primary"}`}>
                  {news.category}
                </span>
                <span className="text-xs text-muted-foreground">• {news.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
