/**
 * Barcode scanning (D-009): native BarcodeDetector where available
 * (Android Chrome), zxing-wasm fallback everywhere else (iOS Safari).
 * The wasm module is imported lazily so it never touches the main bundle.
 */

const FORMATS = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"] as const;

interface NativeDetector {
  detect(source: CanvasImageSource): Promise<Array<{ rawValue: string }>>;
}

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: readonly string[] }) => NativeDetector;
  }
}

export function hasNativeDetector(): boolean {
  return typeof window !== "undefined" && "BarcodeDetector" in window;
}

export function createNativeDetector(): NativeDetector | null {
  if (!hasNativeDetector() || !window.BarcodeDetector) return null;
  try {
    return new window.BarcodeDetector({ formats: FORMATS });
  } catch {
    return null;
  }
}

/** Lazily-loaded zxing fallback. Returns the first barcode found. */
export async function detectWithZxing(canvas: HTMLCanvasElement): Promise<string | null> {
  const { readBarcodes } = await import("zxing-wasm/reader");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const results = await readBarcodes(image, {
    tryHarder: true,
    formats: ["EAN-13", "EAN-8", "UPC-A", "UPC-E", "Code128"],
  });
  return results[0]?.text ?? null;
}

/** Plausibility check so we don't query OFF with garbage. */
export function isPlausibleBarcode(code: string): boolean {
  return /^\d{8}$|^\d{12,14}$/.test(code.trim());
}
