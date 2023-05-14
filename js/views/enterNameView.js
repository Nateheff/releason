class EnterNameView {
  _parentEL = document.querySelector('.btn__name');

  enterNameHandler(handler) {
    this._parentEL.addEventListener('click', function (e) {
      e.preventDefault();
      const name = document.querySelector('.name__field').value;
      document.querySelector('.enter-name').style.display = 'none';
      handler(name);
      location.reload();
    });
  }

  renderName(names) {
    names.forEach(val => {
      const html = `
    <li class="url">
            <span class="saved-url">${val}</span>
          </li>
    `;
      document
        .querySelector('.title-name')
        .insertAdjacentHTML('beforeend', html);
    });
  }
}

export default new EnterNameView();
