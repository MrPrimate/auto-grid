export {};

declare global {

  type TGridSource =
    | "detected"
    | "template"
    | "tokenScale-snapped"
    | "tokenScale"
    | "default";

  interface IResolvedGrid {
    size: number;
    offsetX: number;
    offsetY: number;
    sceneScale: number;
    source: TGridSource;
  }

  interface IGridResolverInput {
    detection: IGridDetectionResult | null;
    tokenScale?: number | null;
    width: number;
    multiplier: number;
    minGridSize?: number;
  }

  interface ICandidateEntry {
    paintedSize: number;
    gridSize: number;
    sceneScale: number;
    sceneWidth: number;
    offsetX: number;
    offsetY: number;
    rawPaintedOffsetX: number;
    rawPaintedOffsetY: number;
  }

  interface ICandidateSummary {
    autocorrelation: ICandidateEntry | null;
    template: ICandidateEntry | null;
    priorPeriod: ICandidateEntry | null;
    tokenScale: ICandidateEntry | null;
    tokenScaleDoubled: ICandidateEntry | null;
    tokenScaleHalved: ICandidateEntry | null;
    multiplier: number;
  }

  interface IGridDetectorOptions {
    expectedScale?: number;
    targetMaxSide?: number;
    confidenceThreshold?: number;
    searchPaddingFraction?: number;
    squareToleranceFraction?: number;
    edgeTrimFraction?: number;
  }

  interface IGridDetectionResult {
    detected: boolean;
    size: number;
    offsetX: number;
    offsetY: number;
    confidence: number;
    priorOffsetX?: number | null;
    priorOffsetY?: number | null;
    priorSize?: number | null;
    templateSize?: number | null;
    templateOffsetX?: number | null;
    templateOffsetY?: number | null;
    templateScore?: number | null;
    diagnostics?: {
      sizeX: number;
      sizeY: number;
      confidenceX: number;
      confidenceY: number;
      width: number;
      height: number;
      scaleFactor: number;
      expectedSize: number | null;
      lagMin: number;
      lagMax: number;
    };
  }

  interface Window {
    AutoGrid?: unknown;
  }


  interface ISceneLevelBackground {
    src?: string;
    color?: string;
    tint?: string;
    alphaThreshold?: number;
  }

   interface ISceneLevelForeground {
    src?: string | null;
    tint?: string;
    alphaThreshold?: number;
  }

  interface ISceneLevelTextures {
    anchorX?: number;
    anchorY?: number;
    offsetX?: number;
    offsetY?: number;
    fit?: string;
    scaleX?: number;
    scaleY?: number;
    rotation?: number;
  }

  interface ISceneLevelData {
    _id?: string;
    name?: string;
    background?: ISceneLevelBackground;
    foreground?: ISceneLevelForeground | null;
    textures?: ISceneLevelTextures;
    elevation?: {
      base?: number;
      bottom?: number;
      top?: number;
    };
  }

  type ISceneLevels = foundry.data.fields.DataField<
    foundry.data.fields.DataField.DefaultOptions,
    ISceneLevelData[],
    foundry.utils.Collection<ISceneLevelData>,
    ISceneLevelData[]
  >;

  // v14 client/canvas/board.mjs:449 -- `get level()` returns the active Level document
  // (or null). fvtt-types #main exposes global `Canvas` only as a deprecated re-export
  // alias (`export import Canvas = foundry.canvas.Canvas`), which a `declare global`
  // interface cannot reliably merge into -- the merge only "takes" once unrelated code
  // forces full resolution of foundry.canvas.Canvas, so it silently no-ops here. Instead
  // we type the active level locally and cast at the (single) use site.
  interface IActiveSceneLevel extends ISceneLevelData {
    id: string;
  }
}

// Native Foundry v14 Scene schema fields missing from foundry-vtt-types #main.
// Merged into Scene.Schema so Source / InitializedData / CreateData / UpdateData all
// derive automatically. Use the configuration module, NOT `declare global` -- merging
// the re-exported Scene namespace globally overrides it instead of merging (see the
// header comment in fvtt-types configuration/globals.d.mts).
declare module "fvtt-types/configuration" {
  namespace Scene {
    interface Schema {
      name: foundry.data.fields.StringField<{ required: true }>;
      // v14 common/documents/scene.mjs:86 -- new fields.DocumentIdField({readonly: false})
      initialLevel: foundry.data.fields.DocumentIdField<{ readonly: false }>;

      // v14 common/documents/scene.mjs:147 -- new fields.EmbeddedCollectionField(BaseLevel).
      // fvtt-types #main has no Level document, so this is modelled loosely against the
      // existing I5eSceneLevel data shape via DataField generics:
      //   <Options, AssignmentType, InitializedType, PersistedType>
      // initialized -> Collection (scene.levels), source -> array (scene.toObject().levels).
      levels: ISceneLevels;
      shiftX: foundry.data.fields.NumberField<{ required: true }>;
      shiftY: foundry.data.fields.NumberField<{ required: true }>;
    }
  }
}
