import { useEffect, useState } from "react";

import { clamp } from "./heroMenu.utils";

const HOME_FOOTER_ANCHOR_SELECTOR =
  "[data-hero-menu-footer-anchor]";

const FOOTER_FALLBACK_SELECTOR = "footer";

const FOOTER_VISIBLE_BEFORE_FADE = 40;
const FOOTER_FADE_DISTANCE = 240;

function isElementRendered(element) {
  if (!element || element.getClientRects().length === 0) {
    return false;
  }

  const computedStyle = window.getComputedStyle(element);

  return (
    computedStyle.display !== "none" &&
    computedStyle.visibility !== "hidden"
  );
}

function findRenderedElement(selector) {
  const elements = Array.from(
    document.querySelectorAll(selector)
  );

  return elements.find(isElementRendered) || null;
}

function getFooterAnchor() {
  const homeFooterAnchor = findRenderedElement(
    HOME_FOOTER_ANCHOR_SELECTOR
  );

  if (homeFooterAnchor) {
    return homeFooterAnchor;
  }

  return findRenderedElement(FOOTER_FALLBACK_SELECTOR);
}

export function useFooterFade(isClientReady) {
  const [footerFadeProgress, setFooterFadeProgress] = useState(0);

  const footerFadeOpacity = clamp(
    1 - footerFadeProgress,
    0,
    1
  );

  const menuHiddenByFooter = footerFadeProgress >= 0.94;

  useEffect(() => {
    if (!isClientReady) return;

    let frameId = null;

    const updateFooterFade = () => {
      frameId = null;

      const footerAnchor = getFooterAnchor();

      if (!footerAnchor) {
        setFooterFadeProgress(0);
        return;
      }

      const footerTop =
        footerAnchor.getBoundingClientRect().top;

      const viewportHeight = window.innerHeight;

      const fadeStart =
        viewportHeight - FOOTER_VISIBLE_BEFORE_FADE;

      const fadeEnd =
        fadeStart - FOOTER_FADE_DISTANCE;

      const nextProgress = clamp(
        (fadeStart - footerTop) /
          (fadeStart - fadeEnd),
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

      frameId = window.requestAnimationFrame(
        updateFooterFade
      );
    };

    updateFooterFade();

    window.addEventListener(
      "scroll",
      requestFooterFadeUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      requestFooterFadeUpdate
    );

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener(
        "scroll",
        requestFooterFadeUpdate
      );

      window.removeEventListener(
        "resize",
        requestFooterFadeUpdate
      );
    };
  }, [isClientReady]);

  return {
    footerFadeProgress,
    footerFadeOpacity,
    menuHiddenByFooter,
  };
}