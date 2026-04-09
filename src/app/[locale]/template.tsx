"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();

  // Reset lenis scroll state when a new page mounts during the transition,
  // preventing it from adopting the previous page scroll position.
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Cine-Web Ease Out Expo
        onAnimationStart={() => lenis?.stop()}
        onAnimationComplete={() => lenis?.start()}
        className="will-change-transform min-h-screen origin-top"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
