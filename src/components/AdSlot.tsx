interface AdSlotProps {
  slot: string;
}

/**
 * Ad placeholder component.
 * Renders nothing when no ad provider is configured.
 * Replace the body with your ad provider's component when ready.
 */
export function AdSlot({ slot: _slot }: AdSlotProps) {
  // No ad provider configured — render nothing
  return null;
}
