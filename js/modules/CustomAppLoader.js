// Custom App Loader - Loads and runs custom apps created by users
export default class CustomAppLoader {
  constructor(appDevKit) {
    this.appDevKit = appDevKit;
  }

  loadCustomApps() {
    const customApps = this.appDevKit.getAllApps();
    const systemApps = JSON.parse(localStorage.getItem('systemApps') || '[]');
    
    return customApps.map(app => ({
      id: app.id,
      name: app.name,
      icon: app.icon,
      category: app.category,
      custom: true,
      data: app
    }));
  }

  runApp(appId, container, windowManager) {
    const app = this.appDevKit.getApp(appId);
    if (!app) throw new Error(`Custom app ${appId} not found`);

    try {
      // Set HTML content
      container.innerHTML = app.html;
      
      // Apply CSS
      if (app.css) {
        const style = document.createElement('style');
        style.textContent = app.css;
        container.appendChild(style);
      }
      
      // Execute JavaScript in app context
      if (app.js) {
        const appContext = {
          container,
          windowManager,
          appId,
          console: window.console
        };
        
        try {
          const func = new Function('app', app.js);
          func(appContext);
        } catch (e) {
          console.error(`Error running app ${appId}:`, e);
          container.innerHTML += `<div style="color: red; padding: 10px; margin-top: 10px; border: 1px solid red; border-radius: 4px;"><strong>Error:</strong> ${e.message}</div>`;
        }
      }
    } catch (e) {
      console.error(`Error loading app ${appId}:`, e);
      container.innerHTML = `<div style="color: red; padding: 20px;"><strong>Failed to load app:</strong> ${e.message}</div>`;
    }
  }
}
