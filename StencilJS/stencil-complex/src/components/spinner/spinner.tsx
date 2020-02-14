import { Component, h } from '@stencil/core';

@Component({
  tag: 'u-spinner',
  styleUrls: ['./spinner.styl'],
  shadow: true,
})
export class Spinner {

  render() {
    return (
      <div class="lds-dual-ring"></div>
    );
  }
}
