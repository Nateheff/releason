class SignUpView {
  _parentEl = document.querySelector('.form-signup');
  signUpHandler(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.querySelector('.field__email').value;
      const password = document.querySelector('.field__psw').value;
      if ([...email].length >= 5 || [...password].length >= 1) {
        handler({ email: email, psw: password });
      } else {
        alert(`Please check your inputs`);
      }
    });
  }
}

export default new SignUpView();
