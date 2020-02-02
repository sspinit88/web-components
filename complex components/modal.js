/*
  connectedCallback() - Срабатывает, когда пользовательский элемент впервые добавляется в DOM.

  disconnectedCallback() - Срабатывает, когда пользовательский элемент удаляется из DOM.

  adoptedCallback() - Срабатывает, когда пользовательский элемент перемещен в новый документ.

  attributeChangedCallback() - Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.

  static get observedAttributes() - наблюдать за атрибутами.
*/

class Modal extends HTMLElement {

  _cancelBtn;
  _confirmBtn;
  _backdrop;
  _isOpen = false;
  _itemContents = `
    <style>
      :host {
        --clean-color: #fff;
      }
      
      :host([opened]) .backdrop,
      :host([opened]) .modal {
        opacity: 1;
        pointer-events: all;
      }
      
      :host([opened]) .modal {
        top: 15vh;
      }
      
      ::slotted(.title) {
        color: blue;
      }
        
      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, 0.5);
        z-index: 10;
        
        opacity: 0;
        pointer-events: none;
      }
           
      .modal {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        position: fixed;
        top: 10vh;
        left: 25%;
        width: 50%;
        z-index: 100;
        background-color: var(--clean-color);
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0,0,0, 0.25);
        
        opacity: 0;
        pointer-events: none;
        
        transition: all ease-in-out 0.3s;
      }
            
      header {
        text-align: center;
        border-bottom: 1px solid #ccc;
      }
      
      header .title {
        color: red;
      }
      
      .main {      
        text-align: center;
        padding: 1rem ;        
      }
      
      .actions {
        display: flex;
        justify-content: space-between;
      
        border-top: 1px solid #ccc;
        padding: 1rem;
      }
      
      .actions button {
        margin:  0 0.25rem;
        width: 100%;
        height: 50px;
        font-size: 16px;
        cursor: pointer;
      }
      
    </style>
    
    <div class="backdrop"></div>
    <div class="modal">
        <header>
          <slot name="title">
            <h3 class="title">Please Confirm</h3>
          </slot>
        </header>
        <section class="main">
          <slot></slot>
        </section>
        <section class="actions">
          <button class="cancel">Cancel</button>
          <button class="conform">Conform</button>
        </section>
    </div>
  `;

  constructor() {
    super();

    /*
    * Метод Element.attachShadow() добавляет теневое DOM дерево к указанному элементу и возвращает ссылку на его ShadowRoot( корневой элемент созданного дерева).
    * */
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this._itemContents;

    this._getAllSlots();

    this._cancelBtn = this.shadowRoot.querySelector('.cancel');
    this._confirmBtn = this.shadowRoot.querySelector('.conform');
    this._backdrop = this.shadowRoot.querySelector('.backdrop');

    this._cancelBtn.addEventListener('click', this._cancel.bind(this));
    this._confirmBtn.addEventListener('click', this._confirm.bind(this));
    this._backdrop.addEventListener('click', this._cancel.bind(this))

    // this._cancelBtn.addEventListener('cancel', () => {
    //   console.log(1);
    // });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute('opened')) {
      this._isOpen = true;
    } else {
      this._isOpen = false;
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    if (!this._isOpen) {
      this.setAttribute('opened', '');
    }
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
    this._isOpen = false;
  }

  _cancel(e) {
    this.hide();

    //// TODO создаем новое событие с использованием 'e.target'
    //// первый параметр - название события
    //// второй параметр - описание поведения события
    //// https://developer.mozilla.org/ru/docs/Web/API/Event/Event
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });

    e.target.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();

    //// TODO создаем новое событие с использованием функционала HTMLElement
    const confirmEvent = new Event('confirm', { bubbles: true, composed: true });

    this.dispatchEvent(confirmEvent);
  }

  _getAllSlots() {
    /*
    * TODO  получаем все слоты
    * */
    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', (e) => {
      /*
      * TODO получаем доступ к содиржимому слота
      * */
      console.dir(slots[1].assignedNodes());
    });
  }

  /*
  * TODO ниже приведен вариант изменения стилей программным способом
  * */

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (oldValue === newValue) {
  //     return;
  //   }
  //
  //   if (name === 'opened') {
  //     this._showModal();
  //   }
  // }
  //
  // static get observedAttributes() {
  //   return ['opened'];
  // }
  //
  // _showModal() {
  //   if (this.hasAttribute('opened')) {
  //     this.shadowRoot.querySelector('.backdrop').style.opacity = '1';
  //     this.shadowRoot.querySelector('.modal').style.opacity = '1';
  //
  //     this.shadowRoot.querySelector('.backdrop').style.pointerEvents = 'all';
  //     this.shadowRoot.querySelector('.modal').style.pointerEvents = 'all';
  //   }
  // }

}

customElements.define('u-modal', Modal);
