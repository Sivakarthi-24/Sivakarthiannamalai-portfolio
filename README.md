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
├── .nojekyll                    # Preserve static-file serving on compatible hosts
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
  email: "sivakarthiannamalai@gmail.com",
  contactEndpoint: "",
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

## Contact Form Delivery

The contact form saves feedback in the visitor's browser by default; it does not send anything to Sivakarthi. To enable delivery, set `PORTFOLIO_DATA.profile.contactEndpoint` in `js/data.js` to an HTTPS endpoint that accepts a JSON `POST` with `name`, `email`, `subject`, and `message`, and returns a successful 2xx response. The endpoint must handle CORS for the deployed site. If the request fails, the form reports the failure and saves the message locally when browser storage is available. Do not put private API keys in `js/data.js`; keep them on the server.

## Build and Local Validation

This is a static site and has no `package.json` or npm build script. Check JavaScript syntax with:

```bash
node --check js/data.js
node --check js/main.js
```

Run locally with VS Code Live Server or `npx serve .`.

## Deployment to Vercel

The site is deployed as a static Vercel project at `https://sivakarthiannamalai-portfolio.vercel.app/`. Push the updated files to the connected GitHub branch to trigger Vercel's automatic deployment. From the repository root:

```bash
git add index.html css/style.css js/data.js js/main.js robots.txt sitemap.xml README.md
git commit -m "Improve portfolio responsiveness and contact form"
git push origin main
```

If your deployment branch is not `main`, replace `main` with the connected branch name.
