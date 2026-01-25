'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Battery,
  Wifi,
  Search,
  User,
  Briefcase,
  Mail,
  Home,
  Menu,
  X,
  Sparkles,
  Video,
  LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { useCopyMode } from '@/components/copy-mode-provider';
import { AnimatePresence, motion } from 'framer-motion';

// Types
interface MenuItemOption {
  label?: string;
  action?: string;
  shortcut?: string;
  type?: 'item' | 'separator';
  hasSubmenu?: boolean;
  href?: string;
}

interface MenuConfig {
  label: string;
  items: MenuItemOption[];
}

interface MacOSMenuBarProps {
  appName?: string;
  menus?: MenuConfig[];
  onMenuAction?: (action: string) => void;
  className?: string;
}

// Apple menu items
const APPLE_MENU_ITEMS: MenuItemOption[] = [
  { label: 'About This Portfolio', action: 'about', href: '/about' },
  { type: 'separator' },
  { label: 'System Settings...', action: 'preferences' },
  { label: 'Project Store...', action: 'app-store', href: '/projects' },
  { type: 'separator' },
  { label: 'Force Quit...', action: 'force-quit', shortcut: '⌥⌘⎋' },
  { type: 'separator' },
  { label: 'Sleep', action: 'sleep' },
  { label: 'Restart...', action: 'restart' },
  { label: 'Shut Down...', action: 'shutdown' },
  { type: 'separator' },
  { label: 'Lock Screen', action: 'lock', shortcut: '⌃⌘Q' },
  { label: 'Log Out Gian...', action: 'logout', shortcut: '⇧⌘Q' },
];

// MenuDropdown Component
interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItemOption[];
  position: { x: number; y: number };
  onAction?: (action: string) => void;
  isMobile?: boolean;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  isOpen,
  onClose,
  items,
  position,
  onAction,
  isMobile
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute backdrop-blur-3xl z-[100] animate-menuFadeIn bg-white/70 dark:bg-black/40 border border-zinc-400 dark:border-white/10 shadow-2xl ${isMobile ? "fixed inset-x-4 top-16 mx-auto w-auto" : ""}`}
      style={!isMobile ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        minWidth: '240px',
        borderRadius: '12px',
      } : { borderRadius: '12px' }}
    >
      <div className="py-1">
        {items.map((item, index) => {
          if (item.type === 'separator') {
            return (
              <div
                key={index}
                className="h-px bg-black/5 dark:bg-white/10 mx-1 my-1"
              />
            );
          }

          const content = (
            <div
              key={index}
              className="px-3 py-1 text-foreground dark:text-white text-[13px] cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-75 flex justify-between items-center group mx-1 rounded-md"
              onClick={() => {
                if (item.action) {
                  onAction?.(item.action);
                }
                onClose();
              }}
            >
              <span className="flex items-center pl-1">
                {item.label}
                {item.hasSubmenu && (
                  <span className="ml-auto text-[10px] opacity-70 group-hover:opacity-100">▶</span>
                )}
              </span>
              {!isMobile && item.shortcut && (
                <span className="text-xs text-muted-foreground dark:text-white/50 group-hover:text-white ml-6 pr-1 font-normal">
                  {item.shortcut}
                </span>
              )}
            </div>
          );

          if (item.href) {
            return (
              <Link key={index} href={item.href}>
                {content}
              </Link>
            );
          }

          return content;
        })}
      </div>
    </div>
  );
};

// MiniFolder Component for menu icons
interface MiniFolderProps {
  color: string;
}

const MiniFolder: React.FC<MiniFolderProps> = ({ color }) => {
  // Parse the rgba color to extract components
  const baseColor = color.replace(/[\d.]+\)$/, '');

  // Opacity values - reduced by ~10% as requested
  const folderBackColor = `${baseColor}0.65)`;
  const folderFrontColor = `${baseColor}0.75)`;
  const folderTabColor = `${baseColor}0.85)`;
  const folderGlowColor = `${baseColor}0.35)`;

  return (
    <div className="relative w-[36px] h-[27px] flex items-center justify-center mb-2 group/folder perspective-[600px]">
      {/* Background Glow - Matches project folders */}
      <div
        className="absolute inset-[-12px] opacity-60 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${folderGlowColor} 0%, transparent 70%)`,
          zIndex: 0
        }}
      />
      {/* Folder Back Layer */}
      <div
        className="absolute rounded-[3px] backdrop-blur-[4px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/folder:bg-opacity-100 group-hover/folder:[transform:translateY(0)_rotateX(-10deg)]"
        style={{
          backgroundColor: folderBackColor,
          width: '36px',
          height: '27px',
          border: '0.5px solid rgba(255,255,255,0.2)',
          transformOrigin: 'bottom center',
          transform: 'translateY(0) rotateX(0deg)',
          zIndex: 1
        }}
      />

      {/* Folder Tab */}
      <div
        className="absolute rounded-t-[2px] backdrop-blur-[4px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/folder:[transform:rotateX(-15deg)_translateY(-1px)]"
        style={{
          backgroundColor: folderTabColor,
          width: '14px',
          height: '5px',
          top: '-4px',
          left: '4px',
          border: '0.5px solid rgba(255,255,255,0.25)',
          borderBottom: 'none',
          transformOrigin: 'bottom center',
          transform: 'rotateX(0deg)',
          zIndex: 1
        }}
      />

      {/* Folder Front Layer */}
      <div
        className="absolute rounded-[3px] backdrop-blur-[4px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/folder:[transform:translateY(0)_rotateX(15deg)_translateY(2px)]"
        style={{
          backgroundColor: folderFrontColor,
          width: '36px',
          height: '27px',
          top: '1px',
          border: '0.5px solid rgba(255,255,255,0.2)',
          transformOrigin: 'bottom center',
          zIndex: 10
        }}
      />
    </div>
  );
};

const MacOSMenuBar: React.FC<MacOSMenuBarProps> = ({
  appName = 'Gian Aibo',
  menus,
  onMenuAction,
  className = ''
}) => {
  const { copyMode, toggleCopyMode } = useCopyMode();
  const [currentTime, setCurrentTime] = useState('—');
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const appleLogoRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<{ [key: string]: HTMLSpanElement | null }>({});

  const defaultMenus: MenuConfig[] = [
    {
      label: 'File',
      items: [
        { label: 'New Project', action: 'new-project', shortcut: '⌘N' },
        { label: 'Share Portfolio', action: 'share', shortcut: '⇧⌘S' },
        { type: 'separator' },
        { label: 'Download Resume', action: 'resume', shortcut: '⌘D' },
        { type: 'separator' },
        { label: 'Print Page', action: 'print', shortcut: '⌘P' },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Copy Link', action: 'copy-link', shortcut: '⌘C' },
        { label: 'Select All', action: 'select-all', shortcut: '⌘A' },
      ],
    },
    {
      label: 'Go',
      items: [
        { label: 'Home', action: 'nav-home', href: '/#home' },
        { label: 'Projects', action: 'nav-projects', href: '/projects' },
        { label: 'Blog', action: 'nav-blog', href: '/blog' },
        { label: 'About', action: 'nav-about', href: '/about' },
        { label: 'Contact', action: 'nav-contact', href: '/#contact' },
        { type: 'separator' },
        { label: 'GitHub Profile', action: 'github', shortcut: '⇧⌘G' },
        { label: 'LinkedIn', action: 'linkedin', shortcut: '⇧⌘L' },
        { label: 'Instagram', action: 'instagram', shortcut: '⇧⌘I' },
      ],
    },
  ];

  const mobileNavItems = [
    { label: "Home", href: "/#home", emoji: "🏠", color: "rgba(255, 159, 10, 0.9)" },
    { label: "Projects", href: "/projects", emoji: "📁", color: "rgba(10, 132, 255, 0.9)" },
    { label: "Blog", href: "/blog", emoji: "🎬", color: "rgba(191, 90, 242, 0.9)" },
    { label: "About", href: "/about", emoji: "👤", color: "rgba(94, 92, 230, 0.9)" },
    { label: "Contact", href: "/#contact", emoji: "✉️", color: "rgba(48, 209, 88, 0.9)" },
  ];

  const displayMenus = menus || defaultMenus;

  // Set isMobile after mount to avoid server/client mismatch
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
  }, []);

  // Update clock every minute (client-only to avoid hydration mismatch)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now.toLocaleDateString('en-US', { weekday: 'short' });
      const month = now.toLocaleDateString('en-US', { month: 'short' });
      const date = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const timePart = `${hours % 12 || 12}:${minutes} ${ampm}`;
      setCurrentTime(`${day} ${month} ${date}  ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAppleMenuClick = useCallback(() => {
    if (activeMenu === 'apple') {
      setActiveMenu(null);
    } else {
      if (appleLogoRef.current && containerRef.current) {
        const rect = appleLogoRef.current.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          x: rect.left - parentRect.left - 12,
          y: 42
        });
      }
      setActiveMenu('apple');
    }
  }, [activeMenu]);

  const handleAppleMenuMouseEnter = useCallback(() => {
    if (activeMenu !== null && activeMenu !== 'apple') {
      if (appleLogoRef.current && containerRef.current) {
        const rect = appleLogoRef.current.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          x: rect.left - parentRect.left - 12,
          y: 42
        });
      }
      setActiveMenu('apple');
    }
  }, [activeMenu]);

  const handleMenuItemClick = useCallback((menuLabel: string) => {
    if (activeMenu === menuLabel) {
      setActiveMenu(null);
    } else {
      const menuRef = menuRefs.current[menuLabel];
      if (menuRef && containerRef.current) {
        const rect = menuRef.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          x: rect.left - parentRect.left - 16,
          y: 42
        });
        setActiveMenu(menuLabel);
      }
    }
  }, [activeMenu]);

  const handleMenuItemMouseEnter = useCallback((menuLabel: string) => {
    if (activeMenu !== null && activeMenu !== menuLabel) {
      const menuRef = menuRefs.current[menuLabel];
      if (menuRef && containerRef.current) {
        const rect = menuRef.getBoundingClientRect();
        const parentRect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          x: rect.left - parentRect.left - 16,
          y: 42
        });
        setActiveMenu(menuLabel);
      }
    }
  }, [activeMenu]);

  const closeDropdown = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const handleMenuAction = useCallback((action: string) => {
    if (action === 'fullscreen') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
    onMenuAction?.(action);
  }, [onMenuAction]);

  return (
    <div
      ref={containerRef}
      className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-7xl z-[100] pt-[env(safe-area-inset-top,0px)]"
    >
      <div
        className={`backdrop-blur-2xl transition-all duration-300 border shadow-lg ${className} bg-white/40 dark:bg-white/[0.05] border-zinc-400 dark:border-white/10 saturate-150`}
        style={{
          height: "40px",
          borderRadius: "14px",
        }}
      >
        <div className="flex justify-between items-center h-full px-3 sm:px-4">
          {/* Left section - Apple logo and app menus */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Apple Logo */}
            <div
              ref={appleLogoRef}
              onClick={handleAppleMenuClick}
              onMouseEnter={handleAppleMenuMouseEnter}
              className={`cursor-pointer transition-all duration-150 flex items-center px-2 py-1 rounded-md ml-1 ${activeMenu === "apple" ? "bg-black/[0.08] dark:bg-white/[0.12]" : "hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-foreground dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
            </div>

            {/* Current App Name */}
            <span className="text-foreground dark:text-white text-sm font-bold tracking-tight">
              {appName}
            </span>

            {/* Desktop Menu Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {displayMenus.map((menu) => (
                <span
                  key={menu.label}
                  ref={(el) => { menuRefs.current[menu.label] = el; }}
                  className={`px-3 py-1 text-foreground dark:text-white text-[13px] font-medium cursor-pointer rounded-md transition-all duration-150 select-none ${activeMenu === menu.label ? "bg-black/[0.08] dark:bg-white/[0.12]" : "hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"}`}
                  onClick={() => handleMenuItemClick(menu.label)}
                  onMouseEnter={() => handleMenuItemMouseEnter(menu.label)}
                >
                  {menu.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right section - status icons and clock */}
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {/* Desktop Section Links — suppressHydrationWarning: browser extensions (e.g. rtrvr) inject attributes into <a> */}
            <div className="hidden md:flex items-center space-x-0.5 mr-1.5" suppressHydrationWarning>
              <Link href="/#home" className="px-2.5 py-1 text-foreground dark:text-white text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-zinc-300 dark:hover:border-white/10" suppressHydrationWarning>Home</Link>
              <Link href="/projects" className="px-2.5 py-1 text-foreground dark:text-white text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-zinc-300 dark:hover:border-white/10" suppressHydrationWarning>Projects</Link>
              <Link href="/blog" className="px-2.5 py-1 text-foreground dark:text-white text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-zinc-300 dark:hover:border-white/10" suppressHydrationWarning>Blog</Link>
              <Link href="/about" className="px-2.5 py-1 text-foreground dark:text-white text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-zinc-300 dark:hover:border-white/10" suppressHydrationWarning>About</Link>
              <Link href="/#contact" className="px-2.5 py-1 text-foreground dark:text-white text-[13px] font-medium hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-all border border-transparent hover:border-zinc-300 dark:hover:border-white/10" suppressHydrationWarning>Contact</Link>
            </div>

            <div className="flex items-center space-x-1">
              <div className="flex items-center justify-center">
                <ThemeToggle />
              </div>
              <div className="hidden xs:flex items-center space-x-2">
                <Wifi size={16} className="text-foreground dark:text-white cursor-pointer hover:opacity-70" />
                <Battery size={20} className="text-foreground dark:text-white cursor-pointer hover:opacity-70" />
                <Search size={15} className="text-foreground dark:text-white cursor-pointer hover:opacity-70" />
              </div>
            </div>

            {/* Mobile Menu Toggle — suppressHydrationWarning: extensions may inject attributes */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.08] dark:bg-white/[0.12] text-foreground dark:text-white hover:bg-black/[0.12] dark:hover:bg-white/[0.18] transition-all active:scale-90"
              suppressHydrationWarning
            >
              {isMobileMenuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
            </button>

            {/* Clock — suppressHydrationWarning: Date/locale can differ between server and client */}
            <span
              className="text-foreground dark:text-white text-[13px] font-medium select-none ml-1 cursor-pointer hover:opacity-70 transition-opacity duration-150 hidden sm:inline tabular-nums tracking-[-0.02em]"
              suppressHydrationWarning
            >
              {currentTime}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="md:hidden absolute top-12 left-0 right-0 p-3 z-[90]"
          >
            {/* Blur layer - appears instantly */}
            <div className="absolute inset-0 m-3 backdrop-blur-3xl saturate-[180%] bg-white/75 dark:bg-[#1c1c1e]/80 border border-zinc-400 dark:border-white/10 rounded-[24px] shadow-2xl" />

            {/* Content layer - animates in */}
            <motion.div
              initial={{ scale: 0.96, y: -6 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: -6 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 450,
                mass: 0.5
              }}
              className="relative rounded-[24px] overflow-hidden p-6 space-y-6"
            >
              <div className="grid grid-cols-2 gap-3">
                {mobileNavItems.map((item) => {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-5 rounded-[22px] bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all group border border-zinc-200 dark:border-white/[0.04] active:scale-[0.96] shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-none"
                    >
                      <MiniFolder color={item.color} />
                      <span className="text-[13px] font-medium tracking-tight text-foreground/80 dark:text-white/80 transition-colors group-hover:text-foreground dark:group-hover:text-white">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="h-px bg-black/10 dark:bg-white/10 mx-1" />

              <div className="flex justify-between items-center px-4 py-1">
                <div className="flex items-center space-x-6">
                  <Wifi size={18} className="text-foreground/90 dark:text-white/90" />
                  <Battery size={22} className="text-foreground/90 dark:text-white/90" />
                  <Search size={18} className="text-foreground/90 dark:text-white/90" />
                </div>
                <span className="text-foreground/90 dark:text-white/90 text-[13px] font-medium tracking-tight tabular-nums">{currentTime}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Menu Dropdown */}
      <MenuDropdown
        isOpen={activeMenu === 'apple'}
        onClose={closeDropdown}
        items={APPLE_MENU_ITEMS}
        position={dropdownPosition}
        onAction={handleMenuAction}
        isMobile={isMobile}
      />

      {/* Menu Dropdowns */}
      {displayMenus.map((menu) => (
        <MenuDropdown
          key={menu.label}
          isOpen={activeMenu === menu.label}
          onClose={closeDropdown}
          items={menu.items}
          position={dropdownPosition}
          onAction={handleMenuAction}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

export default MacOSMenuBar;
