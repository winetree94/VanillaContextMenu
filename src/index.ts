import { Request } from './http/Client';
import { VElement, render } from './dom/ElementProvider';
import { Comp } from './Comp';

class App extends VElement {
  tag = 'div';
  children = [Comp, Comp, Comp];
  style = {};
}

console.log(App);

render(App, document.body);
