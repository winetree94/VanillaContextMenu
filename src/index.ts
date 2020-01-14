import { VanillaContext } from './Context';
import './style.css';
import { VanillaContextNode } from './Node';

export default VanillaContext;

const data: VanillaContextNode[] = [
  {
    renderer: (): string => '안녕'
  },
  {
    renderer: (): string => '안녕',
    children: [
      {
        renderer: (): string => 'ㅋㅋ',
        onClick: (e: Event) => {
          console.log('눌렀네');
        }
      },
      {
        renderer: (): string => 'ㅋㅋ'
      },
      {
        renderer: (): string => 'ㅋㅋ',
        children: [
          {
            renderer: (): string => 'ㅋㅋ'
          },
          {
            renderer: (): string => 'ㅋㅋ'
          },
          {
            renderer: (): string => 'ㅋㅋ',
            children: [
              {
                renderer: (): string => 'ㅋㅋ'
              },
              {
                renderer: (): string => 'ㅋㅋ'
              },
              {
                renderer: (): string => 'ㅋㅋ'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    renderer: (): string => '안녕',
    children: [
      {
        renderer: (): HTMLElement => {
          const button = document.createElement('button');
          button.setAttribute('type', 'button');
          button.setAttribute('value', 'button');
          button.addEventListener('click', (e) => {
            console.log('눌렀넹');
          });
          return button;
        }
      },
      {
        renderer: (): string => 'ㅋㅋ'
      },
      {
        renderer: (): string => 'ㅋㅋ'
      }
    ]
  }
];

const context = new VanillaContext(document.body, data);
