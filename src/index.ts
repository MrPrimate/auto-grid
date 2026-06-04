import { DDB_IMPORTER_MODULE_ID, MODULE_ID } from "./constants";
import { registerSettings } from "./settings";
import { api } from "./api";
import { addCanvasControl, addSceneContextOption } from "./hooks";
import logger from "./logger";

function isModuleActive(moduleId: string): boolean {
  return Boolean(game.modules?.get?.(moduleId)?.active);
}

function registerAutoGrid() {
  Hooks.on("getSceneNavigationContext", addSceneContextOption);
  Hooks.on("getSceneContextOptions", addSceneContextOption);
  Hooks.on("getSceneDirectoryEntryContext", addSceneContextOption);
  Hooks.on("getSceneControlButtons", addCanvasControl);
}

Hooks.once("init", () => {
  registerSettings();
  const module = game.modules?.get?.(MODULE_ID) as any;
  if (module) module.api = api;
  window.AutoGrid = api;

  if (isModuleActive(DDB_IMPORTER_MODULE_ID)) {
    logger.info("DDB Importer is active; standalone AutoGrid hooks and API are disabled.");
    return;
  }
  registerAutoGrid();

  logger.info("Init complete");
});
