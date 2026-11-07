# ✦ Mark Clear Morata: Web Portfolio ✦
> *Keep Looking Above*

The personal web portfolio of **Mark Clear Morata**, a third-year BS Computer Science student (3CS4) at **City College of Calamba**.
It's my Final Project for Graphics: a multi-page static website showing my graphic design outputs, skills, certificate and contact details. The design follows my **"Starry Sky"** moodboard from the Prelim.

🔗 **Live site:** https://msmorata.github.io/CEEL_301_Portfolio/
🐙 **GitHub:** https://github.com/msmorata/CEEL_301_Portfolio

---

## 📄 Pages

| Page | File | What's on it |
|---|---|---|
| **Home** | `index.html` | Hero banner with photo and animated motto, stats strip, featured promo video (hover to play), featured work, links to the other pages |
| **About** | `about.html` | Bio, quick facts, profile photo, and **Promo Ads** (video + Brew Haven campaign) |
| **Skills** | `skills.html` | Graphic Design, Programming Languages, Databases, Git/GitHub, OS & Networking, plus a languages & tools row |
| **Portfolio** | `portfolio.html` | All Graphics output activities, with filter buttons and a pop-up viewer |
| **Certifications** | `certifications.html` | Cisco Networking Academy: *Operating Systems Basics* (Feb 27, 2026) |
| **Contact** | `contact.html` | Email, phone, GitHub, Facebook, Instagram, and a message form |

### Portfolio outputs
1. **Starry Sky · Brand Identity:** icon, vertical, horizontal and stacked logos, 2 badges
2. **Starry Sky · Moodboard** (Prelim)
3. **Brew Haven · Pumpkin Spice Latte Campaign:** social post, banner ad, newsletter header, landing page banner
4. **UNKNOWN Magazine · Vol. 01:** 4-page editorial layout
5. **Valk Haircut · Poster & Flyer**
6. **SYNTAX · Workshop Poster**

---

## 🎨 Design (Starry Sky moodboard)

| | |
|---|---|
| **Heading font** | Space Mono |
| **Body font** | Quicksand |
| **Colors** | `#EBC487` cream · `#DAA82F` gold · `#93ADCB` sky blue · `#050505` black |
| **Theme** | Night sky fading into a sunset, with twinkling stars and shooting stars |

### Animations & interactions
- Page fade-in and fade-out when switching pages
- Hero text slides up line by line, and the motto types itself out
- Twinkling starfield, random shooting stars, and stars that drift as you scroll
- Rotating ring and glow around the profile photo, with a floating logo
- Content reveals on scroll, and title underlines grow in
- Stats count up from zero
- Scroll progress bar and a 🚀 back-to-top button
- Hover effects: image shine, spinning tool icons, wiggling tile icons
- Pop-up viewer with arrows (← → keys) for image sets
- **Promo video:** starts with sound on hover, keeps playing after the mouse leaves, pauses when scrolled away and resumes when scrolled back, click to pause or resume
- Animations turn off automatically for visitors with "reduce motion" enabled

---

## 📁 File structure

```
portfolio_website/
├── index.html              ← Home
├── about.html              ← About + Promo Ads
├── skills.html             ← Skills + Languages & Tools
├── portfolio.html          ← Graphics outputs
├── certifications.html     ← Certificates
├── contact.html            ← Contact info + form
├── README.md               ← This guide
├── css/
│   └── style.css           ← 🎨 Colors, fonts, layout, animations
├── js/
│   ├── data.js             ← ✏️ ALL website content (edit this)
│   └── main.js             ← Builds the pages from data.js (no need to edit)
└── images/
    ├── logo-icon.png       ← Starry Sky icon (menu bar + browser tab)
    ├── logo-vertical.png   ← Starry Sky logo (Home banner)
    ├── profile/            ← about.jpg (portrait), me.jpg
    ├── outputs/            ← All graphics outputs
    ├── promo/              ← Morata_PromoAds.mp4 (promo video)
    └── certs/              ← cert1.jpg, cert2.jpg
```

---

## ✏️ How to edit the content

Almost everything is in **`js/data.js`**. You don't need to touch the HTML files.

| To change… | Edit in `js/data.js` |
|---|---|
| Name, role, motto, tagline, photo | `PROFILE` |
| About Me description | `PROFILE.bio` (one line per paragraph) |
| Email, phone, social links | `PROFILE.email`, `PROFILE.phone`, `PROFILE.socials` |
| Featured promo video (Home) | `PROMO_VIDEO` |
| Promo Ads (About) | `PROMO_ADS` |
| Skills | `SKILLS` |
| Languages & tools row | `TOOLS` |
| Portfolio outputs | `OUTPUTS` |
| Certificates | `CERTIFICATIONS` (an empty list `[ ]` hides the page from the menu) |

### Adding a new output
1. Upload the image to `images/outputs/` (lowercase name, no spaces, e.g. `new-poster.jpg`).
2. Add an entry to `OUTPUTS` in `js/data.js`:
```js
{ title: "My New Poster", category: "Poster", subject: "Graphics · Activity 7",
  description: "Short description of the output.",
  image: IMG + "new-poster.jpg",
  // optional:
  // featured: true,                                         → show on Home (max 3)
  // gallery: [IMG + "page1.jpg", IMG + "page2.jpg"],        → several images with arrows
  // contain: true,                                          → show the whole image (good for logos)
},
```

### Images from Google Drive
Instead of uploading, you can paste a Drive share link as `image:`. Set the file's sharing to **"Anyone with the link"**.

### Changing colors or fonts
Edit the `:root` block at the top of **`css/style.css`**.

---

## 🚀 Deploying on GitHub Pages

1. Sign in at https://github.com → **+ → New repository**
2. Name it **`msmorata.github.io`**, set it to **Public**, and click **Create repository**
3. Click **"uploading an existing file"** and drag in **everything inside** the `portfolio_website` folder. `index.html` must be at the top level, not inside a folder.
4. Click **Commit changes**
5. Go to **Settings → Pages**: Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)**, then **Save**
6. Wait 1–3 minutes, then open **https://msmorata.github.io**

### Updating the live site
- **Edit a file:** open it on GitHub → ✏️ pencil icon → make changes → **Commit changes**
- **Add images:** open the folder (e.g. `images/outputs`) → **Add file → Upload files**
- Changes go live in about 1 minute. Press **Ctrl + F5** to see them if the page looks unchanged.

---

## ⚠️ Notes & troubleshooting

| Problem | Fix |
|---|---|
| **Promo video shows "Watch on Google Drive"** | `images/promo/Morata_PromoAds.mp4` is missing. GitHub's browser upload only accepts files **up to 25 MB**, and the video is ~85 MB. Compress it below 25 MB, or upload it with GitHub Desktop / `git push` (limit 100 MB). |
| **Video starts muted** | Browsers block sound until the visitor clicks the page once. Sound turns on at the first click anywhere. |
| **An image doesn't show** | File names are **case-sensitive** (`Logo.JPG` ≠ `logo.jpg`). Check that the name in `data.js` matches exactly. |
| **Drive image doesn't show** | Set sharing to **"Anyone with the link"**. |
| **404 on the live site** | Make sure `index.html` is at the top level of the repository and Pages is set to **main / (root)**. |
| **Page looks unstyled** | The `css/` and `js/` folders must be uploaded with their files inside. |

---

## 🛠️ Built with
- **HTML5, CSS3, JavaScript** (no frameworks, no build step)
- **Google Fonts:** Space Mono, Quicksand
- **Font Awesome 6:** icons
- **GitHub Pages:** free hosting

---

## 📬 Contact
- **Email:** markclearmorata4@gmail.com
- **Phone:** +63 912 459 4300
- **GitHub:** [github.com/msmorata](https://github.com/msmorata)
- **Facebook:** [facebook.com/markmorata4](https://www.facebook.com/markmorata4)
- **Instagram:** [@mrkclrmrt4](https://www.instagram.com/mrkclrmrt4/)

---

© 2026 Mark Clear Morata · BS Computer Science 3CS4 · City College of Calamba
