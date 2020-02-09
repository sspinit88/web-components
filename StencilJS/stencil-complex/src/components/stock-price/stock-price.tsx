import { Component, h } from '@stencil/core';

@Component({
  tag: 'u-stock-price',
  styleUrls: ['./stock-price.styl'],
  shadow: true,
})
export class StockPrice {

  onFetchStockPrice(e: Event): void {
    e.preventDefault();
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice}
            class="form">
        <input class="stock-symbol"/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>
    ];
  }
}
