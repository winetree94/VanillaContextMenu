import { storiesOf } from '@storybook/html';
import { action } from '@storybook/addon-actions';

import 'jquery/dist/jquery.slim.min';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

import '../src/styles/style.css';
import { VanillaContext } from '../src/Container';

const stories = storiesOf('Intro', exports);

stories.add('what is', () => {
  const container = document.createElement('div');
  container.className = 'container-fluid';
  container.style.paddingTop = '20px';
  container.innerHTML = /* html */ `
  <div class="jumbotron">
    <h1>pure browser context menu library for modern web browser</h1>
  </div>
  `;
  return container;
});

// stories.add('backup', () => {
//   const table = document.createElement('table');
//   table.className = 'pure-table';
//   table.innerHTML = `
//   <tr>
//     <th>Company</th>
//     <th>Contact</th>
//     <th>Country</th>
//   </tr>
//   <tr>
//     <td>Alfreds Futterkiste</td>
//     <td>Maria Anders</td>
//     <td>Germany</td>
//   </tr>
//   <tr>
//     <td>Centro comercial Moctezuma</td>
//     <td>Francisco Chang</td>
//     <td>Mexico</td>
//   </tr>
//   <tr>
//     <td>Ernst Handel</td>
//     <td>Roland Mendel</td>
//     <td>Austria</td>
//   </tr>
//   <tr>
//     <td>Island Trading</td>
//     <td>Helen Bennett</td>
//     <td>UK</td>
//   </tr>
//   <tr>
//     <td>Laughing Bacchus Winecellars</td>
//     <td>Yoshi Tannamuri</td>
//     <td>Canada</td>
//   </tr>
//   <tr>
//     <td>Magazzini Alimentari Riuniti</td>
//     <td>Giovanni Rovelli</td>
//     <td>Italy</td>
//   </tr>
//   `;
//   const contextmenu = new VanillaContext(table, {
//     nodes: [
//       {
//         renderer: '<i></i>Hello World',
//         onClick: params => action('click'),
//         children: [
//           {
//             renderer: 'hello'
//           },
//           {
//             renderer: 'hello'
//           }
//         ]
//       }
//     ]
//   });
//   return table;
// });
