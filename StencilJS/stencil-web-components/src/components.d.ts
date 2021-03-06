/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface USideDrawer {
    'itemTitle': string;
    'open': boolean;
    'openSidebar': () => Promise<void>;
  }
}

declare global {


  interface HTMLUSideDrawerElement extends Components.USideDrawer, HTMLStencilElement {}
  var HTMLUSideDrawerElement: {
    prototype: HTMLUSideDrawerElement;
    new (): HTMLUSideDrawerElement;
  };
  interface HTMLElementTagNameMap {
    'u-side-drawer': HTMLUSideDrawerElement;
  }
}

declare namespace LocalJSX {
  interface USideDrawer {
    'itemTitle'?: string;
    'open'?: boolean;
  }

  interface IntrinsicElements {
    'u-side-drawer': USideDrawer;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'u-side-drawer': LocalJSX.USideDrawer & JSXBase.HTMLAttributes<HTMLUSideDrawerElement>;
    }
  }
}


