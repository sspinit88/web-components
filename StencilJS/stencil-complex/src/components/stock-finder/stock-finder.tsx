import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../global/global';

@Component({
  tag: 'u-stock-finder',
  styleUrls: ['./stock-finder.styl'],
  shadow: true,
})
export class StockFinder {

  stockNameInput: HTMLInputElement;

  @State() searchResult: { symbol: string, name: string }[] = [];

  @Event({
    bubbles: true,
    composed: true,
  }) uSymbolSelected: EventEmitter<string>;

  @State() loading: boolean = false;

  onFindStocks(e: Event): void {
    e.preventDefault();

    this.loading = true;

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(parsedRes => {
        this.loading = false;

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
          this.loading = false;
        }
      );

  }

  onSelectSymbol(symbol: string): void {
    this.uSymbolSelected
      .emit(symbol);
  }

  render() {
    let content = this.searchResult.map(result => (
      <li onClick={this.onSelectSymbol.bind(this, result.symbol)}
          class="search-result__list">
        <strong class="search-result__strong">
          {result.symbol}
        </strong>
        {result.name}
      </li>
    ));

    if (!!this.loading) {
      content = <slot></slot>;
    }

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
          content
        }
      </ul>
    ];
  }
}
