"use client";

import dynamic from "next/dynamic";
import type { MilkZone } from "@/lib/milk-zones";
import { LazyOnView } from "./LazyOnView";

const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });
const MilkZoneMap = dynamic(() => import("./MilkZoneMap"), { ssr: false });

export function LazyContactMap() {
  return (
    <LazyOnView label="Map showing Inyange Industries in Masaka, Kigali">
      <ContactMap />
    </LazyOnView>
  );
}

export function LazyMilkZoneMap({ zones }: { zones: MilkZone[] }) {
  return (
    <LazyOnView label="Map of Milk Zones in Kigali">
      <MilkZoneMap zones={zones} />
    </LazyOnView>
  );
}
