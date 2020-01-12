import { Request } from './http/Client';
import { VElement, render } from './dom/ElementProvider';
import './components/WineCanvas';
import './components/SaySomething';

// render(App, document.body);

document.body.innerHTML = '<wine-canvas></wine-canvas><say-something></say-something>';
