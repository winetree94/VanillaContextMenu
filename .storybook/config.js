// .storybook/config.ts
import { configure } from '@storybook/html';

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.tsx?$/), module);
