import 'styled-components';
import { THEMES } from './constants/ui.constants';

type Theme = typeof THEMES.light;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
