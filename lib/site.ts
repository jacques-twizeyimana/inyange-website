/** Company details and navigation shared across the site. */

export const company = {
  name: "Inyange Industries",
  legalName: "Inyange Industries Ltd",
  phone: "+250 788 161 900",
  phoneHref: "tel:+250788161900",
  email: "info@inyangeindustries.com",
  address: ["KN 3 Rd, Masaka", "P.O. Box 4584, Kigali, Rwanda"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Inyange+Industries+Masaka+Kigali",
  social: [
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/InyangeIndustryLimited" },
    { network: "instagram", label: "Instagram", href: "https://www.instagram.com/alwaysinyange/" },
    { network: "x", label: "X (Twitter)", href: "https://x.com/AlwaysInyange" },
  ],
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Milk Zones", href: "/milk-zones" },
  { label: "About us", href: "/about" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact", href: "/contact" },
] as const;

/** Rwanda's provinces and their districts. */
export const provinces: Record<string, string[]> = {
  "Kigali City": ["Gasabo", "Kicukiro", "Nyarugenge"],
  "Eastern Province": ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
  "Northern Province": ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
  "Southern Province": ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  "Western Province": ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"],
};

export const allDistricts = Object.values(provinces).flat();
