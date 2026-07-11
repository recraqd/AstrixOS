// App Manager - Handles app loading and launching
export default class AppManager {
  constructor(windowManager) {
    this.windowManager = windowManager;
    this.apps = [];
    this.runningApps = new Map();
  }

  async loadApps() {
    try {
      const response = await fetch('system/apps.json');
      this.apps = await response.json();
    } catch (error) {
      console.error('Failed to load apps:', error);
      // Load default apps
      this.apps = this.getDefaultApps();
    }
  }

  getDefaultApps() {
    return [
      { id: 'files', name: 'Files', icon: '📁', category: 'System' },
      { id: 'browser', name: 'Browser', icon: '🌐', category: 'Internet' },
      { id: 'notes', name: 'Notes', icon: '📝', category: 'Productivity' },
      { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'Utilities' },
      { id: 'calendar', name: 'Calendar', icon: '📅', category: 'Utilities' },
      { id: 'settings', name: 'Settings', icon: '⚙️', category: 'System' }
    ];
  }

  launchApp(appId) {
    const app = this.apps.find(a => a.id === appId);
    if (!app) return;

    // Check if app is already running
    if (this.runningApps.has(appId)) {
      const window = this.runningApps.get(appId);
      window.el.classList.remove('minimized');
      this.windowManager.setActiveWindow(window.id);
      return;
    }

    // Create new window
    const windowObj = this.windowManager.createWindow({
      id: `window-${appId}`,
      title: app.name,
      icon: app.icon,
      width: '700px',
      height: '500px',
      x: Math.random() * 200 + 50,
      y: Math.random() * 200 + 50
    });

    this.runningApps.set(appId, windowObj);
    const body = this.windowManager.getWindowBody(windowObj.id);
    
    // Load app content based on type
    this.loadAppContent(appId, body);

    // Add to taskbar
    document.querySelector('.taskbar-manager')?.addTaskbarApp(appId, app.name, app.icon);
  }

  loadAppContent(appId, container) {
    switch (appId) {
      case 'calculator':
        this.loadCalculator(container);
        break;
      case 'notes':
        this.loadNotes(container);
        break;
      case 'calendar':
        this.loadCalendar(container);
        break;
      case 'settings':
        this.loadSettings(container);
        break;
      case 'browser':
        this.loadBrowser(container);
        break;
      case 'files':
        this.loadFileExplorer(container);
        break;
      default:
        container.innerHTML = `<div style="padding: 20px; text-align: center;"><h2>${appId}</h2><p>App content not found</p></div>`;
    }
  }

  loadCalculator(container) {
    container.innerHTML = `
      <style>
        .calculator { display: flex; flex-direction: column; height: 100%; }
        .display { background: var(--bg-secondary); padding: 20px; text-align: right; font-size: 24px; border-radius: 8px; margin-bottom: 10px; }
        .buttons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; flex: 1; }
        .btn { padding: 15px; background: var(--bg-tertiary); border: none; border-radius: 6px; color: var(--text); cursor: pointer; font-size: 16px; font-weight: 600; transition: all 0.2s; }
        .btn:hover { background: var(--primary); color: white; }
        .btn.operator { background: var(--primary); color: white; }
      </style>
      <div class="calculator">
        <div class="display" id="calc-display">0</div>
        <div class="buttons">
          <button class="btn" onclick="calcClear()">AC</button>
          <button class="btn" onclick="calcDelete()">⌫</button>
          <button class="btn operator" onclick="calcOp('/')">/</button>
          <button class="btn operator" onclick="calcOp('*')">×</button>
          <button class="btn" onclick="calcNum('7')">7</button>
          <button class="btn" onclick="calcNum('8')">8</button>
          <button class="btn" onclick="calcNum('9')">9</button>
          <button class="btn operator" onclick="calcOp('-')">−</button>
          <button class="btn" onclick="calcNum('4')">4</button>
          <button class="btn" onclick="calcNum('5')">5</button>
          <button class="btn" onclick="calcNum('6')">6</button>
          <button class="btn operator" onclick="calcOp('+')">+</button>
          <button class="btn" onclick="calcNum('1')">1</button>
          <button class="btn" onclick="calcNum('2')">2</button>
          <button class="btn" onclick="calcNum('3')">3</button>
          <button class="btn operator" onclick="calcEquals()">=</button>
          <button class="btn" onclick="calcNum('0')" style="grid-column: span 2;">0</button>
          <button class="btn" onclick="calcNum('.')">.</button>
        </div>
      </div>
    `;
    
    window.calcDisplay = '0';
    window.calcOperator = null;
    window.calcPrevValue = null;
    
    window.calcNum = (n) => {
      const display = document.getElementById('calc-display');
      if (window.calcDisplay === '0') window.calcDisplay = n;
      else window.calcDisplay += n;
      display.textContent = window.calcDisplay;
    };
    
    window.calcOp = (op) => {
      window.calcOperator = op;
      window.calcPrevValue = window.calcDisplay;
      window.calcDisplay = '0';
    };
    
    window.calcEquals = () => {
      const display = document.getElementById('calc-display');
      if (window.calcOperator && window.calcPrevValue) {
        const result = eval(`${window.calcPrevValue}${window.calcOperator}${window.calcDisplay}`);
        window.calcDisplay = String(result);
        display.textContent = window.calcDisplay;
        window.calcOperator = null;
      }
    };
    
    window.calcClear = () => {
      window.calcDisplay = '0';
      window.calcOperator = null;
      window.calcPrevValue = null;
      document.getElementById('calc-display').textContent = '0';
    };
    
    window.calcDelete = () => {
      if (window.calcDisplay.length > 1) {
        window.calcDisplay = window.calcDisplay.slice(0, -1);
      } else {
        window.calcDisplay = '0';
      }
      document.getElementById('calc-display').textContent = window.calcDisplay;
    };
  }

  loadNotes(container) {
    container.innerHTML = `
      <style>
        .notes { display: flex; flex-direction: column; height: 100%; }
        .notes-toolbar { display: flex; gap: 8px; padding: 10px; border-bottom: 1px solid var(--border); }
        .notes-toolbar button { padding: 8px 16px; background: var(--bg-tertiary); border: none; border-radius: 4px; color: var(--text); cursor: pointer; }
        .notes-editor { flex: 1; padding: 15px; }
        .notes-editor textarea { width: 100%; height: 100%; border: none; background: transparent; color: var(--text); resize: none; font-family: inherit; font-size: 14px; }
        .notes-editor textarea::placeholder { color: var(--text-secondary); }
      </style>
      <div class="notes">
        <div class="notes-toolbar">
          <button onclick="noteSave()">Save</button>
          <button onclick="noteNew()">New</button>
          <button onclick="noteDelete()">Delete</button>
        </div>
        <div class="notes-editor">
          <textarea id="notes-text" placeholder="Start typing..."></textarea>
        </div>
      </div>
    `;
    
    const notesText = localStorage.getItem('notes-content') || '';
    document.getElementById('notes-text').value = notesText;
    
    window.noteSave = () => {
      const content = document.getElementById('notes-text').value;
      localStorage.setItem('notes-content', content);
    };
    
    window.noteNew = () => {
      if (confirm('Create new note?')) {
        document.getElementById('notes-text').value = '';
      }
    };
    
    window.noteDelete = () => {
      if (confirm('Delete all notes?')) {
        document.getElementById('notes-text').value = '';
        localStorage.removeItem('notes-content');
      }
    };
  }

  loadCalendar(container) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    let html = `
      <style>
        .calendar { padding: 15px; }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; }
        .calendar-day { text-align: center; padding: 10px; background: var(--bg-secondary); border-radius: 4px; }
        .calendar-day.other { opacity: 0.5; }
        .calendar-day.today { background: var(--primary); color: white; font-weight: bold; }
      </style>
      <div class="calendar">
        <div class="calendar-header">
          <button onclick="calPrev()">←</button>
          <h2>${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <button onclick="calNext()">→</button>
        </div>
        <div class="calendar-grid">
    `;
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
      html += `<div class="calendar-day" style="font-weight: bold;">${day}</div>`;
    });
    
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-day other"></div>`;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === now.getDate() ? 'today' : '';
      html += `<div class="calendar-day ${isToday}">${day}</div>`;
    }
    
    html += `</div></div>`;
    container.innerHTML = html;
    
    window.calPrev = () => location.reload();
    window.calNext = () => location.reload();
  }

  loadSettings(container) {
    container.innerHTML = `
      <style>
        .settings { height: 100%; display: grid; grid-template-columns: 150px 1fr; }
        .settings-nav { border-right: 1px solid var(--border); padding: 10px; }
        .settings-nav button { width: 100%; padding: 10px; margin-bottom: 5px; background: transparent; border: none; border-left: 3px solid transparent; color: var(--text); cursor: pointer; text-align: left; }
        .settings-nav button.active { border-left-color: var(--primary); background: rgba(99, 102, 241, 0.1); color: var(--primary); }
        .settings-panel { padding: 20px; overflow-y: auto; }
      </style>
      <div class="settings">
        <div class="settings-nav">
          <button class="active" onclick="settingShow('general')">General</button>
          <button onclick="settingShow('display')">Display</button>
          <button onclick="settingShow('about')">About</button>
        </div>
        <div class="settings-panel" id="settings-content">
          <h2>Settings</h2>
        </div>
      </div>
    `;
    
    window.settingShow = (tab) => {
      const content = document.getElementById('settings-content');
      const buttons = document.querySelectorAll('.settings-nav button');
      buttons.forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      
      if (tab === 'general') {
        content.innerHTML = `<h2>General Settings</h2><p>System information and general preferences.</p>`;
      } else if (tab === 'display') {
        content.innerHTML = `<h2>Display Settings</h2><label><input type="checkbox" id="dark-toggle"> Dark Mode</label>`;
      } else if (tab === 'about') {
        content.innerHTML = `<h2>About AstrixOS</h2><p>AstrixOS v1.0.0</p><p>A browser-based operating system</p>`;
      }
    };
  }

  loadBrowser(container) {
    container.innerHTML = `
      <style>
        .browser { display: flex; flex-direction: column; height: 100%; }
        .browser-toolbar { display: flex; gap: 8px; padding: 10px; border-bottom: 1px solid var(--border); }
        .browser-toolbar input { flex: 1; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 4px; color: var(--text); }
        .browser-content { flex: 1; overflow-y: auto; padding: 15px; }
      </style>
      <div class="browser">
        <div class="browser-toolbar">
          <button onclick="browsGo()">Go</button>
          <input type="text" id="url-input" placeholder="Enter URL..." value="https://example.com">
        </div>
        <div class="browser-content">
          <h2>Welcome to AstrixOS Browser</h2>
          <p>This is a simplified browser view. In a production system, this would be an iframe or web view.</p>
        </div>
      </div>
    `;
    
    window.browsGo = () => {
      const url = document.getElementById('url-input').value;
      alert(`Would open: ${url}`);
    };
  }

  loadFileExplorer(container) {
    container.innerHTML = `
      <style>
        .file-explorer { display: flex; flex-direction: column; height: 100%; }
        .file-toolbar { display: flex; gap: 8px; padding: 10px; border-bottom: 1px solid var(--border); }
        .file-toolbar button { padding: 8px 16px; background: var(--bg-tertiary); border: none; border-radius: 4px; color: var(--text); cursor: pointer; }
        .file-content { flex: 1; overflow-y: auto; padding: 15px; }
        .file-item { padding: 10px; margin-bottom: 5px; background: var(--bg-secondary); border-radius: 4px; cursor: pointer; }
        .file-item:hover { background: rgba(99, 102, 241, 0.1); }
      </style>
      <div class="file-explorer">
        <div class="file-toolbar">
          <button>New Folder</button>
          <button>Upload</button>
        </div>
        <div class="file-content">
          <div class="file-item">📁 Documents</div>
          <div class="file-item">📁 Downloads</div>
          <div class="file-item">📁 Pictures</div>
          <div class="file-item">📁 Music</div>
          <div class="file-item">📁 Videos</div>
        </div>
      </div>
    `;
  }
}
