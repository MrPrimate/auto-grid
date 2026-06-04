import logger from "./logger";
import { MODULE_ID } from "./constants";
import { openGridPicker } from "./api";
import { getSceneBackgroundSrc } from "./SceneGridDetector";

function settingEnabled(key: string, fallback = true): boolean {
  try {
    const value = game.settings.get(MODULE_ID, key);
    return typeof value === "boolean" ? value : fallback;
  } catch (_e) {
    return fallback;
  }
}

function getSceneId(li: unknown): string | null {
  const element = li instanceof HTMLElement ? li : (li as any)?.[0];
  if (!element) return null;
  return element.getAttribute?.("data-entry-id")
    ?? element.getAttribute?.("data-document-id")
    ?? element.getAttribute?.("data-scene-id")
    ?? element.getAttribute?.("data-entity-id")
    ?? null;
}

function sceneFromContext(li: unknown) {
  const sceneId = getSceneId(li);
  return sceneId ? game.scenes?.get?.(sceneId) ?? null : null;
}

function canDetectScene(scene: any): boolean {
  return Boolean(game.user?.isGM && scene && getSceneBackgroundSrc(scene));
}

export function addSceneContextOption(_html: unknown, contextOptions: any[]) {
  if (!settingEnabled("show-scene-context")) return;
  contextOptions.push({
    name: "AutoGrid: Detect Grid",
    callback: async (li: unknown) => {
      const scene = sceneFromContext(li);
      if (!scene) return;
      await openGridPicker(scene);
    },
    condition: (li: unknown) => canDetectScene(sceneFromContext(li)),
    icon: "<i class=\"fas fa-border-all\"></i>",
  });
}

export function addCanvasControl(controls: Record<string, any>) {
  if (!game.user?.isGM || !settingEnabled("show-canvas-control")) return;
  const group = controls.tiles ?? controls.token ?? controls.tokens;
  if (!group?.tools) return;

  group.tools["auto-grid-detect"] = {
    name: "auto-grid-detect",
    order: 98,
    title: "AutoGrid: Detect Grid",
    icon: "fa-solid fa-border-all",
    button: true,
    visible: true,
    onChange: async (_event: Event, active: boolean) => {
      if (active === false) return;
      const scene = canvas?.scene ?? game.scenes?.active ?? null;
      if (!canDetectScene(scene)) {
        ui.notifications?.warn("The active scene has no background image to scan.");
        return;
      }
      try {
        await openGridPicker(scene);
      } catch (error) {
        logger.error(`Canvas control failed: ${(error as Error).message}`, error);
      }
    },
  };
}
