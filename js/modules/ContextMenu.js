// Context Menu Manager
export default class ContextMenu {
  constructor() {
    this.contextMenu = document.getElementById('context-menu');
    this.contextMenuItems = document.getElementById('context-menu-items');
  }

  show(x, y, items) {
    this.contextMenu.style.left = x + 'px';
    this.contextMenu.style.top = y + 'px';
    this.contextMenu.style.display = 'block';
    this.contextMenuItems.innerHTML = '';

    items.forEach(item => {
      if (item.separator) {
        const separator = document.createElement('div');
        separator.className = 'context-menu-item separator';
        this.contextMenuItems.appendChild(separator);
      } else {
        const itemEl = document.createElement('div');
        itemEl.className = 'context-menu-item';
        itemEl.textContent = item.label;
        itemEl.addEventListener('click', () => {
          item.action();
          this.hide();
        });
        this.contextMenuItems.appendChild(itemEl);
      }
    });

    document.addEventListener('click', () => this.hide(), { once: true });
  }

  hide() {
    this.contextMenu.style.display = 'none';
  }
}
