import { ChevronRight } from "lucide-react";
import { NewsCard } from "./NewsCard";

interface NewsItem {
  id: number;
  title: string;
  excerpt?: string;
  image: string;
  category: string;
  time: string;
}

interface CategorySectionProps {
  title: string;
  categoryClass: string;
  news: NewsItem[];
}

export function CategorySection({ title, categoryClass, news }: CategorySectionProps) {
  const mainNews = news[0];
  const sideNews = news.slice(1, 4);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-border">
        <h2 className={`font-serif text-xl font-bold flex items-center gap-2`}>
          <span className={`w-1 h-6 ${categoryClass} rounded-full`} />
          {title}
        </h2>
        <a
          href="#"
          className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Barchasi
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Article */}
        <NewsCard
          title={mainNews.title}
          excerpt={mainNews.excerpt}
          image={mainNews.image}
          category={mainNews.category}
          time={mainNews.time}
        />
        
        {/* Side Articles */}
        <div className="space-y-4">
          {sideNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              image={item.image}
              category={item.category}
              time={item.time}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
