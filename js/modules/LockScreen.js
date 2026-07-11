// Lock Screen Manager
export default class LockScreen {
  constructor() {
    this.lockScreen = document.getElementById('lock-screen');
    this.lockTime = document.getElementById('lock-time');
    this.lockDate = document.getElementById('lock-date');
    this.setupClock();
  }

  setupClock() {
    const updateTime = () => {
      const now = new Date();
      this.lockTime.textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      this.lockDate.textContent = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  show() {
    return new Promise(resolve => {
      this.lockScreen.classList.add('active');

      const unlock = () => {
        this.lockScreen.classList.remove('active');
        document.removeEventListener('click', unlock);
        document.removeEventListener('keydown', unlock);
        resolve(true);
      };

      document.addEventListener('click', unlock);
      document.addEventListener('keydown', unlock);
    });
  }
}
