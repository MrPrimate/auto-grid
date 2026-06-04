interface ISceneCandidateLike {
  background?: { src?: string | null };
  levels?: { background?: { src?: string | null } }[];
  shiftX?: number;
  shiftY?: number;
  width?: number;
  height?: number;
}

export async function isGridDetectionCandidate(
  scene: ISceneCandidateLike,
  getDimensions: (src: string) => Promise<{ width: number; height: number }>,
): Promise<boolean> {
  const src = scene?.levels?.[0]?.background?.src ?? scene?.background?.src ?? null;
  if (!src) return false;

  const shiftX = Number(scene.shiftX ?? 0);
  const shiftY = Number(scene.shiftY ?? 0);
  if (shiftX !== 0 || shiftY !== 0) return false;

  const sceneWidth = Number(scene.width);
  const sceneHeight = Number(scene.height);
  if (!Number.isFinite(sceneWidth) || !Number.isFinite(sceneHeight)) return false;

  try {
    const dims = await getDimensions(src);
    if (Math.abs(dims.width - sceneWidth) > 1) return false;
    if (Math.abs(dims.height - sceneHeight) > 1) return false;
    return true;
  } catch {
    return false;
  }
}
