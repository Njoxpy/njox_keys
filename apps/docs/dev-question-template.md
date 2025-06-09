Let’s gooo 🚀—here’s a reusable Markdown template you can copy into Notion, VS Code, or GitHub Issues whenever you’re stuck:

---

### 🧩 DEV QUESTION TEMPLATE — BUG/ERROR

````md
## 🔍 TITLE / SUMMARY

<Short, specific title — what broke? e.g., "React can't load uploaded image from Express">

---

## 🧠 CONTEXT

- **Tech stack**: e.g., React (frontend), Node.js + Express (backend)
- **Project structure**: Are frontend and backend in same repo? Where is the uploads folder?
- **Base URLs**: e.g., frontend → http://localhost:3000, backend → http://localhost:5000

---

## 🐛 ERROR DETAILS / SYMPTOMS

- What’s breaking? Blank screen? Crash? 500 error?
- Console logs (frontend/backend)
- Browser network tab messages
- Screenshot or terminal logs (if relevant)

---

## ✅ EXPECTED BEHAVIOR

> What should happen instead?  
> e.g., “Uploaded image should display in React component.”

---

## 📂 RELEVANT CODE SNIPPETS

### 🔙 Backend

```js
// server.js
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"), {
    setHeaders: (res, path) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
```
````

### 🎨 Frontend

```jsx
<img src={`http://localhost:5000/uploads/${venue.images[0]}`} />
```

---

## 🔎 WHAT I’VE TRIED

- [x] Setup express.static with correct path
- [x] Checked file exists in `uploads/`
- [x] Checked browser Network tab + console
- [ ] Something else I tried...

---

## ❓ SPECIFIC QUESTION(S)

- Why am I getting this error?
- Is it a CORS/static path issue?
- What else should I check?

---

## 🧠 NOTES (optional)

Add any wild guesses, notes, or random clues you found while debugging.
