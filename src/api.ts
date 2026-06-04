import logger from "./logger";
import { detectGrid, detectGridFromGrayscale } from "./GridDetector";
import {
  buildCandidateSummary,
  getMapScaleMultiplier,
  isGridDetectionEnabled,
  resolveGrid,
} from "./GridResolver";
import {
  applyChoiceToScene,
  detectAndApplyGridToScene,
  fetchBackgroundBlob,
  getSceneBackgroundSrc,
  readBitmapDimensions,
  rebuildDetectionRun,
  runDetectionForScene,
} from "./SceneGridDetector";
import type {
  ISceneGridApplyResult,
  ISceneGridDetectionRun,
  ISceneGridFlagOptions,
} from "./SceneGridDetector";
import SceneGridPickerApp from "./SceneGridPickerApp";
import { isGridDetectionCandidate } from "./GridDetectionCandidate";

async function openGridPicker(scene: any, options: ISceneGridFlagOptions = {}) {
  return SceneGridPickerApp.open(scene, options);
}

export const api = {
  logger,
  detectGrid,
  detectGridFromGrayscale,
  resolveGrid,
  buildCandidateSummary,
  getMapScaleMultiplier,
  isGridDetectionEnabled,
  fetchBackgroundBlob,
  readBitmapDimensions,
  getSceneBackgroundSrc,
  runDetectionForScene,
  rebuildDetectionRun,
  applyChoiceToScene,
  detectAndApplyGridToScene,
  openGridPicker,
  isGridDetectionCandidate,
};

export type {
  ISceneGridApplyResult,
  ISceneGridDetectionRun,
  ISceneGridFlagOptions,
};

export {
  logger,
  detectGrid,
  detectGridFromGrayscale,
  resolveGrid,
  buildCandidateSummary,
  getMapScaleMultiplier,
  isGridDetectionEnabled,
  fetchBackgroundBlob,
  readBitmapDimensions,
  getSceneBackgroundSrc,
  runDetectionForScene,
  rebuildDetectionRun,
  applyChoiceToScene,
  detectAndApplyGridToScene,
  openGridPicker,
  isGridDetectionCandidate,
};
