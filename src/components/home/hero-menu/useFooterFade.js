import { useEffect, useState } from "react";

import {
  FOOTER_FADE_END_DESKTOP,
  FOOTER_FADE_END_MOBILE,
  FOOTER_FADE_START_DESKTOP,
  FOOTER_FADE_START_MOBILE,
  FOOTER_HIDE_SELECTOR,
} from "./heroMenu.constants";

import { clamp } from "./heroMenu.utils";

function getVisibleHideAnchor() {
  const hideAnchors = Array.from(document.querySelectorAll(FOOTER_HIDE_SELECTOR));

  return (
    hideAnchors.find((hideAnchor) => {
      const rects = hideAnchor.getClientRects();

      if (rects.length === 0) {
        return false;
      }

      const computedStyle = window.getComputedStyle(hideAnchor);

      return (
        computedStyle.display !== "none" &&
        computedStyle.visibility !== "hidden" &&
        computedStyle.opacity !== "0"
      );
    }) || null
  );
}

export function useFooterFade(isClientReady) {
  const [footerFadeProgress, setFooterFadeProgress] = useState(0);

  const footerFadeOpacity = clamp(1 - footerFadeProgress, 0, 1);
  const menuHiddenByFooter = footerFadeProgress >= 0.94;

  useEffect(() => {
    if (!isClientReady) return;

    let frameId = null;

    const updateFooterFade = () => {
      frameId = null;

      const hideAnchor = getVisibleHideAnchor();

      if (!hideAnchor) {
        setFooterFadeProgress(0);
        return;
      }

      const anchorTop = hideAnchor.getBoundingClientRect().top;
      const isMobile = window.innerWidth < 768;

      const fadeStart = isMobile
        ? FOOTER_FADE_START_MOBILE
        : FOOTER_FADE_START_DESKTOP;

      const fadeEnd = isMobile
        ? FOOTER_FADE_END_MOBILE
        : FOOTER_FADE_END_DESKTOP;

      const nextProgress = clamp(
        (fadeStart - anchorTop) / (fadeStart - fadeEnd),
        0,
        1
      );

      setFooterFadeProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) < 0.01
          ? currentProgress
          : nextProgress
      );
    };

    const requestFooterFadeUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateFooterFade);
    };

    updateFooterFade();

    window.addEventListener("scroll", requestFooterFadeUpdate, {
      passive: true,
    });
    window.addEventListener("resize", requestFooterFadeUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestFooterFadeUpdate);
      window.removeEventListener("resize", requestFooterFadeUpdate);
    };
  }, [isClientReady]);

  return {
    footerFadeProgress,
    footerFadeOpacity,
    menuHiddenByFooter,
  };
}