/** Types for bundle.js: the Inyange design system's fluid components. Importing it assigns `window.Inyange`. */

export interface MilkPourProps {
  /** Glass centre as a fraction of the container width. Default 0.7. */
  x?: number;
  /** Target milk level, 0.1–0.92. Default 0.8. */
  fill?: number;
  /** Drink and pour again forever. Default true. */
  loop?: boolean;
  /** Accessible description of the scene. */
  label?: string;
  /** One live simulation per key: calling MilkPour again with the same key moves the running pour into the new element. */
  key?: string;
}
export interface MilkPourHandle {
  pour(): void;
  attach(el: HTMLElement): void;
  /** Host is unmounting: stop after a short grace period unless re-attached. */
  release(): void;
  destroy(): void;
}
export interface FillMeterProps {
  value: number;
  label?: string;
  format?: (value: number) => string;
}
export interface FillMeterHandle {
  set(value: number): void;
  destroy(): void;
}
export interface InyangeNamespace {
  MilkPour(container: HTMLElement, props?: MilkPourProps): MilkPourHandle;
  FillMeter(el: HTMLElement, props: FillMeterProps): FillMeterHandle;
  syncWaves(): void;
}

declare global {
  interface Window {
    Inyange?: InyangeNamespace;
  }
}
