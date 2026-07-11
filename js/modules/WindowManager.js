// Window Manager - Handles window operations
export default class WindowManager {
  constructor() {
    this.windows = new Map();
    this.windowsContainer = document.getElementById('windows-container');
    this.zIndex = 100;
    this.activeWindow = null;
  }

  createWindow(config) {
    const windowId = config.id || `window-${Date.now()}`;
    const windowEl = document.createElement('div');
    windowEl.className = 'window opening';
    windowEl.id = windowId;
    windowEl.style.left = config.x || '50px';
    windowEl.style.top = config.y || '50px';
    windowEl.style.width = config.width || '600px';
    windowEl.style.height = config.height || '400px';
    windowEl.style.zIndex = this.zIndex++;

    windowEl.innerHTML = `
      <div class="window-header">
        <div class="window-title">
          <div class="window-icon">${config.icon || '📄'}</div>
          <div class="window-title-text">${config.title || 'Window'}</div>
        </div>
        <div class="window-controls">
          <button class="window-control-btn minimize" title="Minimize">_</button>
          <button class="window-control-btn maximize" title="Maximize">□</button>
          <button class="window-control-btn close" title="Close">✕</button>
        </div>
      </div>
      <div class="window-content">
        <div class="window-body" id="${windowId}-body"></div>
      </div>
      <div class="window-resize"></div>
    `;

    this.windowsContainer.appendChild(windowEl);
    const windowObj = {
      id: windowId,
      el: windowEl,
      config,
      isDragging: false,
      isResizing: false
    };

    this.setupWindowEvents(windowObj);
    this.windows.set(windowId, windowObj);
    this.setActiveWindow(windowId);

    return windowObj;
  }

  setupWindowEvents(windowObj) {
    const header = windowObj.el.querySelector('.window-header');
    const closeBtn = windowObj.el.querySelector('.window-control-btn.close');
    const minimizeBtn = windowObj.el.querySelector('.window-control-btn.minimize');
    const maximizeBtn = windowObj.el.querySelector('.window-control-btn.maximize');
    const resizeHandle = windowObj.el.querySelector('.window-resize');

    // Focus window
    windowObj.el.addEventListener('mousedown', () => this.setActiveWindow(windowObj.id));

    // Drag window
    header.addEventListener('mousedown', (e) => this.startDrag(windowObj, e));

    // Close
    closeBtn.addEventListener('click', () => this.closeWindow(windowObj.id));

    // Minimize
    minimizeBtn.addEventListener('click', () => this.minimizeWindow(windowObj.id));

    // Maximize
    maximizeBtn.addEventListener('click', () => this.toggleMaximize(windowObj.id));

    // Resize
    resizeHandle.addEventListener('mousedown', (e) => this.startResize(windowObj, e));
  }

  startDrag(windowObj, e) {
    if (e.target.closest('.window-control-btn')) return;
    
    windowObj.isDragging = true;
    const rect = windowObj.el.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    const onMouseMove = (e) => {
      windowObj.el.style.left = (e.clientX - startX) + 'px';
      windowObj.el.style.top = (e.clientY - startY) + 'px';
    };

    const onMouseUp = () => {
      windowObj.isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  startResize(windowObj, e) {
    windowObj.isResizing = true;
    const rect = windowObj.el.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      
      if (newWidth > 300) windowObj.el.style.width = newWidth + 'px';
      if (newHeight > 200) windowObj.el.style.height = newHeight + 'px';
    };

    const onMouseUp = () => {
      windowObj.isResizing = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  closeWindow(windowId) {
    const windowObj = this.windows.get(windowId);
    if (windowObj) {
      windowObj.el.classList.remove('opening');
      windowObj.el.classList.add('closing');
      setTimeout(() => {
        windowObj.el.remove();
        this.windows.delete(windowId);
      }, 300);
    }
  }

  minimizeWindow(windowId) {
    const windowObj = this.windows.get(windowId);
    if (windowObj) {
      windowObj.el.classList.toggle('minimized');
    }
  }

  toggleMaximize(windowId) {
    const windowObj = this.windows.get(windowId);
    if (windowObj) {
      const isMaximized = windowObj.el.hasAttribute('data-maximized');
      if (isMaximized) {
        windowObj.el.removeAttribute('data-maximized');
        windowObj.el.style.left = windowObj.config.x || '50px';
        windowObj.el.style.top = windowObj.config.y || '50px';
        windowObj.el.style.width = windowObj.config.width || '600px';
        windowObj.el.style.height = windowObj.config.height || '400px';
      } else {
        windowObj.el.setAttribute('data-maximized', 'true');
        windowObj.el.style.left = '0';
        windowObj.el.style.top = '0';
        windowObj.el.style.width = '100%';
        windowObj.el.style.height = 'calc(100% - 60px)';
      }
    }
  }

  setActiveWindow(windowId) {
    if (this.activeWindow) {
      const prevWindow = this.windows.get(this.activeWindow);
      if (prevWindow) prevWindow.el.classList.remove('focused');
    }
    const windowObj = this.windows.get(windowId);
    if (windowObj) {
      windowObj.el.classList.add('focused');
      windowObj.el.style.zIndex = this.zIndex++;
      this.activeWindow = windowId;
    }
  }

  getWindowBody(windowId) {
    return document.getElementById(`${windowId}-body`);
  }
}
