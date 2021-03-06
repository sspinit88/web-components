import { Config } from '@stencil/core';
import { stylus } from '@stencil/stylus';

export const config: Config = {
  namespace: 'u-stencil-test',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    // {
    //   type: 'www',
    //   serviceWorker: null // disable service workers
    // }
  ],
  plugins: [
    stylus({
      // injectGlobalPaths: [
      //   'src/components/side-drawer/vars.styl',
      //   'src/components/side-drawer/side-drawer.styl'
      // ],
      includePaths: [
        'src/components/side-drawer/'
      ]
    })
  ],
};
