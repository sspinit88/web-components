import { Component, h, State, Element } from '@stencil/core';

import { AV_API_KEY } from '../global/global'

@Component({
  tag: 'u-stock-price',
  styleUrls: ['./stock-price.styl'],
  shadow: true,
})
export class StockPrice {

  stockInput: HTMLInputElement;

  //// получаем доступк к элементу
  @Element() el: HTMLElement;

  @State() fetchPrice: number;

  @State() stockUserInput: string;

  @State() stockUserInputValid: boolean;

  onUserInput(e: Event): void {
    this.stockUserInput = (e.target as HTMLInputElement).value;

    if (this.stockUserInput.trim() !== '') {
      this.stockUserInputValid = true;
    } else {
      this.stockUserInputValid = false;
    }
  }

  onFetchStockPrice(e: Event): void {

    e.preventDefault();

    //// первый вариант получения значения из инпута
    // const stockSymbol: string = (
    //   this.el.shadowRoot.querySelector('.stock-symbol'
    //   ) as HTMLInputElement).value;

    //// второй вариант получения значения из инпута
    const stockSymbol: string = this.stockInput.value;

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
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
        <input ref={el => this.stockInput = el}
               value={this.stockUserInput}
               onInput={this.onUserInput.bind(this)}
               class="stock-symbol"/>
        <button disabled={!this.stockUserInputValid}
                type="submit">Fetch
        </button>
      </form>,
      <div>
        <p>Price: ${!!this.fetchPrice ? this.fetchPrice : 0}</p>
      </div>
    ];
  }
}
