export function formatModifier(mod, hideZeroModifier = false) {
	if (mod === 0 && hideZeroModifier) return '';
  if (mod < 0) return String(mod);
  return `+${mod}`;
}
