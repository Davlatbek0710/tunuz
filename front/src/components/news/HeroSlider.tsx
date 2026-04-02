import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroNews = [
  {
    id: 1,
    title: "O'zbekistonda benzin narxlari bo'yicha yangi tartib e'lon qilindi",
    excerpt: "Hukumat yoqilg'i bozorida narxlarni tartibga solish bo'yicha yangi qarorlar qabul qildi. Bu qaror aholining turmush darajasini yaxshilashga qaratilgan.",
    category: "Iqtisodiyot",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&h=600&fit=crop",
    time: "2 soat oldin",
  },
  {
    id: 2,
    title: "Toshkentda yomg'ir tufayli yo'llarda transport tirbandliklari yuzaga keldi",
    excerpt: "Poytaxtda kuchli yomg'ir natijasida bir qator yo'llarda suv to'planib qoldi. Shahar xizmatlari vaziyatni boshqarish uchun favqulodda rejimda ishlamoqda.",
    category: "Jamiyat",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&h=600&fit=crop",
    time: "3 soat oldin",
  },
  {
    id: 3,
    title: "O'zbekiston futbol terma jamoasi Osiyo Kubogida muvaffaqiyat qozondi",
    excerpt: "Milliy terma jamoamiz guruh bosqichida barcha o'yinlarni g'alaba bilan yakunlab, playoff bosqichiga chiqdi.",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
    time: "5 soat oldin",
  },
  {
    id: 4,
    title: "2025-yilda O'zbekiston iqtisodiy o'sish prognozlari oshmoqda",
    excerpt: "Xalqaro moliya institutlari O'zbekiston iqtisodiyotining barqaror o'sishini prognoz qilmoqda. YaIM o'sishi 6% dan oshishi kutilmoqda.",
    category: "Iqtisodiyot",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=600&fit=crop",
    time: "6 soat oldin",
  },
];

const categoryStyles: Record<string, string> = {
  Iqtisodiyot: "category-economy",
  Jamiyat: "category-society",
  Sport: "category-sports",
  Siyosat: "category-politics",
};

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroNews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroNews.length) % heroNews.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroNews.length);
  };

  return (
    <section className="relative bg-navy overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        {heroNews.map((news, index) => (
          <div
            key={news.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative h-full flex items-end pb-12 md:pb-16">
              <div className="max-w-3xl">
                <span className={`category-badge ${categoryStyles[news.category] || "category-politics"} mb-3`}>
                  {news.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
                  <a href="#" className="hover:text-primary-light transition-colors">
                    {news.title}
                  </a>
                </h2>
                <p className="text-gray-300 text-sm md:text-base mb-3 line-clamp-2">
                  {news.excerpt}
                </p>
                <span className="text-gray-400 text-sm">{news.time}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-navy/50 text-white hover:bg-navy/80 h-12 w-12"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-navy/50 text-white hover:bg-navy/80 h-12 w-12"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroNews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
