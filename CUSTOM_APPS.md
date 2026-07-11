# AstrixOS Custom Apps System

## Overview

AstrixOS includes a powerful custom app system that allows users to create, save, and run applications entirely within the browser. Apps are:

- **Persistent** - Saved to localStorage, survive browser restarts
- **Sandboxed** - Run safely without accessing system files
- **Easy to Create** - Simple HTML, CSS, and JavaScript
- **Launchable** - Accessible from Start Menu and desktop

## How It Works

### App Storage

Custom apps are stored in browser's `localStorage` under the key `customApps`:

```javascript
// Access stored apps
const apps = JSON.parse(localStorage.getItem('customApps') || '[]');
```

Each app object contains:

```javascript
{
  id: "unique-app-id",
  name: "App Name",
  icon: "📱",
  category: "Custom",
  description: "What this app does",
  html: "<h1>HTML Content</h1>",
  css: "h1 { color: blue; }",
  js: "console.log('Hello');" ,
  createdAt: "2026-07-11T15:00:00.000Z",
  updatedAt: "2026-07-11T15:30:00.000Z"
}
```

### App Lifecycle

1. **Creation** - User clicks "New App" in App Developer
2. **Development** - User writes HTML, CSS, JavaScript
3. **Testing** - User clicks "Test Preview" to see app in action
4. **Saving** - User clicks "Save App" to persist to localStorage
5. **Publishing** - User clicks "Publish to Desktop" to add to menu
6. **Running** - User launches app from Start Menu or desktop
7. **Execution** - App runs in isolated container window

## AppDevKit API

The `AppDevKit` service manages app storage:

### Create App

```javascript
const app = appDevKit.createApp({
  name: 'My App',
  icon: '📱',
  category: 'Custom',
  description: 'My custom application',
  html: '<h1>Hello</h1>',
  css: 'h1 { color: blue; }',
  js: 'console.log("App loaded");'
});
```

### Update App

```javascript
appDevKit.updateApp(appId, {
  name: 'Updated Name',
  html: '<h1>Updated Content</h1>',
  css: 'h1 { color: red; }'
});
```

### Get App

```javascript
const app = appDevKit.getApp(appId);
console.log(app.name, app.icon);
```

### Get All Apps

```javascript
const allApps = appDevKit.getAllApps();
console.log(`You have ${allApps.length} custom apps`);
```

### Delete App

```javascript
appDevKit.deleteApp(appId);
```

## CustomAppLoader API

The `CustomAppLoader` service runs apps:

### Load Custom Apps

```javascript
const customApps = customAppLoader.loadCustomApps();
// Returns array of app metadata
```

### Run App

```javascript
customAppLoader.runApp(appId, containerElement, windowManager);
// Executes app code in the container
```

## App Development Details

### HTML Structure

Your app's HTML will be inserted into a window container:

```html
<!-- Your HTML -->
<div class="my-app">
  <h1>My App</h1>
  <p id="output">Output will appear here</p>
</div>
```

### CSS Scoping

Styles are applied to the container, so use class/id selectors to avoid conflicts:

```css
/* Good - specific selectors */
.my-app h1 { color: blue; }
.my-app button { padding: 10px; }

/* Avoid - global selectors */
h1 { color: blue; } /* Might conflict */
button { padding: 10px; } /* Might conflict */
```

### JavaScript Execution Context

Your JavaScript runs in a function scope:

```javascript
// This will work:
const myVar = 'Hello';
console.log(myVar);

// DOM access works:
const element = document.getElementById('output');
element.textContent = 'Result';

// localStorage works:
localStorage.setItem('my-key', 'my-value');
```

### Using APIs

You can use standard Web APIs:

```javascript
// Fetch API
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => console.log(data));

// SetTimeout
setTimeout(() => {
  console.log('Delayed execution');
}, 1000);

// Local Storage
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');

// Event Listeners
document.addEventListener('click', () => {
  console.log('Clicked');
});
```

## Security Considerations

### Sandboxing

Apps run in isolated DOM containers and cannot:
- Access other apps' data (in different containers)
- Access system files
- Make unrestricted network requests (subject to CORS)
- Access browser APIs outside Web APIs

### Best Practices

1. **Validate Input** - Check user input before using
2. **Escape HTML** - Be careful with `innerHTML`
3. **Use textContent** - For displaying user data
4. **Handle Errors** - Wrap code in try/catch
5. **Check Permissions** - Ask user before accessing data

### Example: Safe User Input

```javascript
// ❌ Don't do this (XSS vulnerability)
const userInput = "<img src=x onerror='alert(1)'>";
document.getElementById('output').innerHTML = userInput;

// ✅ Do this instead
const userInput = "Hello World";
document.getElementById('output').textContent = userInput;

// Or sanitize if you need HTML
const userInput = "<b>Hello</b>";
const temp = document.createElement('div');
temp.innerHTML = userInput;
const safeHTML = temp.innerHTML; // Sanitized
```

## Integration with AstrixOS

### App Discovery

When you publish an app, it's added to system apps:

```javascript
const systemApps = JSON.parse(localStorage.getItem('systemApps') || '[]');
// App is added with custom: true flag
```

### App Launching

AppManager integrates custom apps:

```javascript
appManager.launchCustomApp(app, appId);
// Creates window and runs app via CustomAppLoader
```

### App Lifecycle in System

1. App listed in Start Menu
2. User clicks app
3. AppManager calls `launchCustomApp()`
4. Window is created
5. CustomAppLoader.runApp() executes app code
6. User interacts with app
7. User closes window

## Storage Limits

Browser localStorage has limits:

- **Chrome/Firefox**: ~10MB per domain
- **Safari**: ~5MB per domain
- **Edge**: ~10MB per domain

Keep apps lean to avoid quota issues.

## Backup & Restore

### Backup

```javascript
// Get all apps
const backup = localStorage.getItem('customApps');
// Save to file or cloud storage
console.save(backup, 'astrix-apps-backup.json');
```

### Restore

```javascript
// Load from backup
const backupData = JSON.parse(fileContent);
localStorage.setItem('customApps', JSON.stringify(backupData));
// Reload AstrixOS
location.reload();
```

## Examples

### Example 1: Simple Counter

```html
<div style="text-align: center; padding: 20px;">
  <h1>Counter</h1>
  <p id="count" style="font-size: 48px; margin: 20px 0;">0</p>
  <button onclick="increment()">+</button>
  <button onclick="decrement()">-</button>
  <button onclick="reset()">Reset</button>
</div>
```

```css
button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 18px;
  cursor: pointer;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background: #4f46e5;
}
```

```javascript
let count = parseInt(localStorage.getItem('counter') || '0');

function update() {
  document.getElementById('count').textContent = count;
  localStorage.setItem('counter', count);
}

function increment() {
  count++;
  update();
}

function decrement() {
  count--;
  update();
}

function reset() {
  count = 0;
  update();
}

update();
```

### Example 2: Random Quote Generator

```html
<div style="padding: 30px; text-align: center;">
  <h1>Quote Generator</h1>
  <blockquote id="quote" style="font-size: 18px; font-style: italic; margin: 20px 0;">
    Click the button for a quote
  </blockquote>
  <button onclick="generateQuote()">Generate Quote</button>
</div>
```

```css
blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 20px;
}

button {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
```

```javascript
const quotes = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Life is what happens when you're busy making other plans.",
  "The future belongs to those who believe in the beauty of their dreams."
];

function generateQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  document.getElementById('quote').textContent = quotes[random];
}

generateQuote();
```

---

**Ready to build amazing apps? Open App Developer and start creating!** 🚀
