export const backgroundVariants = ["cream", "white"] as const;

export type BackgroundVariant = (typeof backgroundVariants)[number];

export type DesignVariant = {
  background: BackgroundVariant;
};

export const VARIANT = {
  background: "cream",
} as const satisfies DesignVariant;

export function isBackgroundVariant(value: string | null | undefined): value is BackgroundVariant {
  return backgroundVariants.includes(value as BackgroundVariant);
}
