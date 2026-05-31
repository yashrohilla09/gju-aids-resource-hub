# 🎓 GJU B.Sc AI & DS Resource Hub

A state-of-the-art, visually stunning, and highly performant academic resources hub custom-engineered for **Guru Jambheshwar University of Science & Technology (GJU), Hisar**. This platform is designed specifically for students in the **B.Sc Artificial Intelligence & Data Science (AI & DS)** program, offering access to high-quality study materials, laboratory workbooks, and previous year examination papers.

Built with a premium **Dark Cyber/Glassmorphism theme** (with full seamless Light Theme support), this application runs 100% on the client-side using pure HTML5, vanilla CSS3, and ES6 JavaScript—meaning zero external dependencies, no database costs, and immediate out-of-the-box hosting.

---

## 🌟 Key Features

### 1. Unified Cyber-Dark & Light Theme
* Sleek default dark mode representing analytical computation, utilizing deep slate backgrounds (`#070a13`), glowing borders, and neon indicators.
* Clean, professional Light Mode utilizing curated light slate tones (`#f1f5f9`) and indigo elements.
* Toggleable instantly from the persistent navigation bar. Choices are stored dynamically in `localStorage` to persist across refreshes.

### 2. 6-Semester Curriculum Database & Mappings
Pre-mapped with exactly 5 core subjects per semester, providing a rich, curriculum-matched catalog of 30 distinct university courses:
* **Semester 1:** Programming in C, Mathematics-I, Statistics for Data Science, Digital Electronics, Communication Skills
* **Semester 2:** Python Programming, Mathematics-II, Probability and Statistics, Computer Organization, Environmental Studies
* **Semester 3:** Data Structures, Database Management System, Object Oriented Programming, Linear Algebra, Operating Systems
* **Semester 4:** Design and Analysis of Algorithms, Computer Networks, Data Mining, R Programming, Software Engineering
* **Semester 5:** Artificial Intelligence, Machine Learning, Big Data Analytics, Internet of Things, Data Visualization
* **Semester 6:** Deep Learning, Natural Language Processing, Cloud Computing, Information Security, Project Work

### 3. Comprehensive Analytics Dashboard
* **Syllabus Coverage Chart:** Programmatically counts and animates progress bars showing the number of files mapped to each of the 6 semesters.
* **Core Branch Breakdown:** Identifies and displays progress indicators for the 5 most heavily represented subjects.
* **Real-time Statistics Counters:** Animated metrics showing Cumulative Files, Lecture Handouts, Previous Papers, and Total Downloads incrementing dynamically on page load.
* **Popularity Tracking Tables:** Highlights the top 3 most downloaded lecture files and exam sheets with direct interactive click-to-view links.

### 4. Community Reviews & Star Ratings
* Interactive **1–5 Star Rating System** allowing students to score and rate documents directly in the reader modal.
* **Student Discussions Logs:** Dynamic submission form inside the viewer page that appends reviews with custom author names and stamps them in `localStorage`.
* **Home Page Fast Ranking:** Computes the highest-rated documents across the entire database and automatically displays the **Top 3 Featured Resources** on the landing page!

### 5. Advanced Upload Portal & PDF Integration
* Dashed glassmorphic **Drag & Drop Dropzone** with interactive hover states.
* Immediate **Live PDF Document Preview** utilizing sandboxed sandbox frames on file selection.
* File criteria verification validating that the file type is strictly **PDF** and that file size does not exceed **10 MB**.
* **Simulated progression loading bar** animating multi-stage steps ("Initializingsecure pipe...", "Validating details...", etc.) before writing metadata to local storage.

### 6. Dynamic Local Database & Management
* All assets persist permanently in the browser using the `localStorage` key `"gju_resource_hub_bsc_v2"`.
* Custom-uploaded items include interactive **Edit** (blue pen) and **Delete** (red trash) widgets.
* The Edit dialog dynamically syncs its subject list to display only subjects belonging to the newly selected semester.

---

## 📂 Project Folder Structure

```text
gju-resource-hub/
├── index.html            # Hub Landing Page (Stats, Hero search, Recent, Top-Rated, Quick Links)
├── notes.html            # Lecture Notes Explorer (Sidebar semester filters, search, grid)
├── papers.html           # PYQs Exam Papers Explorer (Sidebar filters, search, files grid)
├── upload.html           # Contribution Portal (Drag & Drop, size check, preview frame, progress bar)
├── dashboard.html        # Analytics Dashboard (Stats widgets, animations, stats tables, metrics charts)
├── css/
│   └── style.css         # Master Stylesheet (Variables, keyframes, transitions, modal layouts, light mode)
├── js/
│   └── script.js         # Unified ES6 App Handler (Curriculum map, LocalDB sync, modal, filters, analytics)
└── assets/
    └── pdf/              # Core PDF materials (contains yashsem2.pdf, yashsem3.pdf, yashsem4.pdf)
```

---

## 🚀 Local Execution & Verification

Since the repository is built using standard, modern HTML5, CSS3, and ES6 JavaScript, **no complex compilation or Node.js server is required!** You can run it instantly using your web browser.

### Option A: Direct Local Opening (Simplest)
1. Double-click [index.html](index.html) in your Windows File Explorer to open the home page in your default browser.
2. Everything (searching, filtering, uploading, viewing, local storage database) will run dynamically on the client-side!

### Option B: Local Development Server
If you want to run it on a local development server:
1. Open terminal inside `/gju-resource-hub/`.
2. Start a simple HTTP server:
   * With Python: `python -m http.server 8000`
   * With Node.js: `npx http-server -p 8000`
3. Navigate to `http://localhost:8000` in your web browser.

---

## 📦 Deployment Guide

GJU AI&DS Resource Hub is completely static, making it extremely fast, secure, and compatible with all major free hosting services.

### 1. GitHub Pages Deployment (Free Static Hosting)

To deploy the hub using **GitHub Pages** directly from a git repository:

1. Create a new public repository on GitHub named `gju-resource-hub`.
2. Open Git Bash / Terminal in the directory and run:
   ```bash
   git init
   git add .
   git commit -m "Initialize GJU Resource Hub v2"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gju-resource-hub.git
   git push -u origin main
   ```
3. Navigate to your repository page on GitHub.
4. Click on **Settings** (gear icon) -> **Pages** (under Code and automation sidebar).
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select **main** as the source branch and `/ (root)` as the folder, then click **Save**.
7. In 1–2 minutes, your website will be live at:
   `https://YOUR_USERNAME.github.io/gju-resource-hub/`

*Note: Since the site uses relative paths, all pages, resources, images, and links will map and function correctly on GitHub Pages out-of-the-box!*

### 2. Vercel Deployment (Zero-Config Direct Cloud Deployment)

To deploy the hub using **Vercel** for instant, global CDN delivery:

#### Method A: Direct Dashboard Connect (Recommended)
1. Commit and push your code to your GitHub repository (as described in the GitHub Pages steps).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **Add New** -> **Project**.
4. Import your `gju-resource-hub` repository.
5. Vercel will automatically detect that it is a static website. Leave the default settings (Build and Output settings blank).
6. Click **Deploy**. In under 30 seconds, your site will be live on a production-ready `.vercel.app` URL!

#### Method B: Vercel CLI (Immediate Shell Deploy)
1. Open PowerShell or Command Prompt inside `c:\Users\yashr\OneDrive\文件\gju-resource-hub\`.
2. Run `npm install -g vercel` (if Vercel CLI is not installed).
3. Run `vercel` inside the project folder.
4. Follow the prompt questions (default selections are recommended).
5. Run `vercel --prod` to deploy to live production.

---

## 🛠️ Verification & Test Suite

### 1. Theme Swap
* Toggle the Moon/Sun icon in the navigation bar. Check that the background flips between cyber-dark and professional slate-light, and check that a green success toast informs the user.

### 2. Analytics Dashboard
* Navigate to the **Analytics** page. Verify that all four stats values dynamically count upwards and the semester/subject bars slide from 0% to their target percentages.

### 3. Star Reviews & Discussions
* Open any document in the viewer modal (e.g. click "View PDF" on a card).
* Scroll to **Page 3 (Ratings & Reviews)**.
* Click 4 stars, write `"Excellent handout for final exam review!"` inside the text box, and click **Publish**.
* Check that the review list immediately appends the new entry and recalculates the average rating, updating the background grid cards in real time.
