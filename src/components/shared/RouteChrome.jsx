"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const HeroMenu = dynamic(
  () =>
    import(
      "@/components/home/hero-menu/HeroMenu"
    )
);

const MobileStickyMenu = dynamic(
  () =>
    import(
      "@/components/home/hero/MobileStickyMenu"
    )
);

const RoutePageLogo = dynamic(
  () =>
    import(
      "@/components/shared/PageLogo"
    )
);

const ScrollDirectionButton = dynamic(
  () =>
    import(
      "@/components/shared/ScrollDirectionButton"
    )
);

const PUBLIC_MENU_ROUTE_PREFIXES = [
  "/about",
  "/services",
  "/training",
  "/contacts",
];

const PAGE_LOGO_ROUTES = new Set([
  "/about",
  "/contacts",
]);

function matchesRoutePrefix(
  pathname,
  routePrefix
) {
  return (
    pathname === routePrefix ||
    pathname.startsWith(`${routePrefix}/`)
  );
}

function isPublicMenuRoute(pathname) {
  if (pathname === "/") {
    return true;
  }

  return PUBLIC_MENU_ROUTE_PREFIXES.some(
    (routePrefix) =>
      matchesRoutePrefix(
        pathname,
        routePrefix
      )
  );
}

export default function RouteChrome() {
  const pathname = usePathname();

  const showPublicNavigation =
    isPublicMenuRoute(pathname);

  const showPageLogo =
    PAGE_LOGO_ROUTES.has(pathname);

  return (
    <>
      {showPageLogo && <RoutePageLogo />}

      {showPublicNavigation && (
        <MobileStickyMenu />
      )}

      <ScrollDirectionButton />

      {showPublicNavigation && <HeroMenu />}
    </>
  );
}