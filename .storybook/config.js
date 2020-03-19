import { configure, addParameters, addDecorator } from '@storybook/html';

configure(require.context('../stories', true, /.stories.tsx?$/), module);
