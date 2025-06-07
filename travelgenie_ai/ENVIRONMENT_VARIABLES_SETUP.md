# Setting Up Environment Variables in Your React Project

This guide covers how to securely store API keys and other secrets in environment variables for a React project (using Create React App), and how to access them in your components.

---

## 1. Create the `.env` file

- Go to the root of your React app folder (e.g., `travelgenie_ai/`).
- Create a file named `.env` (no filename, just `.env`).

Example command (from your terminal, inside `travelgenie_ai/`):

```bash
touch .env
```

---

## 2. Store API Keys with the Correct Prefix

- All environment variables you want available in React **must start with `REACT_APP_`**.
- Do **not** wrap the value in quotes unless the value itself contains spaces.

Example `.env` file content:

```
REACT_APP_OPENWEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY_HERE
REACT_APP_AI_API_KEY=YOUR_AI_API_KEY_HERE
```

Replace the above values with your actual API keys.

---

## 3. Access Environment Variables in Components

- You can use any variable defined with the `REACT_APP_` prefix in your JavaScript using:  
  `process.env.REACT_APP_YOUR_VARIABLE_NAME`

Example usage in a component (e.g., `WeatherPage.js`):

```js
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
```

All components/pages (e.g., `WeatherPage.js`, `ChatPage.js`, etc.) can import and use environment variables in this way.

---

## 4. Security Practices

- **Never commit `.env` files to your repository.**  
  They may contain sensitive API keys.

- By default, `.env` is typically already included in `.gitignore` by Create React App.  
  If not, manually add this line to your `.gitignore`:

```
.env
```

- For collaborators: share API keys securely (do not email or upload to public places).

- **Note:** Environment variables in React (Create React App) are embedded into the build and exposed to browser JS. Do NOT store secrets that must stay truly private (e.g., database passwords, as anyone can view them in your bundled app). Use only for keys appropriate for client-side use (like public API keys).

---

## 5. Using and Verifying

- Restart your server (`npm start`) after editing `.env` to load new values.
- Access the variable in any file (example):

```js
const myKey = process.env.REACT_APP_AI_API_KEY;
console.log("API key:", myKey);
```

- For verification, you can log the variable (temporarily!) or add checks (as done in `WeatherPage.js`):

```js
if (!apiKey) throw new Error("API key not set in .env");
```

---

### Summary

- Create `.env` in the project root.
- Use names like `REACT_APP_SOMETHING=...`.
- Access in code as `process.env.REACT_APP_SOMETHING`.
- Never commit `.env`—keep it in `.gitignore`.
- Restart dev server after changes.

You are now set up to securely use environment variables and API keys in your React app!
