import { MODULE_ID } from "./constants";

export function registerSettings() {
  game.settings.register(MODULE_ID, "enabled", {
    name: "Enable detection",
    hint: "Allow AutoGrid to scan scene background images and suggest grid alignment.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, "default-multiplier", {
    name: "Default cells per painted square",
    hint: "How many Foundry grid cells fit inside one detected painted square.",
    scope: "world",
    config: true,
    type: Number,
    // @ts-expect-error -- numeric choices unsupported by fvtt-types
    choices: {
      1: "1 x 1",
      2: "2 x 2",
      3: "3 x 3",
      4: "4 x 4",
    },
    default: 1,
  });

  game.settings.register(MODULE_ID, "min-grid-size", {
    name: "Minimum grid size",
    hint: "Small detected grids are scaled up until Foundry grid.size is at least this many pixels.",
    scope: "world",
    config: true,
    type: Number,
    default: 50,
  });

  game.settings.register(MODULE_ID, "show-scene-context", {
    name: "Scene context menu",
    hint: "Add a Detect Grid entry to scene context menus.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, "show-canvas-control", {
    name: "Canvas control",
    hint: "Add a Detect Grid tool to the canvas tools.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, "log-level", {
    name: "Log level",
    hint: "Controls AutoGrid console logging.",
    scope: "client",
    config: true,
    type: String,
    choices: {
      DEBUG: "Debug",
      INFO: "Info",
      WARN: "Warn",
      ERROR: "Error",
      OFF: "Off",
    },
    default: "INFO",
  });
}

export function isGridDetectionEnabled(): boolean {
  try {
    const value = game.settings.get(MODULE_ID, "enabled");
    return typeof value === "boolean" ? value : true;
  } catch (_e) {
    return true;
  }
}

export function getDefaultGridMultiplier(): number {
  try {
    const value = Number(game.settings.get(MODULE_ID, "default-multiplier"));
    if (Number.isFinite(value) && value >= 1 && value <= 4) return Math.round(value);
  } catch (_e) { /* fall through */ }
  return 1;
}

export function getMinGridSize(): number {
  try {
    const value = Number(game.settings.get(MODULE_ID, "min-grid-size"));
    if (Number.isFinite(value) && value > 0) return Math.round(value);
  } catch (_e) { /* fall through */ }
  return 50;
}
