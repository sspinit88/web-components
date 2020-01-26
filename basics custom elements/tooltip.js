class Tooltip extends HTMLElement {

  _tooltipContainer;
  _tooltipText = 'Текст по умолчанию';
  _slotString = `
                <style>
                   div {
                    position: absolute;
                    background-color: white;
                    color: blue;
                    border: 2px solid orange;
                    padding: 5px;
                    z-index: 10;
                    text-align: center;
                  };
                </style>
                <slot>Some default</slot>
                <span> (?) </span>
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

  initTooltip() {
    // const tooltipIcon = document.createElement('span');
    // tooltipIcon.textContent = '(?) ';
    // this.shadowRoot.appendChild(tooltipIcon);

    const tooltipIcon = this.shadowRoot.querySelector('span');

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');

    this._setTooltipStyles.bind(this);
    // this._setContainerStyles(this._tooltipContainer);

    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);

    this.style.position = 'relative';
  }

  _hideTooltip() {
    if (!!this.childNodes) {
      this._removeTooltipContent();
    }
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
