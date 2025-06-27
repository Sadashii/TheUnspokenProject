# 🌌 The Unspoken Project

> A canvas of unspoken thoughts — freely expressed, anonymously preserved.

🔗 **Live Site:** [Here](https://sadashii.github.io/TheUnspokenProject/)

---

## 📖 About

**The Unspoken Project** is an interactive wall of anonymous messages — a version of [**The Unsent Project
**](https://theunsentproject.com), reimagined by me, beyond just love letters.

Where The Unsent Project collects unsent texts to past lovers, **The Unspoken Project** invites users to express *
*anything they've never been able to say** — from friendship, betrayal, and surrender to deep secrets and silent grief —
all anonymously.

Every note appears on an almost (infinite) canvas, linked with emotion-coded emojis, forming a universe of what was left
unspoken.

---

## 🚀 Tech Stack

- **Frontend:** React + Vite + Konva.js
- **Canvas Zoom:** react-zoom-pan-pinch
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Styling:** Raw CSS (custom themes)
- **Deployment:** GitHub Pages via GitHub Actions

---

## 🛠 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Sadashii/TheUnspokenProject.git
cd TheUnspokenProject

# Install dependencies
npm install

# Add your environment variables
touch .env
# Add:
# VITE_SUPABASE_URL=your-url
# VITE_SUPABASE_KEY=your-key

# Run locally
npm run dev

# Build for production
npm run build
