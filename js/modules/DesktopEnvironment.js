// Main Desktop Environment
import WindowManager from './WindowManager.js';
import TaskbarManager from './TaskbarManager.js';
import NotificationService from '../services/NotificationService.js';
import AppManager from './AppManager.js';
import ContextMenu from './ContextMenu.js';

export default class DesktopEnvironment {
  constructor(user) {
    this.user = user;
    this.desktopEnvironment = document.getElementById('desktop-environment');
    this.desktop = document.getElementById('desktop');
    this.windowManager = new WindowManager();
    this.taskbarManager = new TaskbarManager();
    this.appManager = new AppManager(this.windowManager, this.taskbarManager);
    this.contextMenu = new ContextMenu();
    this.notificationService = new NotificationService();
  }

  async initialize() {
    this.desktopEnvironment.classList.add('active');
    
    // Load apps
    await this.appManager.loadApps();
    
    // Initialize taskbar
    await this.taskbarManager.initialize(this.appManager);
    
    // Setup desktop context menu
    this.setupDesktopContextMenu();
    
    // Show welcome notification
    this.notificationService.show('Welcome', `Welcome back, ${this.user.username}!`, 'success');
  }

  setupDesktopContextMenu() {
    this.desktop.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.contextMenu.show(e.clientX, e.clientY, [
        { label: 'App Developer', action: () => this.appManager.launchApp('app-developer') },
        { label: 'Settings', action: () => this.appManager.launchApp('settings') },
        { label: 'Refresh', action: () => location.reload() },
        { label: 'About AstrixOS', action: () => this.showAbout() }
      ]);
    });
  }

  showAbout() {
    this.notificationService.show('About', 'AstrixOS v1.0.0 - A browser-based operating system with App Developer!', 'info');
  }
}
