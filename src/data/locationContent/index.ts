import type { LocationServiceContent, LocationServiceContentMap } from "./types";
import { interiorPaintingContent } from "./interior-painting";
import { exteriorPaintingContent } from "./exterior-painting";
import { ceilingPaintingContent } from "./ceiling-painting";
import { cabinetPaintingContent } from "./cabinet-painting";
import { popcornCeilingRemovalContent } from "./popcorn-ceiling-removal";
import { kitchenPaintingContent } from "./kitchen-painting";
import { pressureWashingContent } from "./pressure-washing";
import { deckStainingContent } from "./deck-staining";
import { fenceStainingContent } from "./fence-staining";
import { drywallRepairContent } from "./drywall-repair";
import { epoxyFlooringContent } from "./epoxy-flooring";
import { commercialPaintingContent } from "./commercial-painting";

/**
 * Combined map: [locationSlug][serviceSlug] -> LocationServiceContent.
 * If a given combination is absent, the dynamic page falls back to the
 * generic template (see src/app/[location]/[service]/page.tsx).
 */
export const locationServiceContent: LocationServiceContentMap = {};

function register(
  serviceSlug: string,
  byLocation: Record<string, LocationServiceContent>
) {
  for (const [locationSlug, content] of Object.entries(byLocation)) {
    if (!locationServiceContent[locationSlug]) {
      locationServiceContent[locationSlug] = {};
    }
    locationServiceContent[locationSlug][serviceSlug] = content;
  }
}

register("interior-painting", interiorPaintingContent);
register("exterior-painting", exteriorPaintingContent);
register("ceiling-painting", ceilingPaintingContent);
register("cabinet-painting", cabinetPaintingContent);
register("popcorn-ceiling-removal", popcornCeilingRemovalContent);
register("kitchen-painting", kitchenPaintingContent);
register("pressure-washing", pressureWashingContent);
register("deck-staining", deckStainingContent);
register("fence-staining", fenceStainingContent);
register("drywall-repair", drywallRepairContent);
register("epoxy-flooring", epoxyFlooringContent);
register("commercial-painting", commercialPaintingContent);

export function getLocationServiceContent(
  locationSlug: string,
  serviceSlug: string
): LocationServiceContent | undefined {
  return locationServiceContent[locationSlug]?.[serviceSlug];
}

export type { LocationServiceContent, LocationServiceContentMap } from "./types";
