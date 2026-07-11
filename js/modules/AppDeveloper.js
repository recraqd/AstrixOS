// App Developer - IDE for creating apps within AstrixOS
import AppDevKit from '../services/AppDevKit.js';

export default class AppDeveloper {
  constructor(windowManager, taskbarManager) {
    this.windowManager = windowManager;
    this.taskbarManager = taskbarManager;
    this.appDevKit = new AppDevKit();
    this.currentApp = null;
  }

  launch() {
    const windowObj = this.windowManager.createWindow({
      id: 'app-developer',
      title: 'App Developer',
      icon: '🛠️',
      width: '1000px',
      height: '700px',
      x: 50,
      y: 50
    });

    const body = this.windowManager.getWindowBody(windowObj.id);
    this.renderDeveloper(body);
  }

  renderDeveloper(container) {
    container.innerHTML = `
      <style>
        .dev-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 10px;
        }
        .dev-toolbar {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: var(--bg-secondary);
          border-radius: 6px;
          flex-wrap: wrap;
        }
        .dev-toolbar button {
          padding: 8px 16px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .dev-toolbar button:hover {
          background: var(--primary-dark);
        }
        .dev-toolbar input {
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--text);
          flex: 1;
          min-width: 200px;
        }
        .dev-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          flex: 1;
          overflow: hidden;
        }
        .dev-panel {
          display: flex;
          flex-direction: column;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          overflow: hidden;
        }
        .dev-panel-header {
          padding: 10px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border);
          font-weight: 600;
        }
        .dev-panel-content {
          flex: 1;
          overflow: auto;
          padding: 10px;
        }
        .editor-tabs {
          display: flex;
          gap: 5px;
          padding: 10px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }
        .tab {
          padding: 8px 16px;
          background: var(--bg-tertiary);
          border: none;
          border-radius: 4px 4px 0 0;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab.active {
          background: var(--primary);
          color: white;
        }
        .editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        textarea {
          flex: 1;
          background: #0f172a;
          color: #f1f5f9;
          border: none;
          padding: 10px;
          font-family: 'Monaco', monospace;
          font-size: 12px;
          resize: none;
        }
        .preview {
          flex: 1;
          overflow: auto;
          background: white;
          color: black;
          padding: 10px;
        }
        .app-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .app-item {
          padding: 10px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .app-item:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--primary);
        }
        .app-item.active {
          background: rgba(99, 102, 241, 0.3);
          border-color: var(--primary);
        }
        .app-item-info {
          flex: 1;
        }
        .app-item-name {
          font-weight: 600;
          color: var(--text);
        }
        .app-item-desc {
          font-size: 12px;
          color: var(--text-secondary);
        }
        .app-item-actions {
          display: flex;
          gap: 5px;
        }
        .app-item-actions button {
          padding: 4px 8px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 11px;
        }
        .split-view {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          flex: 1;
          overflow: hidden;
        }
      </style>
      <div class="dev-container">
        <div class="dev-toolbar">
          <input type="text" id="app-name" placeholder="App name..." value="My App">
          <input type="text" id="app-icon" placeholder="Icon emoji" value="📦" style="max-width: 80px;">
          <button onclick="devNew()">New App</button>
          <button onclick="devSave()">Save App</button>
          <button onclick="devTest()">Test Preview</button>
          <button onclick="devPublish()">Publish to Desktop</button>
          <button onclick="devDelete()">Delete</button>
        </div>
        <div class="dev-content">
          <div class="dev-panel">
            <div class="dev-panel-header">📱 My Apps</div>
            <div class="dev-panel-content">
              <div class="app-list" id="app-list"></div>
            </div>
          </div>
          <div class="dev-panel">
            <div class="editor-tabs">
              <button class="tab active" onclick="devSelectTab('html')">HTML</button>
              <button class="tab" onclick="devSelectTab('css')">CSS</button>
              <button class="tab" onclick="devSelectTab('js')">JavaScript</button>
            </div>
            <div class="editor">
              <textarea id="html-editor" placeholder="&lt;!-- Write your HTML here --&gt;"></textarea>
              <textarea id="css-editor" style="display:none;" placeholder="/* Write your CSS here */"></textarea>
              <textarea id="js-editor" style="display:none;" placeholder="// Write your JavaScript here"></textarea>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderAppList();
    this.setupEditorEvents();
  }

  renderAppList() {
    const list = document.getElementById('app-list');
    const apps = this.appDevKit.getAllApps();
    
    if (apps.length === 0) {
      list.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No apps yet. Click "New App" to start!</p>';
      return;
    }

    list.innerHTML = apps.map(app => `
      <div class="app-item ${this.currentApp?.id === app.id ? 'active' : ''}" onclick="devSelectApp('${app.id}')">
        <div class="app-item-info">
          <div class="app-item-name">${app.icon} ${app.name}</div>
          <div class="app-item-desc">${app.description || 'No description'}</div>
        </div>
        <div class="app-item-actions">
          <button onclick="event.stopPropagation(); devTestApp('${app.id}')">Test</button>
          <button onclick="event.stopPropagation(); devDeleteApp('${app.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  setupEditorEvents() {
    window.devSelectTab = (tab) => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('textarea').forEach(t => t.style.display = 'none');
      
      event.target.classList.add('active');
      document.getElementById(`${tab}-editor`).style.display = 'block';
    };

    window.devNew = () => {
      const app = this.appDevKit.createApp({
        name: 'New App',
        icon: '📦',
        html: '<h1>Welcome</h1>\n<p>Edit this app in the developer!</p>',
        css: 'h1 { color: #6366f1; }',
        js: 'console.log("App loaded");'
      });
      this.currentApp = app;
      this.renderAppList();
      this.loadAppToEditor(app);
    };

    window.devSave = () => {
      if (!this.currentApp) {
        alert('Please create or select an app first');
        return;
      }
      
      this.appDevKit.updateApp(this.currentApp.id, {
        name: document.getElementById('app-name').value,
        icon: document.getElementById('app-icon').value,
        html: document.getElementById('html-editor').value,
        css: document.getElementById('css-editor').value,
        js: document.getElementById('js-editor').value
      });
      
      this.currentApp = this.appDevKit.getApp(this.currentApp.id);
      this.renderAppList();
      alert('App saved successfully!');
    };

    window.devTest = () => {
      if (!this.currentApp) return;
      this.testApp(this.currentApp.id);
    };

    window.devTestApp = (appId) => {
      this.testApp(appId);
    };

    window.devPublish = () => {
      if (!this.currentApp) {
        alert('Please create or select an app first');
        return;
      }
      
      // Add to system apps
      const systemApps = JSON.parse(localStorage.getItem('systemApps') || '[]');
      const appData = this.appDevKit.getApp(this.currentApp.id);
      
      if (!systemApps.find(a => a.id === appData.id)) {
        systemApps.push({
          id: appData.id,
          name: appData.name,
          icon: appData.icon,
          category: appData.category,
          custom: true
        });
        localStorage.setItem('systemApps', JSON.stringify(systemApps));
      }
      
      alert(`"${appData.name}" has been published to your desktop!`);
    };

    window.devDelete = () => {
      if (!this.currentApp) {
        alert('Please select an app first');
        return;
      }
      
      if (confirm(`Delete "${this.currentApp.name}"?`)) {
        this.appDevKit.deleteApp(this.currentApp.id);
        this.currentApp = null;
        this.renderAppList();
        document.getElementById('html-editor').value = '';
      }
    };

    window.devDeleteApp = (appId) => {
      const app = this.appDevKit.getApp(appId);
      if (confirm(`Delete "${app.name}"?`)) {
        this.appDevKit.deleteApp(appId);
        if (this.currentApp?.id === appId) {
          this.currentApp = null;
        }
        this.renderAppList();
      }
    };

    window.devSelectApp = (appId) => {
      this.currentApp = this.appDevKit.getApp(appId);
      this.loadAppToEditor(this.currentApp);
      this.renderAppList();
    };
  }

  loadAppToEditor(app) {
    document.getElementById('app-name').value = app.name;
    document.getElementById('app-icon').value = app.icon;
    document.getElementById('html-editor').value = app.html;
    document.getElementById('css-editor').value = app.css;
    document.getElementById('js-editor').value = app.js;
  }

  testApp(appId) {
    const app = this.appDevKit.getApp(appId);
    const windowObj = this.windowManager.createWindow({
      id: `test-${appId}-${Date.now()}`,
      title: `Test: ${app.name}`,
      icon: app.icon,
      width: '600px',
      height: '500px',
      x: Math.random() * 300 + 100,
      y: Math.random() * 300 + 100
    });

    const body = this.windowManager.getWindowBody(windowObj.id);
    
    try {
      body.innerHTML = app.html;
      
      if (app.css) {
        const style = document.createElement('style');
        style.textContent = app.css;
        body.appendChild(style);
      }
      
      if (app.js) {
        try {
          const func = new Function(app.js);
          func();
        } catch (e) {
          body.innerHTML += `<p style="color: red; padding: 10px;">Error: ${e.message}</p>`;
        }
      }
    } catch (e) {
      body.innerHTML = `<p style="color: red; padding: 10px;">Error: ${e.message}</p>`;
    }
  }
}
