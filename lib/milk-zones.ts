import { provinces } from "@/lib/site";

/**
 * Milk Zones in Rwanda (Inyange and partner Milk Zones, e.g. Mukamira and Nyanza Milk Industries), taken from
 * Google Maps listings (searched Nov 2026). In Kigali the district follows the street-name prefix
 * (KN = Nyarugenge, KK = Kicukiro, KG = Gasabo); elsewhere it follows the pin's location.
 */
export type MilkZone = {
  name: string;
  district: string;
  address?: string;
  phone?: string;
  longitude: number;
  latitude: number;
};

export const milkZones: MilkZone[] = [
  // Nyarugenge
  { name: "Inyange Milk Zone", district: "Nyarugenge", address: "KN 12 St", phone: "0788 161 900", longitude: 30.0631732, latitude: -1.9349963 },
  { name: "Inyange Milkzone", district: "Nyarugenge", address: "KN 41 St", phone: "0784 003 363", longitude: 30.0695469, latitude: -1.9585228 },
  { name: "Inyange Milk Zone", district: "Nyarugenge", address: "KN 9 Ave", longitude: 30.0508488, latitude: -1.9778106 },
  { name: "Mukamira Milkzone", district: "Nyarugenge", address: "KN 291 St", longitude: 30.0552303, latitude: -1.9777681 },
  { name: "Kuruhimbi Milk Bar", district: "Nyarugenge", address: "KN 204 St", phone: "0788 571 419", longitude: 30.0501334, latitude: -1.9705392 },
  { name: "Alimentation & Milk Zone Chez Mama Keïlla", district: "Nyarugenge", address: "Karama Center Road", longitude: 30.0146949, latitude: -1.9617794 },
  // Gasabo
  { name: "Inyange Milk Zone", district: "Gasabo", address: "KG 176 St", longitude: 30.1126795, latitude: -1.9584914 },
  { name: "Nyanza Milk Zone", district: "Gasabo", longitude: 30.112187, latitude: -1.9593355 },
  { name: "Milk Zone Chez Maman Rosette", district: "Gasabo", address: "KG 375 St", phone: "0782 020 326", longitude: 30.1004154, latitude: -1.9240498 },
  { name: "Zahabu Milk Zone", district: "Gasabo", address: "KG 1386 St", phone: "0783 655 236", longitude: 30.1459589, latitude: -1.9293874 },
  { name: "Nyanza Milk", district: "Gasabo", phone: "0790 566 885", longitude: 30.1375215, latitude: -1.9292955 },
  // Kicukiro
  { name: "Inyange Milk Zone", district: "Kicukiro", phone: "0788 254 197", longitude: 30.0752917, latitude: -1.9733037 },
  { name: "Itunda, Inyange Dairy Milk Zone", district: "Kicukiro", address: "KK 201 St", longitude: 30.1397617, latitude: -1.9722456 },
  { name: "Milkzone", district: "Kicukiro", address: "KK 439 St", longitude: 30.1117275, latitude: -1.9897128 },
  { name: "Egide Milk Zone", district: "Kicukiro", phone: "0788 713 291", longitude: 30.086743, latitude: -2.0202384 },
  // Other provinces
  { name: "Milkzone Kariyeri", district: "Kamonyi", longitude: 30.0682886, latitude: -2.1270831 },
  { name: "Nyanza Milk Zone", district: "Nyanza", phone: "0788 617 992", longitude: 29.7503285, latitude: -2.3538491 },
  { name: "Nyanza Milk Industries", district: "Nyanza", longitude: 29.7482016, latitude: -2.3623129 },
  { name: "Rusatira Milk Zone", district: "Huye", longitude: 29.7889006, latitude: -2.387399 },
  { name: "Milk Center Huye, Rango Daily", district: "Huye", address: "Rango market", longitude: 29.7465014, latitude: -2.6397922 },
  { name: "Inyange Milk Zone", district: "Kirehe", address: "RN3", longitude: 30.6768195, latitude: -2.2739154 },
];

export function provinceOf(district: string) {
  return Object.keys(provinces).find((p) => provinces[p].includes(district));
}
