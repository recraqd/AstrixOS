# AstrixOS

A complete, browser-based operating system built with HTML5, CSS3, and JavaScript.

## Features

- **Boot Screen** - Animated startup sequence
- **Lock Screen** - Secure access with time/date display
- **Login System** - User authentication
- **Desktop Environment** - Full-featured desktop with taskbar
- **Window Manager** - Draggable, resizable windows
- **Application System** - Built-in apps including:
  - Calculator
  - Notes Editor
  - Calendar
  - File Explorer
  - Web Browser
  - Settings
- **Theme System** - Dark/Light mode support
- **Notification Center** - Toast notifications and notification center
- **Context Menus** - Right-click menus throughout the system
- **Storage** - LocalStorage and IndexedDB support

## Getting Started

1. Open `index.html` in a modern web browser
2. Log in with any username and password
3. Explore the desktop and apps

## Project Structure

```
AstrixOS/
├── index.html                 # Main entry point
├── css/
│   ├── variables.css         # Design tokens and CSS variables
│   ├── base.css              # Base styles and typography
│   ├── boot.css              # Boot screen styles
│   ├── lock.css              # Lock screen styles
│   ├── login.css             # Login screen styles
│   ├── desktop.css           # Desktop environment styles
│   ├── taskbar.css           # Taskbar and start menu styles
│   ├── window.css            # Window manager styles
│   ├── notifications.css     # Notification styles
│   ├── settings.css          # Settings panel styles
│   └── context-menu.css      # Context menu styles
├── js/
│   ├── main.js               # Application entry point
│   ├── modules/
│   │   ├── BootManager.js    # Boot sequence manager
│   │   ├── LockScreen.js     # Lock screen handler
│   │   ├── LoginScreen.js    # Login handler
│   │   ├── DesktopEnvironment.js  # Main desktop
│   │   ├── WindowManager.js  # Window management system
│   │   ├── TaskbarManager.js # Taskbar management
│   │   ├── AppManager.js     # Application loader and launcher
│   │   └── ContextMenu.js    # Context menu handler
│   └── services/
│       ├── StorageService.js     # Data persistence
│       ├── ThemeService.js       # Theme management
│       └── NotificationService.js # Notification system
├── system/
│   └── apps.json             # Application manifest
└── README.md                 # This file
```

## Built-in Applications

### Calculator
A fully functional calculator with basic arithmetic operations.

### Notes
A simple text editor for taking and saving notes locally.

### Calendar
A calendar view showing the current month with date navigation.

### File Manager
Browse system folders and manage files (simulated).

### Browser
A simplified web browser interface.

### Settings
Access system preferences and configurations.

## Keyboard Shortcuts

- `Click` - Unlock lock screen
- `Enter` - Search from taskbar
- `Click + Drag` - Move windows
- `Drag Corner` - Resize windows
- `Right Click` - Open context menu

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and Grid/Flexbox
- **JavaScript ES6+** - Modular architecture with classes and modules
- **LocalStorage** - Browser data persistence
- **IndexedDB** - Advanced data storage (when available)

## Features Implemented

✅ Boot animation with progress bar
✅ Lock screen with time/date
✅ Login authentication system
✅ Draggable windows with title bars
✅ Window resizing
✅ Window minimization/maximization
✅ Taskbar with app launcher
✅ Start menu
✅ Notification system
✅ Theme switching (Dark/Light)
✅ Calculator app
✅ Notes app with auto-save
✅ Calendar app
✅ File explorer
✅ Settings panel
✅ Context menus
✅ Responsive design

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Future Enhancements

- [ ] Multiple user accounts
- [ ] File system simulation
- [ ] More built-in applications
- [ ] System sounds and effects
- [ ] Screensaver
- [ ] Desktop widgets
- [ ] App installation system
- [ ] System-wide shortcuts
- [ ] Desktop customization options
- [ ] Multi-monitor support

## License

MIT License - Feel free to use this project for learning and development.

## Credits

Created as a demonstration of modern web technologies and UI/UX principles.
