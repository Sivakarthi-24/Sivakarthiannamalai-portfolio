# Sivakarthi A — Personal Developer Portfolio

An accessible, responsive portfolio for **Sivakarthi A**, an Electronics and Communication Engineering (ECE) student at **Panimalar Engineering College, Chennai, India**. It presents a professional engineering profile with subtle, cinematic background animation.

## Key Features

- Professional profile layout with a profile photo and project, skills, and certificate sections.
- Subtle animated blue and gold background particles; no animation overlays on the profile or content.
- Dark/light theme toggle with preference saved to `localStorage`.
- Responsive layout, accessible navigation, keyboard-friendly project dialogs, and reduced-motion support.
- Lightweight vanilla HTML, CSS, and JavaScript.

---

## 📂 Project Directory Structure

```text
portfolio/
├── index.html                   # Main semantic HTML5 document
├── css/
│   └── style.css                # CSS variables, dark/light styles, and subtle animations
├── js/
│   ├── data.js                  # Centralized portfolio content
│   └── main.js                  # Canvas background, theme, navigation, and dialogs
├── assets/
│   ├── favicon.svg              # Crisp SVG developer favicon
│   ├── og-preview.svg           # Social media Open Graph preview banner
│   └── resume-placeholder.pdf  # Placeholder resume PDF
├── robots.txt                   # Crawler rules and sitemap location
├── sitemap.xml                  # Published page URL for search engines
├── .nojekyll                    # Serve static files as-is on GitHub Pages
└── README.md                    # Complete setup and deployment documentation
```

---

## 🚀 How to Run Locally

You can run this website locally in several ways:

### Option 1: Direct File Launch (Simplest)
Double-click `index.html` or right-click `index.html` and choose **Open with Google Chrome** / **Microsoft Edge** / **Firefox**.

### Option 2: VS Code "Live Server" Extension (Recommended)
1. Open the `portfolio` folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` in the file tree and click **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500`.

### Option 3: Using Node.js / `npx serve`
```bash
npx serve .
```

### Option 4: Using Python
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## ✏️ How to Personalize Your Content

All data is structured cleanly inside `js/data.js` so you don't have to touch complex HTML.
The profile photo currently loads from the portfolio's public GitHub repository.

### 1. Update Profile & Social Links
Open `js/data.js` and locate `PORTFOLIO_DATA.profile`:
```javascript
profile: {
  name: "Sivakarthi A",
  college: "Panimalar Engineering College, Chennai, India",
  github: "https://github.com/Sivakarthi-24",
  linkedin: "https://www.linkedin.com/in/sivakarthi-annamalai?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  email: "sivakarthiannmalai@gmail.com",
  photoPath: "https://raw.githubusercontent.com/Sivakarthi-24/Sivakarthiannamalai-portfolio/main/profile-photo.jpeg",
  studyStartYear: 2026,
  studyStartMonth: 6,
  studyDuration: 4,
  resumePath: "assets/resume-placeholder.pdf"
}
```

### 2. Replace the Resume PDF
1. Export your real resume as a PDF (e.g. `Sivakarthi_Resume.pdf`).
2. Copy the PDF into the `assets/` folder.
3. In `js/data.js`, update `resumePath: "assets/Sivakarthi_Resume.pdf"`.

---

## 🌐 Deployment to GitHub Pages

1. Push your changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Refine professional portfolio design"
   git push origin main
   ```
2. Navigate to your repository on GitHub.
3. Go to **Settings** -> **Pages**.
4. Under **Branch**, select `main` and root `/`.
5. Your portfolio will be live at `https://Sivakarthi-24.github.io/Sivakarthiannamalai-portfolio/`!
