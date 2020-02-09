import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'u-stock-price',
  styleUrls: ['./stock-price.styl'],
  shadow: true,
})
export class StockPrice {

  @State() fetchPrice: number;

  onFetchStockPrice(e: Event): void {
    e.preventDefault();

    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo')
      .then(res => {
        return res.json();
      })
      .then(parseRes => {
        this.fetchPrice = +parseRes['Global Quote']['05. price'];
      })
      .catch(
        err => {
          console.log('File: stock-price.tsx, Line - 17, err:', err);
        }
      );
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}
            class="form">
        <input class="stock-symbol"/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: ${!!this.fetchPrice ? this.fetchPrice : 0}</p>
      </div>
    ];
  }
}
