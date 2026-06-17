export {};

declare global {
  // Declaration merging for auto-grid settings.
  // foundry-vtt-types extracts valid namespaces/keys from globalThis.SettingConfig
  // via template literal types: `${infer Scope}.${string}` on keyof SettingConfig.
  // Without registering our keys here, game.settings.register/get/set only accept the
  // "core" namespace and reject "auto-grid". See foundry-vtt-types
  // src/foundry/client/helpers/client-settings.d.mts.
  interface SettingConfig {
    "auto-grid.enabled": boolean;
    "auto-grid.default-multiplier": number;
    "auto-grid.min-grid-size": number;
    "auto-grid.show-scene-context": boolean;
    "auto-grid.show-canvas-control": boolean;
    "auto-grid.log-level": "DEBUG" | "INFO" | "WARN" | "ERROR" | "OFF";
  }
}
