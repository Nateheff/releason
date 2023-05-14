class LoginView {
  _parentEl = document.querySelector('.form-login');

  loginHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.querySelector('.field__email').value;
      const password = document.querySelector('.field__psw').value;

      handler([email, password]);
    });
  }
}

export default new LoginView();
