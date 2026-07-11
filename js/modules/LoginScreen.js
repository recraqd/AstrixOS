// Login Screen Manager
export default class LoginScreen {
  constructor() {
    this.loginScreen = document.getElementById('login-screen');
    this.loginForm = document.getElementById('login-form');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
  }

  show() {
    return new Promise(resolve => {
      this.loginScreen.classList.add('active');
      this.resolveLogin = resolve;
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
      this.loginScreen.classList.remove('active');
      this.resolveLogin({ username, password });
    }
  }
}
