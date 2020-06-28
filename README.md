![CI](https://github.com/winetree94/VanillaContextMenu/workflows/CI/badge.svg?branch=master)

# Pure Javascript Context Menu

This is lightweight and zero dependencies pure javascript library for modern web browser.

### Basic usage

```javascript
const table = document.getElementById('table');
const options = {...};
const context = new VanillaContext(table, options);
```

### Option interface

```typescript
interface VanillaContextOptions {
  debug?: boolean;
  autoClose?: boolean;
  nodes: ContextNode[] | ((e: Event) => ContextNode[]);
}
```

### ContextNode Interface

```typescript
interface ContextNode {
  renderer: Renderer;
  onClick: (params: ContextNodeEventParams) => void;
  children?: ContextNode[];
  disabled?: boolean | ((params: ContextDisabledParams) => boolean);
  height?: number | ((params: ContextHeightParams) => number);
}
```

### ContextNode callback parameter interfaces

click event callback function parameters interface
```typescript
export interface ContextNodeEventParams {
  api: VanillaContext;
  event: Event;
  originEvent: Event;
}
```

disabled callback function parameters interface
```typescript
export interface ContextDisabledParams {
  api: VanillaContext;
  originEvent: Event;
}
```

height callback function parameters interface
```typescript
export interface ContextHeightParams {
  api: VanillaContext;
  originEvent: Event;
}
```

# Renderer

you can use any type of renderer. string, function and class will works well

### Renderer Interface

```typescript
interface RendererInterface {
  init: (params: RendererParams) => void;
  getLayout: () => Node;
  destroy: () => void;
}
```
