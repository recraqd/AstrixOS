// Theme Service - Handles theme switching
export default class ThemeService {
  static async init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
  }

  static setTheme(theme) {
    document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    localStorage.setItem('theme', theme);
  }

  static toggleTheme() {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  static getCurrentTheme() {
    return document.body.classList.contains('light-mode') ? 'light' : 'dark';
  }
}
