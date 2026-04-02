import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Globe, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Yangiliklar", href: "#" },
  { label: "Siyosat", href: "#" },
  { label: "Iqtisodiyot", href: "#" },
  { label: "Jamiyat", href: "#" },
  { label: "Sport", href: "#" },
  { label: "Dunyo", href: "#" },
  { label: "Texnologiya", href: "#" },
  { label: "Madaniyat", href: "#" },
];

const languages = [
  { code: "UZ", label: "O'zbekcha" },
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UZ");

  return (
    <header className="sticky top-0 z-50 bg-card shadow-card">
      {/* Top Bar */}
      <div className="bg-navy text-navy-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <span className="text-muted-foreground">
            {new Date().toLocaleDateString("uz-UZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-navy-foreground hover:bg-primary-dark gap-1.5">
                <Globe className="h-4 w-4" />
                {currentLang}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={currentLang === lang.code ? "bg-accent" : ""}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-3xl md:text-4xl font-serif font-black text-primary">TUN</span>
              <span className="text-3xl md:text-4xl font-serif font-black text-primary-dark">.UZ</span>
            </div>
            <span className="hidden sm:block text-xs text-muted-foreground border-l border-border pl-2 ml-1 leading-tight">
              O'zbekiston<br />yangiliklari
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Yangiliklar qidirish..."
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>

          {/* Auth & Mobile Controls */}
          <div className="flex items-center gap-2">
            {/* Auth Button - Desktop */}
            <Link to="/auth" className="hidden md:flex">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Kirish
              </Button>
            </Link>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1 md:hidden">
              <Link to="/auth">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="mt-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Yangiliklar qidirish..."
                className="pl-10 bg-secondary"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-primary">
        <div className="container">
          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center -mx-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block px-4 py-3 text-primary-foreground font-medium hover:bg-primary-dark transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <ul className="md:hidden py-2 divide-y divide-primary-dark">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-primary-foreground font-medium hover:bg-primary-dark transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
