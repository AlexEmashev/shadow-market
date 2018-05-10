import {CatalogItem} from './catalog-item';
import { ImageElement, ImageState } from './image_element';

/**
 * Mock catalog items. Will be removed when data-source is implemented.
 */
 export const CATALOG: CatalogItem[] = [
   { id: 0,
     user_id: 2,
     user_name: 'aemashev',
     title: 'Angular App Shadow Market',
     description: 'This very app you are looking at. You pay for exactly what you see. Fully functional Angular 5 web-app at your service.',
     photos: [
       {url: 'assets/items/mock.svg', state: ImageState.not_changed}
     ],
     price: 500.99,
     likes: ['aemashev', 'john_smith'],
     views: 1024
   },
   { id: 1,
     user_id: 1,
     user_name: 'john_smith',
     title: 'Vintage Blender',
     description: 'This is a really long description of the item. Lorem ipsum dolor sit amet, consectetur adipisicing elit, '
      + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
      + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
      + ' ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit'
      + ' esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,'
      + ' sunt in culpa qui officia deserunt mollit anim id est laborum.',
     photos: [
       {url: 'assets/items/blender.jpg', state: ImageState.not_changed},
       {url: 'assets/items/blender2.jpg', state: ImageState.not_changed}
     ],
     price: 45.01,
     likes: ['aemashev', 'jane_doe'],
     views: 10
   },
   { id: 2,
     user_id: 1,
     user_name: 'john_smith',
     title: 'Vintage Oscilloscope',
     description: 'Pretty old and shabby oscilloscope. Still fully functional. Collector\'s treasure.',
     photos: [
      {url: 'assets/items/oscilloscope.jpg', state: ImageState.not_changed}
     ],
     price: 9.99,
     likes: ['jane_doe'],
     views: 1
   },
   { id: 3,
     user_id: 2,
     user_name: 'aemashev',
     title: 'Lantern',
     description: 'This is still work in progress but you can preorder a final solution as soon as it\'s ready.',
     photos: [
      {url: 'assets/items/lantern.jpg', state: ImageState.not_changed}
     ],
     price: 20,
     likes: [],
     views: 150
   },
   { id: 4,
     user_id: 3,
     user_name: 'jane_doe',
     title: 'Antient book',
     description: 'Found this book on my attic. I\'m pretty sure it\'s rare and expensive hence the price',
     photos: [
      {url: 'assets/items/book.jpg', state: ImageState.not_changed}
     ],
     price: 999.99,
     likes: ['aemashev', 'jane_doe'],
     views: 10
   }

 ];
