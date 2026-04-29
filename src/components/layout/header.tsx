"use client";

import { useEffect, useState, useSyncExternalStore, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, User, LogIn } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Services", href: "/services" },
  { name: "Réalisations", href: "/realisations" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

interface UserData {
  id: string;
  name?: string;
  email: string;
  role: string;
}

// Hook pour lire localStorage de manière sûre avec SSR
function useLocalStorageUser() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser;
  }, []);

  const getServerSnapshot = useCallback(() => null, []);

  const storedUser = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!storedUser) return null;
  
  try {
    return JSON.parse(storedUser) as UserData;
  } catch {
    return null;
  }
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useLocalStorageUser();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userFirstName = user?.name?.trim()
    ? user.name.trim().split(/\s+/)[0]
    : "Mon profil";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-lg",
        isScrolled && "shadow-lg"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/logo.png"
                alt="Khidma Service Digital"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground-secondary hover:text-ksd-orange transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Link href="/profil">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    {userFirstName}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/connexion">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LogIn className="w-4 h-4" />
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/inscription">
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      Inscription
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/demande-devis" className="hidden sm:block">
              <Button>Demander un devis</Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-foreground hover:bg-background-secondary rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/demande-devis" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Demander un devis</Button>
                </Link>
                {user ? (
                  <Link href="/profil" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full gap-2">
                      <User className="w-4 h-4" />
                      Mon Profil
                    </Button>
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/connexion" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Connexion</Button>
                    </Link>
                    <Link href="/inscription" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">Inscription</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
