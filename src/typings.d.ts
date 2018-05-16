///<reference path="../node_modules/rxjs/Rx.d.ts"/>

/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/**
 * Interface for jQuery plugins.
 */
interface JQuery {
  swipeslider(options?: any): any;
}
