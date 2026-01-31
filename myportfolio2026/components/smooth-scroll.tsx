"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const lenis = new Lenis({
            duration: isMobile ? 1.5 : 0.8, // Much snappier scrolling
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: isMobile ? 1.0 : 1.5, // Faster desktop wheel response
            touchMultiplier: isMobile ? 2.0 : 2.5,
            infinite: false,
            autoResize: true,
        });

        lenisRef.current = lenis;

        // @ts-expect-error - Attach lenis to window for global control
        window.lenis = lenis;

        let animationFrame: number;
        function raf(time: number) {
            lenis.raf(time);
            animationFrame = requestAnimationFrame(raf);
        }

        animationFrame = requestAnimationFrame(raf);

        // Recalculate scroll dimensions periodically and on resize
        // This ensures the footer is always reachable
        const resizeHandler = () => {
            lenis.resize();
        };

        window.addEventListener('resize', resizeHandler);

        // Also recalculate after images/fonts load
        window.addEventListener('load', resizeHandler);

        // Periodic resize check for dynamic content (every 2 seconds for first 10 seconds)
        let resizeChecks = 0;
        const resizeInterval = setInterval(() => {
            lenis.resize();
            resizeChecks++;
            if (resizeChecks >= 5) {
                clearInterval(resizeInterval);
            }
        }, 2000);

        return () => {
            cancelAnimationFrame(animationFrame);
            lenis.stop();
            // @ts-expect-error - Cleanup
            window.lenis = null;
            lenis.destroy();
            lenisRef.current = null;
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('load', resizeHandler);
            clearInterval(resizeInterval);
        };
    }, []);

    // Handle scroll reset on route change
    useEffect(() => {
        if (lenisRef.current) {
            // Check if there's a hash in the URL (for anchor links)
            if (window.location.hash) {
                // Let the browser or specific logic handle anchor scrolling if needed,
                // or use lenis.scrollTo(hash) if we want smooth scroll to anchor
                const target = document.querySelector(window.location.hash);
                if (target) {
                    lenisRef.current.scrollTo(target as HTMLElement, { offset: -100 }); // Adjust offset for header
                }
            } else {
                // Otherwise scroll to top immediately
                lenisRef.current.scrollTo(0, { immediate: true });
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return <>{children}</>;
}
