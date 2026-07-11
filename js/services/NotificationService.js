// Notification Service
export default class NotificationService {
  constructor() {
    this.container = document.getElementById('notification-toasts');
    this.notifications = [];
  }

  show(title, message, type = 'info', duration = 4000) {
    const id = `notification-${Date.now()}`;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.id = id;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || '•'}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="document.getElementById('${id}').remove()">×</button>
    `;

    this.container.appendChild(toast);
    this.notifications.push({ id, element: toast });

    if (duration > 0) {
      setTimeout(() => {
        if (document.getElementById(id)) {
          toast.classList.add('closing');
          setTimeout(() => toast.remove(), 300);
        }
      }, duration);
    }

    return id;
  }

  success(title, message) {
    return this.show(title, message, 'success');
  }

  error(title, message) {
    return this.show(title, message, 'error');
  }

  warning(title, message) {
    return this.show(title, message, 'warning');
  }

  info(title, message) {
    return this.show(title, message, 'info');
  }
}
