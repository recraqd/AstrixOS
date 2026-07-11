// Main entry point for AstrixOS
import BootManager from './modules/BootManager.js';
import LockScreen from './modules/LockScreen.js';
import LoginScreen from './modules/LoginScreen.js';
import DesktopEnvironment from './modules/DesktopEnvironment.js';
import StorageService from './services/StorageService.js';
import ThemeService from './services/ThemeService.js';

class AstrixOS {
  constructor() {
    this.bootManager = null;
    this.lockScreen = null;
    this.loginScreen = null;
    this.desktopEnvironment = null;
    this.currentUser = null;
  }

  async initialize() {
    // Initialize storage and theme
    await StorageService.init();
    await ThemeService.init();

    // Check if user is logged in
    const user = StorageService.getItem('currentUser');
    
    if (user) {
      this.currentUser = user;
      await this.showLockScreen();
    } else {
      await this.showBootScreen();
    }
  }

  async showBootScreen() {
    this.bootManager = new BootManager();
    await this.bootManager.show();
    await this.showLoginScreen();
  }

  async showLockScreen() {
    this.lockScreen = new LockScreen();
    const unlocked = await this.lockScreen.show();
    if (unlocked) {
      await this.showDesktop();
    }
  }

  async showLoginScreen() {
    this.loginScreen = new LoginScreen();
    const user = await this.loginScreen.show();
    if (user) {
      this.currentUser = user;
      StorageService.setItem('currentUser', user);
      await this.showDesktop();
    }
  }

  async showDesktop() {
    this.desktopEnvironment = new DesktopEnvironment(this.currentUser);
    await this.desktopEnvironment.initialize();
  }
}

// Initialize AstrixOS when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const os = new AstrixOS();
    os.initialize();
  });
} else {
  const os = new AstrixOS();
  os.initialize();
}
