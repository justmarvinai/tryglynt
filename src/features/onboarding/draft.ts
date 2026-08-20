import { APPROACH_BY_ID } from "@/config/targets";
import type { GenderIdentity, Profile, Settings } from "@/lib/db/models";
import type {
  ActivityLevelId,
  ApproachId,
  SexBasis,
} from "@/lib/engine/types";

export interface OnboardingDraft {
  name: string;
  sexAtBirth?: SexBasis;
  gender: GenderIdentity;
  birthDate?: string;
  heightCm: number;
  weightKg: number;
  bodyFatPct?: number;
  activityLevel?: ActivityLevelId;
  approach: ApproachId;
  approachModifier: number;
  units: Settings["units"];
}

export function initialDraft(): OnboardingDraft {
  return {
    name: "",
    gender: { kind: "none" },
    heightCm: 170,
    weightKg: 70,
    approach: "nourish",
    approachModifier: APPROACH_BY_ID.nourish.defaultModifier,
    units: "metric",
  };
}

/** Only valid once every required step has been answered. */
export function draftToProfile(
  draft: OnboardingDraft
): Omit<Profile, "id" | "createdAt" | "updatedAt"> | null {
  if (!draft.name.trim() || !draft.sexAtBirth || !draft.birthDate || !draft.activityLevel)
    return null;
  return {
    name: draft.name.trim(),
    sexAtBirth: draft.sexAtBirth,
    gender: draft.gender,
    birthDate: draft.birthDate,
    heightCm: draft.heightCm,
    weightKg: draft.weightKg,
    bodyFatPct: draft.bodyFatPct,
    activityLevel: draft.activityLevel,
    approach: draft.approach,
    approachModifier: draft.approachModifier,
    referenceSource: "efsa",
  };
}
