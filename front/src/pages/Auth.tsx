import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "register";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Xatolik",
        description: "Iltimos, barcha maydonlarni to'ldiring",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (mode === "register") {
      if (!formData.name) {
        toast({
          title: "Xatolik",
          description: "Iltimos, ismingizni kiriting",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Xatolik",
          description: "Parollar mos kelmaydi",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        toast({
          title: "Xatolik",
          description: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: mode === "login" ? "Tizimga kirish" : "Ro'yxatdan o'tish",
        description: "Backend funksiyasi uchun Lovable Cloud ni ulang",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Back to home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifaga qaytish
          </Link>

          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-3xl font-serif font-black text-primary">TUN</span>
              <span className="text-3xl font-serif font-black text-primary-dark">.UZ</span>
            </Link>
            <p className="text-muted-foreground mt-2">
              {mode === "login"
                ? "Hisobingizga kiring"
                : "Yangi hisob yarating"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Ism</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ismingizni kiriting"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Parolingizni kiriting"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolni qayta kiriting"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  Parolni unutdingizmi?
                </a>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading
                ? "Yuklanmoqda..."
                : mode === "login"
                ? "Kirish"
                : "Ro'yxatdan o'tish"}
            </Button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center text-sm">
            {mode === "login" ? (
              <p className="text-muted-foreground">
                Hisobingiz yo'qmi?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Ro'yxatdan o'ting
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                Hisobingiz bormi?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Tizimga kiring
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-navy opacity-90" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-primary-foreground">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">
              O'zbekiston yangiliklari bir joyda
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              TUN.UZ — ishonchli, dolzarb va ob'ektiv xabarlar manbai. Siyosat, iqtisodiyot, jamiyat va sport yangiliklar bilan doimo xabardor bo'ling.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-foreground/20 rounded-full" />
          <div className="absolute bottom-32 right-16 w-48 h-48 border border-primary-foreground/10 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary-foreground/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
