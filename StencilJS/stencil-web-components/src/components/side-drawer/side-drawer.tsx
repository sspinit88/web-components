import { Component, h, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'u-side-drawer',
  styleUrl: './side-drawer.styl',
  /*
  * shadow: true - для работы в старых браузерах с shadow DOM будут добавлены полифилы
  * scoped: true - эмуляция shadow DOM
  */
  shadow: true,
})
export class SideDrawer {

  @State() showContactInfo: boolean = false;

  /*
  *@Prop({reflect: true}) - компонент будет обновляться, когда будет обновляться значение атрибута
  */
  @Prop({
    reflect: true,
    attribute: 'title'
  }) itemTitle: string;

  @Prop({
    reflect: true,
    mutable: true,
  }) open: boolean;

  @Method() /// делает метод публичным
  openSidebar() {
    this.open = true;
  }

  onCloseDrawer(): void {
    this.open = false;
  }

  onContentChange(content: string): void {
    this.showContactInfo = content === 'contact';
  }

  render() {
    let mainContent = <slot/>;

    if (!!this.showContactInfo) {
      mainContent = (
        <div class="content-information">
          <h4>Contact Information</h4>
          <p>Вы можете связаться с нами по мылу или телефону:</p>
          <ul>
            <li>Phone: +7 987 654 32 21</li>
            <li>E-mail: 9876543221@test.com</li>
          </ul>
        </div>
      );
    }

    return [
      <aside class="aside">
        <header class="header">
          <h2 class="header__title">
            {this.itemTitle}
          </h2>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section class="tabs">
          <button onClick={this.onContentChange.bind(this, 'nav')}
                  class={!this.showContactInfo ? 'active' : ''}>Navigation
          </button>
          <button onClick={this.onContentChange.bind(this, 'contact')}
                  class={!!this.showContactInfo ? 'active' : ''}>Contacts
          </button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>,
      <div onClick={this.onCloseDrawer.bind(this)}
           class={this.open ? 'overlay' : ''}></div>,
    ];
  }
}
