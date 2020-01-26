class ConfirmLink extends HTMLAnchorElement {

  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Вы действительно хотите перейти по ссылке?')) {
        event.preventDefault();
      }
    });
  }

}

customElements.define('u-confirm-link', ConfirmLink, {
  extends: 'a',
});
