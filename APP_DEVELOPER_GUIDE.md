# AstrixOS App Developer Guide

## 🚀 Getting Started with App Developer

The **App Developer** is a built-in IDE that lets you create, test, and publish custom applications right within AstrixOS. Apps you create are automatically saved to your browser's storage and persist across sessions.

## 📱 Launching App Developer

### Method 1: From Start Menu
1. Click the Start Menu (bottom-left corner)
2. Search for "App Developer" or scroll to find it
3. Click to launch

### Method 2: From Context Menu
1. Right-click on the desktop
2. Select "App Developer"

### Method 3: Keyboard Shortcut
Look for the 🛠️ icon in your app list or taskbar

## 🎨 Creating Your First App

### Step 1: Create a New App
1. Open App Developer
2. Click the "New App" button
3. Enter an app name (e.g., "My First App")
4. Choose an emoji icon that represents your app

### Step 2: Write Your App Code

The App Developer has three tabs for different code types:

#### HTML Tab
Write the structure and content of your app:
```html
<h1>Welcome to My App</h1>
<button onclick="greet()">Click Me!</button>
<p id="message"></p>
```

#### CSS Tab
Style your app's appearance:
```css
h1 {
  color: #6366f1;
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: #4f46e5;
}
```

#### JavaScript Tab
Add interactivity to your app:
```javascript
function greet() {
  const message = document.getElementById('message');
  message.textContent = 'Hello! Welcome to my app!';
}
```

## 💾 Saving Your App

1. After writing your code, click the **"Save App"** button
2. Your app is now stored in browser storage
3. You can edit your app anytime by selecting it from the app list

## 🧪 Testing Your App

### Test in Real-Time
1. Click the **"Test Preview"** button to see your app in action
2. A new window will open showing your app running
3. Test all functionality and interactions
4. Close the test window when done

### Debug Your App
1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for any JavaScript errors
4. Use `console.log()` in your code to debug

## 🌐 Publishing Your App

Once you're happy with your app:

1. Click the **"Publish to Desktop"** button
2. Your app will appear in:
   - The Start Menu
   - Your app launcher
   - Right-click context menu
3. Others can launch your app like any built-in app
4. Your app data persists in browser storage

## 📋 Example Apps

### Example 1: Simple Todo List

**HTML:**
```html
<div class="container">
  <h1>📝 Todo List</h1>
  <div class="input-group">
    <input type="text" id="todo-input" placeholder="Add a new task...">
    <button onclick="addTodo()">Add</button>
  </div>
  <ul id="todo-list"></ul>
</div>
```

**CSS:**
```css
.container {
  padding: 20px;
  max-width: 500px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

li {
  padding: 10px;
  margin-bottom: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**JavaScript:**
```javascript
let todos = JSON.parse(localStorage.getItem('app-todos') || '[]');

function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();
  
  if (text) {
    todos.push({ id: Date.now(), text });
    saveTodos();
    renderTodos();
    input.value = '';
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('app-todos', JSON.stringify(todos));
}

function renderTodos() {
  const list = document.getElementById('todo-list');
  list.innerHTML = todos.map(todo => `
    <li>
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    </li>
  `).join('');
}

// Render on load
renderTodos();
```

### Example 2: Simple Color Picker

**HTML:**
```html
<div class="container">
  <h1>🎨 Color Picker</h1>
  <input type="color" id="color-input" value="#6366f1" onchange="updateColor()">
  <p>Selected Color: <strong id="color-value">#6366f1</strong></p>
  <div id="color-preview"></div>
</div>
```

**CSS:**
```css
.container {
  padding: 30px;
  text-align: center;
}

input[type="color"] {
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

#color-preview {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

**JavaScript:**
```javascript
function updateColor() {
  const color = document.getElementById('color-input').value;
  document.getElementById('color-value').textContent = color;
  document.getElementById('color-preview').style.backgroundColor = color;
}

// Initialize
updateColor();
```

## 🔧 Advanced Features

### Using localStorage in Your Apps

Persist data between app sessions:

```javascript
// Save data
localStorage.setItem('my-app-data', JSON.stringify(myData));

// Load data
const myData = JSON.parse(localStorage.getItem('my-app-data') || '[]');
```

### Accessing App Context

Your JavaScript code has access to:
- `app.container` - The container element
- `app.windowManager` - Window management
- `app.appId` - Your app's ID
- `app.console` - Console logging

### Handling Events

```javascript
// Button click
document.getElementById('my-btn').addEventListener('click', function() {
  console.log('Button clicked!');
});

// Form submission
document.getElementById('my-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Handle form submission
});
```

## 📤 Sharing Your Apps

### Export App Data
1. Open App Developer
2. Select your app
3. Copy the HTML, CSS, and JS code
4. Share with others to recreate

### Backup Your Apps
```javascript
// In browser console:
const apps = JSON.parse(localStorage.getItem('customApps'));
console.log(JSON.stringify(apps, null, 2));
// Copy the output and save to a file
```

## ⚠️ Tips & Best Practices

### Do's ✅
- Test your app thoroughly before publishing
- Use meaningful variable names
- Add comments to explain complex code
- Keep apps focused on one purpose
- Use CSS variables for styling
- Handle edge cases and errors

### Don'ts ❌
- Don't use `eval()` unless necessary
- Don't hardcode large datasets
- Don't forget to save your work
- Don't load external scripts
- Avoid using `alert()` excessively

## 🐛 Troubleshooting

### App Won't Save
- Check browser storage quota
- Clear cache and try again
- Check browser console for errors

### App Not Appearing in Start Menu
- Make sure to click "Publish to Desktop"
- Refresh the page
- Check app name isn't empty

### JavaScript Errors
- Open DevTools (F12)
- Check Console tab for error messages
- Verify syntax is correct
- Test in the preview window first

### Styling Not Applied
- Check CSS syntax
- Verify selectors match HTML elements
- Use browser DevTools to inspect elements
- Check for CSS conflicts

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

## 🎓 Tutorial: Building a Weather App

### HTML
```html
<div class="weather-app">
  <h1>🌤️ Simple Weather</h1>
  <div class="input-group">
    <input type="text" id="city-input" placeholder="Enter city name">
    <button onclick="searchWeather()">Search</button>
  </div>
  <div id="weather-info"></div>
</div>
```

### CSS
```css
.weather-app {
  padding: 30px;
  max-width: 500px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.weather-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}
```

### JavaScript
```javascript
function searchWeather() {
  const city = document.getElementById('city-input').value;
  if (!city) return;
  
  // Note: This is a mock implementation
  const weatherData = {
    'New York': { temp: 72, condition: 'Sunny ☀️' },
    'London': { temp: 61, condition: 'Rainy 🌧️' },
    'Tokyo': { temp: 78, condition: 'Cloudy ☁️' }
  };
  
  const weather = weatherData[city];
  const info = document.getElementById('weather-info');
  
  if (weather) {
    info.innerHTML = `
      <div class="weather-card">
        <h2>${city}</h2>
        <p>Temperature: ${weather.temp}°F</p>
        <p>Condition: ${weather.condition}</p>
      </div>
    `;
  } else {
    info.innerHTML = '<p>City not found</p>';
  }
}
```

---

**Happy Coding!** 🎉 Create amazing apps with AstrixOS App Developer!
