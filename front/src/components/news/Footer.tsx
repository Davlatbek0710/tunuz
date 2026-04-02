import { Send, Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  about: [
    { label: "Biz haqimizda", href: "#" },
    { label: "Tahririyat", href: "#" },
    { label: "Bog'lanish", href: "#" },
    { label: "Reklama", href: "#" },
  ],
  categories: [
    { label: "Siyosat", href: "#" },
    { label: "Iqtisodiyot", href: "#" },
    { label: "Jamiyat", href: "#" },
    { label: "Sport", href: "#" },
  ],
  legal: [
    { label: "Foydalanish shartlari", href: "#" },
    { label: "Maxfiylik siyosati", href: "#" },
    { label: "Huquqiy ma'lumot", href: "#" },
  ],
};

const socialLinks = [
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-serif font-black text-primary-light">TUN</span>
              <span className="text-3xl font-serif font-black text-primary">.UZ</span>
            </a>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              O'zbekiston yangiliklari portali. Ishonchli, dolzarb va ob'ektiv xabarlar manbai.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-dark/30 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Biz haqimizda</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-light transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Bo'limlar</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-light transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4">Huquqiy</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-primary-light transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="text-sm text-gray-400">
                <div className="mb-1">Tel: +998 71 123 45 67</div>
                <div>Email: info@tun.uz</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>© 2024 TUN.UZ — Barcha huquqlar himoyalangan</div>
            <div className="flex items-center gap-4">
              <span>O'zbekiston Respublikasi OAV ro'yxatidan o'tgan №12345</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
