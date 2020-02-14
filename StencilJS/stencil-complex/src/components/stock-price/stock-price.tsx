import { Component, h, State, Element, Prop } from '@stencil/core';

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
  @State() error: string;

  /*
  *  устанавливаем значение атрибута
  * */
  @Prop() stockSymbol: string;

  componentDidLoad() {
    /*
    * componentDidMount() вызывается сразу после монтирования
    * (то есть, вставки компонента в DOM).
    * В этом методе должны происходить действия, которые требуют наличия DOM-узлов.
    * Это хорошее место для создания сетевых запросов.
    * */
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }


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
    this.fetchStockPrice(stockSymbol)

  }

  fetchStockPrice(stockSymbol) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Invalid Value!');
        }

        return res.json();
      })
      .then(parseRes => {

        if (!parseRes['Global Quote']) {
          throw new Error('Invalid symbol!')
        }

        this.error = null;
        this.fetchPrice = +parseRes['Global Quote']['05. price'];

      })
      .catch(
        err => {
          this.error = err.message;
        }
      );
  }

  render() {

    let dataContent = <p>Please enter a symbol!</p>;

    if (!!this.error) {
      dataContent = <p class="error">{this.error}</p>;
    }

    if (!!this.fetchPrice) {
      dataContent = <p>Price: ${this.fetchPrice}</p>;
    }

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
        {dataContent}
      </div>
    ];
  }
}
