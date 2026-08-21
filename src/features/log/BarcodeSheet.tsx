import * as React from "react";
import { Barcode, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Sheet } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";
import { createNativeDetector, detectWithZxing, isPlausibleBarcode } from "@/lib/barcode";
import { OffError, cacheOffFood, fetchOffProduct } from "@/lib/connectors/openFoodFacts";
import type { Food } from "@/lib/db/models";
import { t } from "@/lib/i18n";

type State =
  | { kind: "idle" }
  | { kind: "scanning" }
  | { kind: "looking-up" }
  | { kind: "error"; message: string };

/**
 * Camera barcode scanner (D-009). Native BarcodeDetector when the browser
 * has it, zxing-wasm otherwise; manual entry always available as fallback.
 */
export function BarcodeSheet({
  open,
  onOpenChange,
  onFound,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFound: (food: Food) => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const loopRef = React.useRef<number>(0);
  const [state, setState] = React.useState<State>({ kind: "idle" });
  const [manual, setManual] = React.useState("");

  const stopCamera = React.useCallback(() => {
    cancelAnimationFrame(loopRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const lookup = React.useCallback(
    async (code: string) => {
      stopCamera();
      setState({ kind: "looking-up" });
      try {
        const food = await cacheOffFood(await fetchOffProduct(code));
        onFound(food);
        onOpenChange(false);
        setState({ kind: "idle" });
      } catch (error) {
        const reason = error instanceof OffError ? error.reason : "network";
        setState({
          kind: "error",
          message:
            reason === "notFound"
              ? t.log.scanNotFound
              : reason === "offline"
                ? t.log.offOffline
                : t.log.offError,
        });
      }
    },
    [onFound, onOpenChange, stopCamera]
  );

  const startCamera = React.useCallback(async () => {
    setState({ kind: "scanning" });
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();

      const detector = createNativeDetector();
      let busy = false;

      const tick = async () => {
        loopRef.current = requestAnimationFrame(() => void tick());
        if (busy || !video.videoWidth) return;
        busy = true;
        try {
          let code: string | null = null;
          if (detector) {
            const results = await detector.detect(video);
            code = results[0]?.rawValue ?? null;
          } else {
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas.getContext("2d")?.drawImage(video, 0, 0);
              code = await detectWithZxing(canvas);
            }
          }
          if (code && isPlausibleBarcode(code)) {
            cancelAnimationFrame(loopRef.current);
            await lookup(code.trim());
          }
        } catch {
          // A single failed frame is not an error — keep scanning.
        } finally {
          busy = false;
        }
      };
      void tick();
    } catch (error) {
      const name = (error as { name?: string }).name;
      setState({
        kind: "error",
        message: name === "NotFoundError" ? t.log.scanNoCamera : t.log.scanPermission,
      });
    }
  }, [lookup]);

  React.useEffect(() => {
    if (open) {
      setManual("");
      void startCamera();
    } else {
      stopCamera();
      setState({ kind: "idle" });
    }
    return stopCamera;
  }, [open, startCamera, stopCamera]);

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={t.log.scanTitle}
      description={t.log.scanHint}
      desktop="sheet"
    >
      <div className="flex flex-col gap-4 pb-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-inverse">
          <video
            ref={videoRef}
            playsInline
            muted
            className="size-full object-cover"
            aria-label={t.log.scanTitle}
          />
          <canvas ref={canvasRef} className="hidden" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-1/2 h-24 -translate-y-1/2 rounded-xl border-2 border-accent/80"
          />
          {state.kind === "looking-up" && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-inverse/70 text-inverse-foreground">
              <Spinner /> {t.log.scanSearching}
            </div>
          )}
        </div>

        {state.kind === "error" && (
          <Callout tone="warning" title={t.log.scanTitle}>
            {state.message}
          </Callout>
        )}

        {state.kind === "error" && (
          <Button variant="soft" size="md" full onClick={() => void startCamera()}>
            <Camera /> {t.common.retry}
          </Button>
        )}

        <form
          className="flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (isPlausibleBarcode(manual)) void lookup(manual.trim());
          }}
        >
          <TextField
            label={t.log.scanManual}
            placeholder={t.log.scanManualPlaceholder}
            inputMode="numeric"
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="lg" disabled={!isPlausibleBarcode(manual)}>
            <Barcode />
          </Button>
        </form>
      </div>
    </Sheet>
  );
}
