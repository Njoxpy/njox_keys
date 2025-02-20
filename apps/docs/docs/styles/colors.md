# 🎨 **Color Usage Cheat Sheet**  

| **Color**      | **Hex Code**  | **Where to Use** | **Tailwind Class** |
|---------------|--------------|------------------|----------------|
| **🖤 Text Color** | `#050315`  | - Main content text (headings, paragraphs) <br> - Labels, form input text <br> - Icons & navigation links (default) | `text-text` |
| **🎨 Background Light** | `#FBFBFE` | - Page background <br> - Section backgrounds <br> - Card backgrounds | `bg-bg` |
| **🔵 Primary (Action Color)** | `#2F27CE` | - Primary buttons (Call to Actions) <br> - Active navigation links <br> - Highlighted headings <br> - Form input borders (focus state) | `bg-primary`, `text-primary`, `border-primary` |
| **🟣 Secondary (Supporting UI)** | `#DEDcff` | - Secondary buttons <br> - Card backgrounds <br> - Tables & dividers <br> - Form field backgrounds | `bg-secondary`, `text-secondary` |
| **💜 Accent (Attention & Highlights)** | `#433BFF` | - Hover effects <br> - Links on hover <br> - Notification badges <br> - Active tab indicator | `text-accent`, `hover:text-accent`, `hover:bg-accent` |

---

## **📌 Best Practices & Examples**

### ✅ **Navbar**

- **Background:** `bg-bg`
- **Logo & Active Links:** `text-primary`
- **Navigation Links:** `text-text` → `hover:text-accent`
- **CTA Button:** `bg-primary hover:bg-accent text-white`

```jsx
<nav className="bg-bg shadow-md">
  <h1 className="text-primary font-bold">Brand</h1>
  <a className="text-text hover:text-accent">Services</a>
  <button className="bg-primary text-white hover:bg-accent px-4 py-2">Get Started</button>
</nav>
```

---

### ✅ **Hero Section (Landing Page)**

- **Background:** `bg-bg`
- **Title & Text:** `text-text`
- **CTA Button:** `bg-primary hover:bg-accent text-white`

```jsx
<section className="bg-bg text-center p-12">
  <h1 className="text-text text-4xl font-bold">Your Best Solution</h1>
  <p className="text-text text-lg">We help you achieve your goals.</p>
  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent">Get Started</button>
</section>
```

---

### ✅ **Cards & Sections**

- **Card Background:** `bg-secondary`
- **Title & Text:** `text-text`
- **CTA Button in Card:** `bg-primary hover:bg-accent`

```jsx
<div className="bg-secondary p-4 rounded-lg shadow-md">
  <h3 className="text-text font-semibold">Feature Title</h3>
  <p className="text-text">Brief description of the feature.</p>
  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent">Learn More</button>
</div>
```

---

### ✅ **Forms & Inputs**

- **Input Fields Background:** `bg-bg`
- **Borders (Default):** `border-secondary`
- **Borders (Focused State):** `border-primary`
- **Labels:** `text-text`
- **Submit Button:** `bg-primary hover:bg-accent`

```jsx
<label className="text-text">Email Address</label>
<input className="bg-bg border border-secondary focus:border-primary p-2 rounded-md" type="email" />
<button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent">Submit</button>
```

---

### ✅ **Tables & Lists**

- **Table Header Background:** `bg-secondary`
- **Table Row Alternating Backgrounds:** `bg-bg` & `bg-secondary`
- **Text & Borders:** `text-text`
- **Hover Effect:** `hover:bg-accent`

```jsx
<table className="w-full border-collapse">
  <thead className="bg-secondary text-text">
    <tr>
      <th className="p-2">Column 1</th>
      <th className="p-2">Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr className="bg-bg hover:bg-accent">
      <td className="p-2">Data 1</td>
      <td className="p-2">Data 2</td>
    </tr>
    <tr className="bg-secondary hover:bg-accent">
      <td className="p-2">Data 3</td>
      <td className="p-2">Data 4</td>
    </tr>
  </tbody>
</table>
```

```css
colors: {
 'text': '#050315',
 'background': '#fbfbfe',
 'primary': '#2f27ce',
 'secondary': '#dedcff',
 'accent': '#433bff',
},
```

---

## **🚀 Key Takeaways**

✔ **Use `primary` for high-priority actions like buttons & active links**  
✔ **Use `secondary` for supportive UI elements like cards & dividers**  
✔ **Use `accent` for hovers, highlights, and interactive elements**  
✔ **Use `bg` for backgrounds to maintain a clean, modern look**  
✔ **Use `text` for strong readability across the UI**  

---
