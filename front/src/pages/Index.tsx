import { Header } from "@/components/news/Header";
import { BreakingNews } from "@/components/news/BreakingNews";
import { HeroSlider } from "@/components/news/HeroSlider";
import { LatestNews } from "@/components/news/LatestNews";
import { CategorySection } from "@/components/news/CategorySection";
import { Sidebar } from "@/components/news/Sidebar";
import { Footer } from "@/components/news/Footer";

// News data
const politicsNews = [
  {
    id: 1,
    title: "O'zbekiston va Yevroittifoq muzokaralari davom etmoqda",
    excerpt: "Tashqi ishlar vazirligi ma'lumotiga ko'ra, ikki tomonlama hamkorlik yangi bosqichga kirmoqda. Muzokara jarayonida savdo va investitsiya masalalari muhokama qilinmoqda.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop",
    category: "Siyosat",
    time: "2 soat oldin",
  },
  {
    id: 2,
    title: "Parlament yangi qonun loyihasini muhokama qildi",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=300&h=200&fit=crop",
    category: "Siyosat",
    time: "3 soat oldin",
  },
  {
    id: 3,
    title: "Hokimlar bilan uchrashuv bo'lib o'tdi",
    image: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=300&h=200&fit=crop",
    category: "Siyosat",
    time: "4 soat oldin",
  },
  {
    id: 4,
    title: "Davlat dasturi doirasida yangi ishlar",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
    category: "Siyosat",
    time: "5 soat oldin",
  },
];

const economyNews = [
  {
    id: 1,
    title: "2025-yilda O'zbekiston iqtisodiy o'sish prognozlari oshmoqda",
    excerpt: "Xalqaro valyuta jamg'armasi va Jahon banki mutaxassislarining fikriga ko'ra, mamlakatimiz iqtisodiyoti barqaror rivojlanishni davom ettirmoqda.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    category: "Iqtisodiyot",
    time: "1 soat oldin",
  },
  {
    id: 2,
    title: "Bank tizimida yangi raqamli xizmatlar ishga tushmoqda",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
    category: "Iqtisodiyot",
    time: "2 soat oldin",
  },
  {
    id: 3,
    title: "Eksport hajmi o'sishda davom etmoqda",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop",
    category: "Iqtisodiyot",
    time: "3 soat oldin",
  },
  {
    id: 4,
    title: "Kichik biznes uchun yangi imtiyozlar",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=200&fit=crop",
    category: "Iqtisodiyot",
    time: "4 soat oldin",
  },
];

const societyNews = [
  {
    id: 1,
    title: "Maktablarda yangi ta'lim dasturlari sinovdan o'tmoqda",
    excerpt: "Xalq ta'limi vazirligi tomonidan ishlab chiqilgan yangi o'quv dasturlari bir qator viloyatlarda sinov sifatida joriy etilmoqda.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    category: "Jamiyat",
    time: "45 daqiqa oldin",
  },
  {
    id: 2,
    title: "Ba'zi hududlarda suv ta'minoti yaxshilanmoqda",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=300&h=200&fit=crop",
    category: "Jamiyat",
    time: "1 soat oldin",
  },
  {
    id: 3,
    title: "Yangi kasalxona binosi foydalanishga topshirildi",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&h=200&fit=crop",
    category: "Jamiyat",
    time: "2 soat oldin",
  },
  {
    id: 4,
    title: "Yoshlar uchun yangi sport inshootlari qurilmoqda",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop",
    category: "Jamiyat",
    time: "3 soat oldin",
  },
];

const sportsNews = [
  {
    id: 1,
    title: "O'zbekiston futbol terma jamoasi Osiyo Kubogida muvaffaqiyat qozondi",
    excerpt: "Milliy terma jamoamiz Osiyo chempionatida navbatdagi g'alabani qo'lga kiritib, play-off bosqichiga ishonchli yo'l oldi.",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
    category: "Sport",
    time: "30 daqiqa oldin",
  },
  {
    id: 2,
    title: "Yosh bokschilar xalqaro turnirda g'alaba qozondi",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&h=200&fit=crop",
    category: "Sport",
    time: "1 soat oldin",
  },
  {
    id: 3,
    title: "Tennis bo'yicha yangi mavsumga tayyorgarlik",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=200&fit=crop",
    category: "Sport",
    time: "2 soat oldin",
  },
  {
    id: 4,
    title: "Kurash bo'yicha milliy chempionat o'tkazildi",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    category: "Sport",
    time: "3 soat oldin",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BreakingNews />
      <HeroSlider />
      
      <main className="container py-8">
        <LatestNews />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CategorySection
              title="Siyosat"
              categoryClass="bg-primary"
              news={politicsNews}
            />
            <CategorySection
              title="Iqtisodiyot"
              categoryClass="bg-category-economy"
              news={economyNews}
            />
            <CategorySection
              title="Jamiyat"
              categoryClass="bg-category-society"
              news={societyNews}
            />
            <CategorySection
              title="Sport"
              categoryClass="bg-category-sports"
              news={sportsNews}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
