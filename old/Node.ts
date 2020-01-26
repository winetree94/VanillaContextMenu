export interface VanillaContextNode {
  renderer: (() => string | Node) | string;
  onClick?: (event: Event) => void;
  children?: VanillaContextNode[];
}
