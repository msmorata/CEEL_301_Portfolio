/* =====================================================================
   ✏️  data.js: EDIT YOUR PORTFOLIO CONTENT HERE
   All the website's text, images, skills and outputs come from this file.

   IMAGES: put files in /images and write the path, e.g. "images/outputs/logo.jpg"
           (case-sensitive, no spaces), or paste a Google Drive share link.
   GALLERY: give an item  gallery: [ "img1.jpg", "img2.jpg" ]  to show
            several images (with arrows) when the card is clicked.
   VIDEO:   video: "Google Drive link"  (sharing = Anyone with the link)
   ===================================================================== */

const IMG = "images/outputs/";

/* ---------------- PROFILE ---------------- */
const PROFILE = {
  brand: "MARK CLEAR",
  logo: "images/logo-icon.png",                 // Starry Sky icon
  logoFull: "images/logo-vertical.png",
  firstName: "Mark Clear",
  lastName: "Morata",
  role: "BS Computer Science · 3CS4",
  motto: "Keep Looking Above",
  tagline: "A Computer Science student who designs brands, ads and layouts, and codes in Python, Java, C/C++, PHP and Dart.",
  photo: "images/profile/about.jpg",
  aboutPhoto: "images/profile/about.jpg",                               // About page photo, e.g. "images/profile/about.jpg" (uses photo above if empty)
  email: "markclearmorata4@gmail.com",
  phone: "+63 912 459 4300",                                    // optional

  quote: "I'm the mysterious type around strangers, but once we hit a topic we both enjoy, I become a talkative person.",
  bio: [
    "Third-year Computer Science student at City College of Calamba with a strong interest in version control and collaborative development workflows. Enthusiastic about leveraging <strong>Git</strong> and <strong>GitHub</strong> to manage project history, streamline team collaboration, and maintain clean, traceable codebases.",
    "Currently working on a capstone project in Taglish sentiment analysis, where Git's branching and commit history have been essential to tracking iterative changes and collaborating with teammates.",
    "Beyond coursework, I enjoy experimenting with Git workflows, from feature branches and pull requests to resolving merge conflicts, as a way to build habits that scale with real-world software development.",
    "Completed the <strong>Operating Systems Basics</strong> course on Cisco Networking Academy, earning a certificate in OS fundamentals including Windows, Linux, and mobile operating systems, OS security, and system configuration.",
  ],

  facts: [
    { icon: "fa-solid fa-graduation-cap", text: "BS Computer Science · 3CS4" },
    { icon: "fa-solid fa-school",         text: "City College of Calamba" },
    { icon: "fa-solid fa-location-dot",   text: "Calamba City, Laguna" },
    { icon: "fa-solid fa-envelope",       text: "markclearmorata4@gmail.com" },
    { icon: "fa-solid fa-phone",          text: "+63 912 459 4300" },
    { icon: "fa-solid fa-gamepad",        text: "Games · Anime · Manga · Gym · Karaoke" },
  ],

  // Paste your links in url. Anything left as "" stays hidden.
  socials: [
    { icon: "fa-brands fa-github",      label: "GitHub",    handle: "github.com/msmorata", url: "https://github.com/msmorata" },
    { icon: "fa-brands fa-facebook-f",  label: "Facebook",  handle: "facebook.com/markmorata4", url: "https://www.facebook.com/markmorata4" },
    { icon: "fa-brands fa-linkedin-in", label: "LinkedIn",  handle: "LinkedIn",  url: "" },
    { icon: "fa-brands fa-instagram",   label: "Instagram", handle: "@mrkclrmrt4", url: "https://www.instagram.com/mrkclrmrt4/" },
  ],
};

/* ---------------- FEATURED PROMO VIDEO (Home page) ----------------
   Put the video file in  images/promo/  and write its name below.
   It plays (muted) when the mouse hovers over it, or on tap on phones.
   If the file is missing, a "Watch on Google Drive" button is shown instead. */
const PROMO_VIDEO = {
  title: "Morata · Promo Ad",
  description: "My promotional video ad: hover to start it (with sound), click to pause, and use the speaker button to mute.",
  src: "images/promo/Morata_PromoAds.mp4",
  drive: "https://drive.google.com/file/d/1p7894rfem2FeMw_LeKtVmGt8Aa3LzNch/view",
};

/* ---------------- PROMO ADS (About page) ---------------- */
const PROMO_ADS = [
  { title: "Promo Video", category: "Video Ad", subject: "Promotional Video",
    description: "Click to play my promo video.",
    video: "https://drive.google.com/file/d/1p7894rfem2FeMw_LeKtVmGt8Aa3LzNch/view" },
  { title: "Brew Haven · Banner Ad", category: "Print / Digital Ad", subject: "Pumpkin Spice Latte Campaign",
    description: "\"Meet Your New Cozy Cup\": a bold banner ad launching Brew Haven's new Pumpkin Spice Latte.",
    image: IMG + "banner-ad.jpg" },
  { title: "Brew Haven · Newsletter Header", category: "Email Marketing", subject: "Pumpkin Spice Latte Campaign",
    description: "\"A Little Warmth for Rainy Days\": a header for the café's email newsletter.",
    image: IMG + "newsletter-header.jpg" },
  { title: "Brew Haven · Landing Page Banner", category: "Web Banner", subject: "Pumpkin Spice Latte Campaign",
    description: "\"Your Rainy-Day Comfort Cup\": a wide hero banner for the café's website.",
    image: IMG + "landing-page-banner.jpg" },
];

/* ---------------- SKILLS ---------------- */
const SKILLS = [
  { group: "Graphic Design", icon: "fa-solid fa-palette", items:
      ["Logo & Brand Identity", "Moodboards", "Posters & Flyers", "Ad Campaigns", "Social Media Graphics", "Editorial / Magazine Layout", "Typography", "Color Palettes"] },
  { group: "Programming Languages", icon: "fa-solid fa-code", items:
      ["Python", "Java", "C", "C++", "PHP", "Dart"] },
  { group: "Databases", icon: "fa-solid fa-database", items:
      ["MySQL", "PostgreSQL"] },
  { group: "Tools & Version Control", icon: "fa-brands fa-github", items:
      ["Git", "GitHub", "GitHub Pages"] },
  { group: "Operating Systems & Networking", icon: "fa-solid fa-network-wired", items:
      ["Windows Administration", "Linux Shell", "Basic Linux Security", "Mobile OS & Network Setup"] },
];

/* ---------------- TOOLS / LANGUAGES (logo row) ---------------- */
const TOOLS = [
  { name: "Python",     icon: "fa-brands fa-python" },
  { name: "Java",       icon: "fa-brands fa-java" },
  { name: "C",          short: "C" },
  { name: "C++",        short: "C++" },
  { name: "PHP",        icon: "fa-brands fa-php" },
  { name: "Dart",       short: "Dt" },
  { name: "MySQL",      icon: "fa-solid fa-database" },
  { name: "PostgreSQL", short: "Pg" },
  { name: "GitHub",     icon: "fa-brands fa-github" },
  // Add the design software you used, e.g.:
  // { name: "Canva", short: "C" },  { name: "Photoshop", short: "Ps" },
];

/* ---------------- PORTFOLIO OUTPUTS ----------------
   featured: true → shown on the Home page (max 3)
   contain: true  → show the whole image in the card (good for logos) */
const OUTPUTS = [
  { title: "Starry Sky · Brand Identity", category: "Branding", subject: "Graphics · Logo Design",
    description: "My personal brand \"Starry Sky\": an icon, vertical, horizontal and stacked logos, plus two badge versions, all in the Starry Sky palette.",
    image: IMG + "alllogos.jpg", contain: true, featured: true,
    gallery: ["alllogos", "verticallogo", "horizontallogo", "stackedlogo", "icon", "badge1", "badge2"].map(n => IMG + n + ".jpg") },

  { title: "Starry Sky · Moodboard", category: "Moodboard", subject: "Graphics · Prelim",
    description: "The moodboard behind this whole website: the tagline \"Keep Looking Above\", Space Mono + Quicksand, and a cream, gold, sky blue and black palette.",
    image: IMG + "moodboard-starry-sky.jpg" },

  { title: "Brew Haven · Pumpkin Spice Latte Campaign", category: "Ad Campaign", subject: "Graphics · Promo Ads",
    description: "A cozy autumn ad set for a café's new Pumpkin Spice Latte: banner ad, social media post, newsletter header and landing page banner.",
    image: IMG + "social-media-post.jpg", featured: true,
    gallery: ["social-media-post", "banner-ad", "newsletter-header", "landing-page-banner"].map(n => IMG + n + ".jpg") },

  { title: "UNKNOWN Magazine · Vol. 01", category: "Editorial", subject: "Graphics · Magazine Layout",
    description: "A 4-page personal magazine that introduces me: cover, About Me, My Goals and My Interests.",
    image: IMG + "unknown-magazine-p1.jpg", featured: true,
    gallery: [1, 2, 3, 4].map(n => IMG + `unknown-magazine-p${n}.jpg`) },

  { title: "Valk Haircut · Poster & Flyer", category: "Poster", subject: "Graphics · Poster & Flyer Design",
    description: "A matching print set for a local barbershop: a sleek dark promo poster (10% off for the first 10 customers) and an A4 flyer introducing the shop near Brgy. 5, Calamba Bayan, and its home-service offer.",
    image: IMG + "poster-valk-haircut.jpg",
    gallery: [IMG + "poster-valk-haircut.jpg", IMG + "flyer-valk-haircut.jpg"] },

  { title: "SYNTAX · Workshop Poster", category: "Poster", subject: "Graphics · Event Poster",
    description: "A clean, tech-themed event poster for an enterprise IT & cloud workshop on PostgreSQL optimization and secure API development.",
    image: IMG + "syntax-workshop.jpg" },
];

/* ---------------- CERTIFICATIONS ----------------
   Empty list = the Certifications page is hidden from the menu.
   Example: { title: "NC II ...", issuer: "TESDA", date: "2026", image: "images/certs/nc2.jpg" } */
const CERTIFICATIONS = [
  { title: "Operating Systems Basics", category: "Cisco Networking Academy", issuer: "Cisco Networking Academy", date: "February 27, 2026",
    description: "Course completion and student-level credential. Covers Windows architecture and admin tools, the Linux shell and basic Linux security, and network and email setup on mobile devices.",
    image: "images/certs/cert2.jpg", contain: true,
    gallery: ["images/certs/cert2.jpg", "images/certs/cert1.jpg"] },
];
