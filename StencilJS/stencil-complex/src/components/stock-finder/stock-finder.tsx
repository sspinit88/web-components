import { Component, h, State } from '@stencil/core';

import { AV_API_KEY } from '../global/global';

@Component({
  tag: 'u-stock-finder',
  styleUrls: ['./stock-finder.styl'],
  shadow: true,
})
export class StockFinder {

  stockNameInput: HTMLInputElement;

  @State() searchResult: { symbol: string, name: string }[] = [];

  onFindStocks(e: Event): void {
    e.preventDefault();

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
        this.searchResult = parsedRes['bestMatches']
          .map(match => {
            return {
              symbol: match['1. symbol'],
              name: match['2. name'],
            };
          });
      })
      .catch(
        err => {
          console.log('File: stock-finder.tsx, Line - 24, err:', err);
        }
      );

  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}
            class="form">
        <input ref={el => this.stockNameInput = el}
               class="stock-symbol"/>
        <button type="submit">
          Find!
        </button>
      </form>,
      <ul class="search-result">
        {
          this.searchResult.map(result => (
            <li class="search-result__list">
              <strong class="search-result__strong">
                {result.symbol}
              </strong>
              {result.name}
            </li>
          ))
        }
      </ul>
    ];
  }
}
