class NotLoggedIn {
  sikeEnterHandler(handler) {
    document.querySelector('.btn__url').addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new NotLoggedIn();
