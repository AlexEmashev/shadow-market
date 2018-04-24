/**
 * Theme interface
 */
export interface Theme {
    name: string;
    class: string;
}
/**
 * Available themes
 */
export const Themes: Theme[] = [
  {
    name: 'hazyDay',
    class: 'hazy-day-theme'
  },{
    name: 'blackWatch',
    class: 'black-watch-theme'
  }
];
