declare module '*.scss';
/// <reference types="@docusaurus/plugin-ideal-image" />

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export {};
