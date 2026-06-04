export {};

declare global {
  const game: any;
  const ui: any;
  const foundry: any;
  const Hooks: any;
  const canvas: any;
  const FormDataExtended: any;

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
}
