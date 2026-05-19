export const TEXTURE_PATH = "/textures/suede-green.webp";
export const CROSS_ANIMATION_MS = 980;

export const FOOTER_HIDE_SELECTOR =
  'footer img[alt="APIDARB"], [data-menu-hide-start], footer';

export const FOOTER_FADE_START_DESKTOP = 820;
export const FOOTER_FADE_END_DESKTOP = 640;
export const FOOTER_FADE_START_MOBILE = 620;
export const FOOTER_FADE_END_MOBILE = 440;

export const navItems = [
  { id: "home", label: "Главная", href: "#home" },
  { id: "about", label: "О специалисте", href: "#about" },
  { id: "services", label: "Услуги", href: "#services" },
  { id: "products", label: "Пчелопродукты", href: "#products" },
  { id: "education", label: "Обучение", href: "#education" },
  { id: "contacts", label: "Контакты", href: "#contacts" },
];

export const COLORS = {
  dark: "#063829",
  light: "#f3efe5",
  gold: "#d8b66a",
  textDark: "#17342d",
  overlay: "rgba(5, 31, 32, 0.16)",
};

export const GOLD_TEXT_ITEMS = new Set(["about", "products", "contacts"]);

export const HOVER_STROKE_BOOST = 14;

export const compactThresholds = [0.14, 0.28, 0.43, 0.59, 0.78, 1.02];

export const NORMAL_CROSS_PATH_A =
  "M -22 -22 C -14 -14 -7 -6 0 0 C 7 6 14 14 22 22";

export const NORMAL_CROSS_PATH_B =
  "M 22 -22 C 14 -14 7 -6 0 0 C -7 6 -14 14 -22 22";

export const openRings = [
  {
    id: "home",
    label: "Главная",
    radius: 70,
    labelRadius: 70,
    stroke: 50,
    color: COLORS.light,
    textColor: COLORS.textDark,
    fontSize: 16,
    arcStart: 168,
    arcEnd: 52,
    textDy: 3,
  },
  {
    id: "about",
    label: "О специалисте",
    radius: 122,
    labelRadius: 122,
    stroke: 52,
    color: COLORS.dark,
    textColor: COLORS.light,
    fontSize: 17,
    arcStart: 170,
    arcEnd: 48,
    textDy: 3,
  },
  {
    id: "services",
    label: "Услуги",
    radius: 174,
    labelRadius: 174,
    stroke: 52,
    color: COLORS.light,
    textColor: COLORS.textDark,
    fontSize: 18,
    arcStart: 168,
    arcEnd: 52,
    textDy: 3,
  },
  {
    id: "products",
    label: "Пчелопродукты",
    radius: 226,
    labelRadius: 226,
    stroke: 54,
    color: COLORS.dark,
    textColor: COLORS.light,
    fontSize: 19,
    arcStart: 172,
    arcEnd: 46,
    textDy: 3,
  },
  {
    id: "education",
    label: "Обучение",
    radius: 280,
    labelRadius: 280,
    stroke: 54,
    color: COLORS.light,
    textColor: COLORS.textDark,
    fontSize: 20,
    arcStart: 170,
    arcEnd: 50,
    textDy: 3,
  },
  {
    id: "contacts",
    label: "Контакты",
    radius: 334,
    labelRadius: 334,
    stroke: 56,
    color: COLORS.dark,
    textColor: COLORS.light,
    fontSize: 21,
    arcStart: 170,
    arcEnd: 50,
    textDy: 3,
  },
];