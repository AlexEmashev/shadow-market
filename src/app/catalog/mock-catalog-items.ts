import {CatalogItem} from './catalog-item';

/**
 * Mock catalog items. Will be removed when data-source is implemented.
 */
 export const CATALOG: CatalogItem[] = [
   { id: 0,
     user_id: 2,
     title: 'Brand new item',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: ['/assets/items/mock.svg'],
     price: 4.99,
     likes: 3,
     views: 10
   },
   { id: 1,
     user_id: 1,
     title: 'My Lovely Item #1',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: ['/assets/items/6blender.jpg','/assets/items/mock.svg'],
     price: 4.99,
     likes: 3,
     views: 10
   },
   { id: 2,
     user_id: 1,
     title: 'My Lovely Item #2',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: ['/assets/items/mock.svg'],
     price: 9.99,
     likes: 1,
     views: 1
   },
   { id: 3,
     user_id: 2,
     title: 'Not My Lovely Item #3',
     description: 'There is not much special over here, just a simple description of a mock item.',
     photos: ['/assets/items/mock.svg'],
     price: 19.99,
     likes: 5,
     views: 150
   },

 ];
