"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import CompactMenuLabel from "./CompactMenuLabel";
import HeroMenuOverlay from "./HeroMenuOverlay";
import HeroMenuStyles from "./HeroMenuStyles";
import HeroMenuSvg from "./HeroMenuSvg";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useCrossAnimation } from "./useCrossAnimation";
import { useFooterFade } from "./useFooterFade";

import { compactThresholds, openRings } from "./heroMenu.constants";
import { getCompactHoverDepth } from "./heroMenu.utils";

const subscribeToClientReady = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HeroMenu() {
  const crossGroupRef = useRef(null);
  const crossPathARef = useRef(null);
  const crossPathBRef = useRef(null);
  const menuInflateTimeoutRef = useRef(null);

  const isClientReady = useSyncExternalStore(
    subscribeToClientReady,
    getClientSnapshot,
    getServerSnapshot
  );

  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [compactHoverDepth, setCompactHoverDepth] = useState(0);
  const [hoveredOpenRing, setHoveredOpenRing] = useState(null);
  const [isInflating, setIsInflating] = useState(false);

  const { footerFadeProgress, footerFadeOpacity, menuHiddenByFooter } =
    useFooterFade(isClientReady && isDesktopViewport);

  const { stopCrossAnimation, startCrossAnimation } = useCrossAnimation({
    crossGroupRef,
    crossPathARef,
    crossPathBRef,
  });

  const compactHovered = compactHoverDepth > 0;

  const compactHoveredRingIndex =
    compactHoverDepth > 0 ? compactThresholds.length - compactHoverDepth : null;

  const compactHoveredRingId =
    compactHoveredRingIndex !== null
      ? openRings[compactHoveredRingIndex]?.id
      : null;

  const renderedRings = useMemo(() => {
    return [...openRings].sort((a, b) => b.radius - a.radius);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setHoveredOpenRing(null);
    setCompactHoverDepth(0);
    setIsInflating(false);
    stopCrossAnimation();

    if (menuInflateTimeoutRef.current) {
      window.clearTimeout(menuInflateTimeoutRef.current);
      menuInflateTimeoutRef.current = null;
    }
  }, [stopCrossAnimation]);

  const openMenu = () => {
    if (menuHiddenByFooter) return;

    setIsOpen(true);
    setIsInflating(true);
    setCompactHoverDepth(0);

    requestAnimationFrame(() => {
      startCrossAnimation();
    });

    if (menuInflateTimeoutRef.current) {
      window.clearTimeout(menuInflateTimeoutRef.current);
    }

    menuInflateTimeoutRef.current = window.setTimeout(() => {
      setIsInflating(false);
    }, 560);
  };

  useBodyScrollLock(isOpen, closeMenu);

  useEffect(() => {
    if (!isClientReady) return;

    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    const updateViewportState = () => {
      const nextIsDesktop = mediaQuery.matches;

      setIsDesktopViewport(nextIsDesktop);

      if (!nextIsDesktop) {
        closeMenu();
      }
    };

    updateViewportState();

    mediaQuery.addEventListener("change", updateViewportState);

    return () => {
      mediaQuery.removeEventListener("change", updateViewportState);
    };
  }, [closeMenu, isClientReady]);

  useEffect(() => {
    return () => {
      if (menuInflateTimeoutRef.current) {
        window.clearTimeout(menuInflateTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen || footerFadeProgress < 0.18) return;

    const closeFrameId = window.requestAnimationFrame(() => {
      closeMenu();
    });

    return () => {
      window.cancelAnimationFrame(closeFrameId);
    };
  }, [closeMenu, footerFadeProgress, isOpen]);

  const handleCompactMove = (event) => {
    if (isOpen || menuHiddenByFooter) return;

    const nextDepth = getCompactHoverDepth(event);

    setCompactHoverDepth((currentDepth) =>
      currentDepth === nextDepth ? currentDepth : nextDepth
    );
  };

  const handleCompactLeave = () => {
    if (isOpen) return;

    setCompactHoverDepth((currentDepth) =>
      currentDepth === 0 ? currentDepth : 0
    );
  };

  const handleNavClick = (href) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    } else {
      window.history.replaceState(null, "", href);
    }

    closeMenu();
  };

  const handleCenterPointerDown = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (menuHiddenByFooter && !isOpen) return;

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  if (!isClientReady || !isDesktopViewport) {
    return null;
  }

  const menu = (
    <>
      <HeroMenuStyles />

      <div
        className="hero-menu-root pointer-events-none fixed inset-0 z-[999]"
        style={{
          opacity: footerFadeOpacity,
          transform: `translate3d(0, ${footerFadeProgress * -22}px, 0)`,
          transition:
            "opacity 320ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <HeroMenuOverlay isOpen={isOpen} onClose={closeMenu} />

        <HeroMenuSvg
          isOpen={isOpen}
          isInflating={isInflating}
          menuHiddenByFooter={menuHiddenByFooter}
          compactHovered={compactHovered}
          compactHoverDepth={compactHoverDepth}
          compactHoveredRingId={compactHoveredRingId}
          hoveredOpenRing={hoveredOpenRing}
          renderedRings={renderedRings}
          crossGroupRef={crossGroupRef}
          crossPathARef={crossPathARef}
          crossPathBRef={crossPathBRef}
          onCompactMove={handleCompactMove}
          onCompactLeave={handleCompactLeave}
          onOpenMenu={openMenu}
          onCenterPointerDown={handleCenterPointerDown}
          onHoverOpenRing={setHoveredOpenRing}
          onNavClick={handleNavClick}
        />

        <CompactMenuLabel isOpen={isOpen} compactHovered={compactHovered} />
      </div>
    </>
  );

  return createPortal(menu, document.body);
}