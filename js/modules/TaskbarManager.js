// Taskbar Manager
export default class TaskbarManager {
  constructor() {
    this.startMenuBtn = document.getElementById('start-menu-btn');
    this.startMenu = document.getElementById('start-menu');
    this.startClose = document.getElementById('start-close');
    this.taskbarApps = document.getElementById('taskbar-apps');
    this.taskbarSearch = document.getElementById('taskbar-search');
    this.notificationBtn = document.getElementById('notification-btn');
    this.settingsBtn = document.getElementById('settings-btn');
    this.clock = document.getElementById('clock');
    this.appManager = null;
  }

  async initialize(appManager) {
    this.appManager = appManager;
    this.setupEventListeners();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  setupEventListeners() {
    this.startMenuBtn.addEventListener('click', () => this.toggleStartMenu());
    this.startClose.addEventListener('click', () => this.closeStartMenu());
    this.taskbarSearch.addEventListener('keypress', (e) => this.handleSearch(e));
    this.notificationBtn.addEventListener('click', () => this.toggleNotifications());
    this.settingsBtn.addEventListener('click', () => this.appManager.launchApp('settings'));
  }

  toggleStartMenu() {
    this.startMenu.classList.toggle('active');
    if (this.startMenu.classList.contains('active')) {
      this.populateStartMenu();
    }
  }

  closeStartMenu() {
    this.startMenu.classList.remove('active');
  }

  populateStartMenu() {
    const pinnedApps = document.getElementById('start-pinned');
    const allApps = document.getElementById('start-all-apps');
    pinnedApps.innerHTML = '';
    allApps.innerHTML = '';

    if (this.appManager.apps) {
      this.appManager.apps.forEach(app => {
        const appEl = document.createElement('div');
        appEl.className = 'start-app';
        appEl.innerHTML = `
          <div class="start-app-icon">${app.icon || '📦'}</div>
          <div class="start-app-label">${app.name}</div>
        `;
        appEl.addEventListener('click', () => {
          this.appManager.launchApp(app.id);
          this.closeStartMenu();
        });
        allApps.appendChild(appEl);
      });
    }
  }

  handleSearch(e) {
    if (e.key === 'Enter') {
      const query = this.taskbarSearch.value.trim();
      if (query) {
        const app = this.appManager.apps.find(a => 
          a.name.toLowerCase().includes(query.toLowerCase())
        );
        if (app) {
          this.appManager.launchApp(app.id);
        }
        this.taskbarSearch.value = '';
      }
    }
  }

  toggleNotifications() {
    const notificationCenter = document.getElementById('notification-center');
    notificationCenter.classList.toggle('active');
  }

  updateClock() {
    const now = new Date();
    this.clock.textContent = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  }

  addTaskbarApp(appId, appName, icon) {
    const btn = document.createElement('button');
    btn.className = 'taskbar-app-btn';
    btn.id = `taskbar-${appId}`;
    btn.innerHTML = `<span>${icon || '📦'}</span><span>${appName}</span>`;
    btn.addEventListener('click', () => {
      const existingWindow = Array.from(document.querySelectorAll('.window')).find(
        w => w.id === `window-${appId}`
      );
      if (existingWindow) {
        existingWindow.classList.toggle('minimized');
      }
    });
    this.taskbarApps.appendChild(btn);
    return btn;
  }

  removeTaskbarApp(appId) {
    const btn = document.getElementById(`taskbar-${appId}`);
    if (btn) btn.remove();
  }
}
