import { Clock } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt?: string;
  image: string;
  category: string;
  time: string;
  variant?: "default" | "small" | "horizontal";
}

const categoryStyles: Record<string, string> = {
  Iqtisodiyot: "category-economy",
  Jamiyat: "category-society",
  Sport: "category-sports",
  Siyosat: "category-politics",
  Dunyo: "category-world",
  Texnologiya: "category-tech",
  Madaniyat: "category-culture",
};

export function NewsCard({ title, excerpt, image, category, time, variant = "default" }: NewsCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="flex gap-4 group">
        <div className="w-24 h-20 md:w-32 md:h-24 shrink-0 overflow-hidden rounded">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`category-badge ${categoryStyles[category] || "category-politics"} mb-1.5`}>
            {category}
          </span>
          <h3 className="news-title text-sm md:text-base line-clamp-2 mb-1">
            <a href="#" className="hover:text-primary transition-colors">
              {title}
            </a>
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "small") {
    return (
      <article className="group">
        <div className="aspect-[16/10] overflow-hidden rounded mb-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className={`category-badge ${categoryStyles[category] || "category-politics"} mb-1.5`}>
          {category}
        </span>
        <h3 className="news-title text-sm line-clamp-2 mb-1">
          <a href="#" className="hover:text-primary transition-colors">
            {title}
          </a>
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <span className={`category-badge ${categoryStyles[category] || "category-politics"} mb-2`}>
          {category}
        </span>
        <h3 className="news-title text-lg mb-2 line-clamp-2">
          <a href="#" className="hover:text-primary transition-colors">
            {title}
          </a>
        </h3>
        {excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {excerpt}
          </p>
        )}
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Clock className="h-3 w-3" />
          <span>{time}</span>
        </div>
      </div>
    </article>
  );
}
