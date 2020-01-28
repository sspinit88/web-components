/*

  connectedCallback() - Срабатывает, когда пользовательский элемент впервые добавляется в DOM.

  disconnectedCallback() - Срабатывает, когда пользовательский элемент удаляется из DOM.

  adoptedCallback() - Срабатывает, когда пользовательский элемент перемещен в новый документ.

  attributeChangedCallback() - Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.

  static get observedAttributes() - наблюдать за атрибутами.

*/


class Tooltip extends HTMLElement {

  _tooltipContainer;
  _tooltipText = 'Текст по умолчанию';
  _tooltipIcon;
  _tooltipVisible = false;
  _slotString = `
                <style>

                  :host {
                    --color-primary: blue;
                    --clean-color: #fff;
                  }

                   div {
                    position: absolute;
                    top: 1rem;
                    left: 7rem;
                    background-color: white;
                    color: blue;
                    border: 2px solid orange;
                    padding: 5px;
                    z-index: 10;
                    text-align: center;
                  };

                  .hightlight {
                    background-color: blue;
                  }

                  ::slotted(span.hightlight) {
                    background-color: yellow;
                    border-bottom: 5px solid red;
                  }

                  .icon {
                    background-color: black;
                    color: #fff;
                    margin: 0 3px 0;
                    text-align: center;
                  }

                  :host {
                    border: 5px solid green;
                  }

                  :host(.item-color) {
                    border: 5px solid #000;
                    color: var(--clean-color);
                    background-color: var(--color-primary, #ccc);
                  }

                  :host span {
                    border: 5px solid blue;
                  }

                  :host-context(p.first) {
                    font-weight: bold;
                  }

                </style>

                <slot>Some default</slot>
                <span class="icon"> (?) </span>
  `;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // const template = document.querySelector('#tooltip-template');
    // this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.innerHTML = this._slotString;
  }

  connectedCallback() {
    this.initTooltip();
    this._setTooltipText();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'text') {
      // меняем значение
      this._tooltipText = newValue;
    }

  }

  static get observedAttributes() {
    // TODO в массиве указываем те атрибуты, которые будем слушать
    return ['text'];
  }

  disconnectedCallback() {
    // TODO очищаем слушателея при удалении элемента из дерева
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  initTooltip() {
    // const tooltipIcon = document.createElement('span');
    // tooltipIcon.textContent = '(?) ';
    // this.shadowRoot.appendChild(tooltipIcon);

    this._tooltipIcon = this.shadowRoot.querySelector('span');

    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  // TODO метод отвечает за обновление DOM
  _render() {
    if (!!this._tooltipVisible) {
      this._show();
    } else {
      this._removeTooltipContent();
    }
  }

  _show() {
    this._tooltipContainer = document.createElement('div');

    this._setTooltipStyles.bind(this);
    // this._setContainerStyles(this._tooltipContainer);

    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);

    this.style.position = 'relative';
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }

  _removeTooltipContent() {
    if (!this._tooltipContainer) {
      return;
    }

    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  _setTooltipText() {
    if (!this.hasAttribute('text')) {
      return;
    }

    this._tooltipText = this.getAttribute('text');
  }

  _setTooltipStyles() {
    const elStyles = this.style;

    elStyles.position = 'relative';
  }

  _setContainerStyles(el) {
    const elStyle = el.style;

    elStyle.position = 'absolute';
    elStyle.backgroundColor = 'white';
    elStyle.color = 'black';
    elStyle.border = '1px solid black';
    elStyle.padding = '5px';
    elStyle.zIndex = '10';
    el.style.textAlign = 'center';

  }

}

customElements.define('u-tooltip', Tooltip);
