export interface VanillaContextNode {
  renderer: () => string | HTMLElement;
  onClick?: (event: Event) => void;
  children?: VanillaContextNode[];
}
