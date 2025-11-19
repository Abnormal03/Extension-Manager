# Extension-Manager

A simple, client-side web application demonstrating how to load, display, change theme, filter, and manage a list of browser extensions stored in a local JSON file.

This project focuses on **pure JavaScript** for DOM manipulation, event handling, and data filtering, without relying on external libraries or frameworks.

## ✨ Features

- **Data Loading:** Fetches extension data (name, description, logo, status) from a local `data.json` file using the `fetch` API.
- **Dynamic Display:** Renders the list of extensions dynamically using JavaScript template literals.
- **Filtering:** Users can filter the displayed extensions by **Active**, **Inactive**, or **All** status.
- **Toggle Status:** Easily switch the active/inactive status of an extension using a custom toggle switch.
- **Removal:** Remove an extension from the displayed list and the internal JavaScript array after a user confirmation prompt.
- **Custom Event Handling:** Uses `document.dispatchEvent` and `document.addEventListener` for clean decoupling of the data loading and rendering logic.
- **Theme Toggle:** Switches the entire application between **Light Mode** and **Dark Mode**.

## 💻 Setup and Installation

To run this project locally, you only need a web browser that supports modern JavaScript (virtually all current browsers).

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Abnormal03
    cd Extension-Manager
    ```
2.  **Run Locally:**
    Since the project uses the `fetch` API to load a local JSON file (`data.json`), you must run it through a local web server (due to browser security restrictions on file access).
    - **Option A (Recommended):** Use the Live Server extension in VS Code.
    - **Option B:** Use a simple Python HTTP server:
      ```bash
      # For Python 3
      python -m http.server
      ```
3.  **Access:** Open your browser and navigate to `http://localhost:8000` (or the address provided by your server).

## 📁 Project Structure

The key files in this demonstration are:
├── index.html # The main structure and entry point.
├── style.css # Styling for the layout, components, and theme toggles.
├── script.js # The core JavaScript logic (provided above).
└── data.json # Mock data source containing the extension list.
└── assets/ # Directory for images (logos, theme icons).

## 🧠 Key Implementation Details

### 1. Data Loading and Event Signaling

The application ensures that the extensions are displayed **only after** the data is successfully fetched, preventing errors.

- The `fetch('data.json')` call populates the global `extensions` array.
- Once loaded, a custom event, **`extensionsLoaded`**, is dispatched:
  ```javascript
  document.dispatchEvent(new Event("extensionsLoaded"));
  ```
- The rendering function, `displayExtension(extensions)`, is triggered by listening for this event:
  ```javascript
  document.addEventListener("extensionsLoaded", () => {
    displayExtension(extensions);
  });
  ```

### 2. Event Delegation and Dynamic Listeners

Since extensions are rendered dynamically inside the `displayExtension` function, event listeners must be re-attached every time the list is refreshed (e.g., after filtering or initial load).

- The `displayExtension` function calls **`addEventListeners()`** at the end of its execution.
- The `addEventListeners` function uses `document.querySelectorAll` to find all current `.removeBtn` and toggle elements and attaches the necessary handlers (`removeExtension` and `toggle`).

### 3. Extension Removal Flow

The removal process uses a combination of DOM manipulation and data state management.

1.  **DOM Traversal:** `e.target.closest('.extension')` is used to find the parent extension container element from the clicked button.
2.  **Confirmation:** The native **`confirm()`** dialog is used to verify the user's intent.
3.  **DOM Removal:** If confirmed, `extensionElement.remove()` removes the visible card from the screen.
4.  **Data Update:** The global `extensions` array is updated using the `filter` method to ensure future filtering or re-renders reflect the change:
    ```javascript
    extensions = extensions.filter((ext) => ext.name !== nameToRemove);
    ```

### 4. Filtering Logic

The filter buttons (`BtnActive`, `BtnInActive`, `BtnAll`) work by creating a subset of the main `extensions` array and passing it to the rendering function.

```javascript
// Example for Active button
activeBtn.addEventListener('click', () => {
    const ext = extensions.filter(ext => ext.isActive === true);
    displayExtension(ext);
    // ... update button classes ...
});


🤝 Contributing
This is a demo project, but feel free to fork it, experiment, and suggest improvements!
```
