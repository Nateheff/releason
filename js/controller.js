import * as model from './model.js';
import enterNameView from './views/enterNameView.js';
import enterURLView from './views/enterURLView.js';
import signupView from './views/signupView.js';
import notLoggedInView from './views/notLoggedInView.js';
import loginView from './views/loginView.js';

import 'core-js/stable';

const id = document.body.id;

const g = async function () {
  const saveData = await model.getLoginInfo();
  console.log(saveData);
  model.getAllURLS();
  const synch = await model.getStuff('https://synchtec.net/collections/all');
  console.log(synch);
};
model.runCheck();

g();

if (document.body.id === 'index' && sessionStorage.getItem('status') != null) {
  console.log('Logged in');
  enterURLView.loggedIn();

  const enterURLController = function (url) {
    const id = sessionStorage.getItem('Id');
    if (!model.checkURL(url, id))
      return enterURLView.renderError('Please input a valid URL!');

    // console.log(model.getUrls());

    enterURLView.changeField();
  };

  const enterNameController = function (name) {
    const id = sessionStorage.getItem('Id');
    model.setNames(name, id);
  };

  const renderBottom = async function () {
    const id = sessionStorage.getItem('Id');
    const names = await model.getNames(id);
    const urls = await model.getUrls(id);

    if (!urls) return;
    console.log(names, urls);
    console.log(urls);

    enterNameView.renderName(names);
    enterURLView.renderURL(urls);
  };

  let init = function () {
    enterURLView.enterURLHandler(enterURLController);
    enterNameView.enterNameHandler(enterNameController);
    renderBottom();
  };
  init();
}

if (document.body.id === 'index' && !sessionStorage.getItem('status')) {
  console.log('Please login to use our features');
}

if (id === 'signup') {
  console.log("You're signing up");

  const signUpController = async function (data) {
    try {
      console.log('okay');
      await model.setLoginInfo(data);

      const emails = model.state.users.map(user => user.email);
      if (emails.includes(data[0])) {
        alert('An account under that email alreayd exists. Please sign in!');
        return;
      } else {
        await model.getNewLoginInfo();
      }

      const id = await model.getId(data);
      sessionStorage.setItem('Id', id);

      console.log(model.state.users);
      sessionStorage.setItem('status', 'loggedIn');
      window.location.href = 'http://localhost:1234/index.html';
    } catch (err) {
      console.error(err);
    }
  };

  let init = function () {
    console.log('h1');
    signupView.signUpHandler(signUpController);
  };
  init();
}

if (id === 'login') {
  const loginController = async function (data) {
    try {
      const check = await model.checkLogin(data);
      if (!check) {
        throw new Error("Couldn't login. Please check email and password!");
      } else {
        const id = await model.getId(data);
        sessionStorage.setItem('Id', id);

        sessionStorage.setItem('status', 'loggedIn');
        window.location.href = 'http://localhost:1234/index.html';
      }
    } catch (err) {
      alert(err);
    }
  };

  const init = function () {
    loginView.loginHandler(loginController);
  };
  init();
}

export const checkExtension = function (hasEx) {
  console.log(hasEx);
  if (hasEx === false) {
    enterURLView.requireExt();
  } else return true;
};
