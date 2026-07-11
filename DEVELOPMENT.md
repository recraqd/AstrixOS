# AstrixOS Development Guide

## Architecture Overview

AstrixOS is built with a modular architecture designed for easy extension and maintenance.

### Core Components

1. **BootManager** - Handles the startup sequence
2. **LockScreen** - Provides screen lock functionality
3. **LoginScreen** - Manages user authentication
4. **DesktopEnvironment** - Main application container
5. **WindowManager** - Handles window lifecycle and operations
6. **TaskbarManager** - Manages taskbar and start menu
7. **AppManager** - Loads and launches applications
8. **Services** - StorageService, ThemeService, NotificationService

### Design Patterns Used

- **Module Pattern** - Each component is a self-contained module
- **Service Pattern** - Shared functionality through services
- **Manager Pattern** - Centralized management of related entities
- **Factory Pattern** - Dynamic window and app creation

## Adding New Applications

### Step 1: Define App in apps.json

```json
{
  "id": "myapp",
  "name": "My App",
  "icon": "📱",
  "category": "Utilities",
  "description": "My awesome app"
}
```

### Step 2: Add App Handler in AppManager.js

```javascript
case 'myapp':
  this.loadMyApp(container);
  break;
```

### Step 3: Implement App Content

```javascript
loadMyApp(container) {
  container.innerHTML = `
    <div style="padding: 20px;">
      <h2>My App</h2>
      <p>App content here</p>
    </div>
  `;
}
```

## CSS Customization

All colors and sizing use CSS variables defined in `css/variables.css`:

```css
:root {
  --primary: #6366f1;        /* Main brand color */
  --secondary: #ec4899;      /* Secondary color */
  --success: #10b981;        /* Success state */
  --danger: #ef4444;         /* Error state */
  /* ... more variables */
}
```

## Event System

Windows and apps communicate through:
- Direct method calls
- Event listeners
- Local storage events
- Custom events (can be extended)

## Storage API

```javascript
// Store data
StorageService.setItem('key', value);

// Retrieve data
const value = StorageService.getItem('key');

// Remove data
StorageService.removeItem('key');
```

## Theme Management

```javascript
// Set theme
ThemeService.setTheme('light'); // or 'dark'

// Get current theme
const theme = ThemeService.getCurrentTheme();

// Toggle theme
ThemeService.toggleTheme();
```

## Notification API

```javascript
const notificationService = new NotificationService();

// Show notification
notificationService.show('Title', 'Message', 'info');

// Shortcuts
notificationService.success('Done', 'Operation successful');
notificationService.error('Error', 'Something went wrong');
notificationService.warning('Warning', 'Be careful');
```

## Debugging

Open browser DevTools (F12) to:
- View console for errors
- Inspect element structure
- Debug JavaScript
- View storage
- Monitor network requests

## Performance Tips

1. Minimize re-renders
2. Use event delegation
3. Lazy load app content
4. Optimize CSS selectors
5. Use requestAnimationFrame for animations

## Security Considerations

⚠️ **Important**: This is a demo application. In production:
- Implement proper authentication
- Validate all user input
- Use HTTPS
- Implement CSRF protection
- Sanitize HTML/JavaScript
- Use secure storage for sensitive data

## Testing

To test different scenarios:

1. **Boot sequence** - Fresh page load
2. **Lock screen** - Click to unlock
3. **Login** - Any username/password works
4. **Window operations** - Drag, resize, minimize, maximize, close
5. **Apps** - Launch each app from the start menu
6. **Notifications** - Check notification center
7. **Theme** - Toggle dark/light mode
8. **Storage** - Check localStorage in DevTools

## Troubleshooting

### Apps don't appear
- Check browser console for errors
- Verify apps.json is valid JSON
- Check AppManager.js switch case

### Windows won't drag
- Ensure WindowManager is initialized
- Check CSS z-index conflicts
- Verify mouse events are not prevented

### Theme not switching
- Clear localStorage and reload
- Check CSS variables are applied
- Verify ThemeService.init() is called

## Contributing

To extend AstrixOS:
1. Create new module in `js/modules/`
2. Follow existing code style
3. Add comprehensive comments
4. Test thoroughly
5. Update documentation

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Can I Use](https://caniuse.com/)

---

Happy coding! 🚀
