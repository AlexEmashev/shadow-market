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
