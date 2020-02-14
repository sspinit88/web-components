import { Component, h, State, Element, Prop, Watch } from '@stencil/core';

import { AV_API_KEY } from '../global/global'

@Component({
  tag: 'u-stock-price',
  styleUrls: ['./stock-price.styl'],
  shadow: true,
})
export class StockPrice {

  stockInput: HTMLInputElement;
  initialStockSymbol: string;

  //// получаем доступк к элементу
  @Element() el: HTMLElement;

  @State() fetchPrice: number;
  @State() stockUserInput: string;
  @State() stockUserInputValid: boolean;
  @State() error: string;

  /*
  *  устанавливаем значение атрибута,
  * получаем данные извне
  * */
  @Prop({
    mutable: true,
    reflect: true,
  }) stockSymbol: string;

  /*
  * Когда пользователь обновляет свойство,
  * Watch запускает любой метод, к которому он присоединен,
  * и передает этому методу новое значение свойства вместе со старым значением.
  * Watch - полезно для проверки реквизита или обработки побочных эффектов.
  * Watch декоратор не срабатывает при начальной загрузке компонента.
  * */
  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string): void {
    if (newValue !== oldValue) {
      this.stockUserInput = this.stockSymbol;
      this.fetchStockPrice(newValue);
    }
  }

  componentWillLoad(): void {
    console.log('componentWillLoad()');
    console.log('componentWillLoad(), this.stockSymbol:', this.stockSymbol)
  }

  componentDidLoad(): void {
    /*
    * componentDidMount() вызывается сразу после монтирования
    * (то есть, вставки компонента в DOM).
    * В этом методе должны происходить действия, которые требуют наличия DOM-узлов.
    * Это хорошее место для создания сетевых запросов.
    * */
    console.log('componentDidLoad()');
    if (this.stockSymbol) {
      /*
      * устанавливаем стартовое значение в инпут
      * */
      this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockUserInputValid = true;

      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate(): void {
    /*
    * срабатывает перед повторным рендеренгом,
    * из-за изменения @Prop() или @State()
    * */
    console.log('componentWillUpdate()');
  }

  componentDidUpdate(): void {
    console.log('componentDidUpdate()');
    /*
    * componentDidUpdate() вызывается сразу после обновления.
    * Не вызывается при первом рендере.
    * Метод позволяет работать с DOM при обновлении компонента.
    * Также он подходит для выполнения таких сетевых запросов,
    * которые выполняются на основании результата сравнения текущих пропсов с предыдущими.
    *  Если пропсы не изменились, новый запрос может и не требоваться.
    * */

    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    //   this.stockUserInput = this.stockSymbol;
    // }
  }

  componentDidUnload(): void {
    console.log('componentDidUnload()');
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
    this.stockSymbol = this.stockInput.value;
    // this.fetchStockPrice(stockSymbol)

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
