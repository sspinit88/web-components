import { Config } from '@stencil/core';
import { stylus } from '@stencil/stylus';

export const config: Config = {
  namespace: 'u-stencil-complex',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    stylus({
      includePaths: [
        'src/components'
      ]
    }),
  ],
  bundles: [
    { components: ['u-spinner'] },
    { components: ['u-stock-price'] },
    { components: ['u-stock-finder'] },
  ],
};
