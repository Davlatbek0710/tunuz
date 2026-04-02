import { Cloud, Sun, CloudRain, TrendingUp, Play } from "lucide-react";
import { NewsCard } from "./NewsCard";

const trendingNews = [
  {
    id: 1,
    title: "Prezident yangi farmonga imzo chekdi",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=200&h=150&fit=crop",
    category: "Siyosat",
    time: "1 soat",
  },
  {
    id: 2,
    title: "Dollar kursi bugungi holat",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=200&h=150&fit=crop",
    category: "Iqtisodiyot",
    time: "2 soat",
  },
  {
    id: 3,
    title: "Yangi metro liniyasi ochildi",
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=200&h=150&fit=crop",
    category: "Jamiyat",
    time: "3 soat",
  },
  {
    id: 4,
    title: "O'zbekiston va Qozog'iston hamkorligi",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=200&h=150&fit=crop",
    category: "Dunyo",
    time: "4 soat",
  },
];

const videoNews = [
  {
    id: 1,
    title: "Toshkent ko'chalaridan jonli reportaj",
    thumbnail: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&h=170&fit=crop",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Sport yangiliklari sharhi",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&h=170&fit=crop",
    duration: "5:20",
  },
];

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Weather Widget */}
      <div className="bg-card rounded-lg shadow-card p-4">
        <h3 className="font-serif font-bold text-lg mb-3 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Ob-havo
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">+1°C</div>
            <div className="text-muted-foreground text-sm">Toshkent</div>
          </div>
          <div className="text-right">
            <CloudRain className="h-12 w-12 text-primary mb-1" />
            <div className="text-sm text-muted-foreground">Yomg'irli</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <Sun className="h-5 w-5 mx-auto text-yellow-500" />
            <div className="font-medium">+5°</div>
            <div className="text-muted-foreground text-xs">Ertaga</div>
          </div>
          <div>
            <Cloud className="h-5 w-5 mx-auto text-gray-400" />
            <div className="font-medium">+3°</div>
            <div className="text-muted-foreground text-xs">23-dek</div>
          </div>
          <div>
            <CloudRain className="h-5 w-5 mx-auto text-primary" />
            <div className="font-medium">+2°</div>
            <div className="text-muted-foreground text-xs">24-dek</div>
          </div>
        </div>
      </div>

      {/* Trending News */}
      <div className="bg-card rounded-lg shadow-card p-4">
        <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-breaking" />
          Ko'p o'qilganlar
        </h3>
        <div className="space-y-4">
          {trendingNews.map((news, index) => (
            <div key={news.id} className="flex gap-3 group">
              <span className="text-2xl font-serif font-bold text-muted-foreground/50 shrink-0 w-8">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  <a href="#">{news.title}</a>
                </h4>
                <span className="text-xs text-muted-foreground">{news.time} oldin</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-card rounded-lg shadow-card p-4">
        <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
          <Play className="h-5 w-5 text-breaking" />
          Video yangiliklar
        </h3>
        <div className="space-y-3">
          {videoNews.map((video) => (
            <a key={video.id} href="#" className="block group">
              <div className="relative aspect-video rounded overflow-hidden mb-2">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-navy/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-breaking flex items-center justify-center">
                    <Play className="h-5 w-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-navy/80 text-white text-xs px-2 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </h4>
            </a>
          ))}
        </div>
      </div>

      {/* Ad Banner */}
      <div className="bg-muted rounded-lg p-6 text-center">
        <div className="text-muted-foreground text-sm mb-2">Reklama</div>
        <div className="h-48 flex items-center justify-center border-2 border-dashed border-border rounded">
          <span className="text-muted-foreground">300x250</span>
        </div>
      </div>
    </aside>
  );
}
