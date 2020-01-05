import { VElement, render } from './dom/ElementProvider';

export class Comp extends VElement {
  tag = 'input';
  style = {
    backgroundColor: 'pink'
  };
  attributes = {
    type: 'button',
    value: 'hello'
  };
}
