import {CatalogItem} from './catalog-item';
import { ImageElement, ImageState } from './images-edit/image_element';

/**
 * Mock catalog items. Will be removed when data-source is implemented.
 */
 export const CATALOG: CatalogItem[] = [
   { id: 0,
     user_id: 2,
     user_name: 'aemashev',
     title: 'Brand new item',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: [
       {url: '/assets/items/mock.svg', state: ImageState.not_changed}
     ],
     price: 4.99,
     likes: 3,
     views: 10
   },
   { id: 1,
     user_id: 1,
     user_name: 'john_smith',
     title: 'My Lovely Item #1',
     description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, '
      + ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
      + ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
      + ' ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit'
      + ' esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,'
      + ' sunt in culpa qui officia deserunt mollit anim id est laborum.',
     photos: [
       {url: '/assets/items/mock.svg', state: ImageState.not_changed},
       {url: '/assets/items/6blender.jpg', state: ImageState.not_changed}
     ],
     price: 4.99,
     likes: 3,
     views: 10
   },
   { id: 2,
     user_id: 1,
     user_name: 'john_smith',
     title: 'My Lovely Item #2',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: [
      {url: '/assets/items/mock.svg', state: ImageState.not_changed}
     ],
     price: 9.99,
     likes: 1,
     views: 1
   },
   { id: 3,
     user_id: 2,
     user_name: 'aemashev',
     title: 'Not My Lovely Item #3',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: [
      {url: '/assets/items/mock.svg', state: ImageState.not_changed}
     ],
     price: 19.99,
     likes: 5,
     views: 150
   },
   { id: 3,
     user_id: 3,
     user_name: 'jane_doe',
     title: 'Something from Jane',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: [
      {url: '/assets/items/mock.svg', state: ImageState.not_changed}
     ],
     price: 33.99,
     likes: 1,
     views: 10
   }

 ];
