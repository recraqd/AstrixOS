// App Development Kit - Allows users to create and save custom apps
export default class AppDevKit {
  constructor() {
    this.customApps = new Map();
    this.loadCustomApps();
  }

  loadCustomApps() {
    const stored = localStorage.getItem('customApps');
    if (stored) {
      try {
        const apps = JSON.parse(stored);
        apps.forEach(app => {
          this.customApps.set(app.id, app);
        });
      } catch (e) {
        console.error('Failed to load custom apps:', e);
      }
    }
  }

  saveCustomApps() {
    const apps = Array.from(this.customApps.values());
    localStorage.setItem('customApps', JSON.stringify(apps));
  }

  createApp(config) {
    const id = config.id || `app-${Date.now()}`;
    const app = {
      id,
      name: config.name || 'Untitled App',
      icon: config.icon || '📦',
      category: config.category || 'Custom',
      description: config.description || '',
      html: config.html || '<p>App content</p>',
      css: config.css || '',
      js: config.js || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.customApps.set(id, app);
    this.saveCustomApps();
    return app;
  }

  updateApp(id, config) {
    if (this.customApps.has(id)) {
      const app = this.customApps.get(id);
      Object.assign(app, config, { updatedAt: new Date().toISOString() });
      this.saveCustomApps();
      return app;
    }
    throw new Error(`App ${id} not found`);
  }

  deleteApp(id) {
    this.customApps.delete(id);
    this.saveCustomApps();
  }

  getApp(id) {
    return this.customApps.get(id);
  }

  getAllApps() {
    return Array.from(this.customApps.values());
  }

  getAppCode(id) {
    const app = this.customApps.get(id);
    if (!app) throw new Error(`App ${id} not found`);
    return {
      html: app.html,
      css: app.css,
      js: app.js
    };
  }
}
