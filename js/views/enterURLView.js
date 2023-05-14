class EnterURLView {
  _parentEL = document.querySelector('.btn__url');

  enterURLHandler(handler) {
    this._parentEL.addEventListener('click', function (e) {
      e.preventDefault();
      const url = document.querySelector('.url__field').value;

      handler(url);
    });
  }

  loggedIn() {
    document.querySelector('.header').style.display = 'none';
  }

  changeField() {
    // this._parentEl.style.display = 'none';
    this._parentEL.style.display = 'none';
    document.querySelector('.url__field').setAttribute('readonly', true);
    document.querySelector('.enter-name').style.display = 'inline-block';
    document.querySelector('.chill').style.top = '251px';
    const error = document.querySelector('.invalid-url');
    if (error) {
      error.remove();
    }
  }

  renderError(message) {
    const html = `
    <p class="invalid-url">${message}</p>
    `;
    document.querySelector('.enter-name').insertAdjacentHTML('afterend', html);
  }

  renderURL(url) {
    console.log(url);
    url.forEach(val => {
      const html = `
    <li class="url">
            <span class="saved-url"><a href="${val}" target="_blank">${val}</a></span>
          </li>
    `;
      document
        .querySelector('.title-url')
        .insertAdjacentHTML('beforeend', html);
    });
  }

  requireExt() {
    document.querySelector('.enter-url').style.display = 'none';
    document.querySelector('.no-extension').style.display = 'block';
  }
}
export default new EnterURLView();
