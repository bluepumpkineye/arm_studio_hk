# ARM Studio HK - Interior Design Studio Website

A premium, modern, and multilingual website for **ARM Studio HK**, a leading interior design studio based in Hong Kong specializing in residential design, commercial design, renovation, styling, and fit-out. 

The website showcases ARM Studio's portfolio, featured press/awards, client testimonials, and includes an interactive budget estimator for clients in Hong Kong.

---

## 🌟 Key Features

* **Multilingual Support (i18n):** Complete English (`en`) and Traditional Chinese (`zh`) language toggle and localization.
* **Featured Projects Showcase:** Clean grid/masonry display of design projects.
* **Before/After Component:** Interactive slider allowing clients to compare original spaces and completed designs.
* **Interactive Budget Estimator:** Real-time interior design cost estimator customized for Hong Kong properties.
* **Service Directory:** Dedicated pages detailing residential design, commercial/F&B design, construction management, and styling/procurement.
* **Studio Profile & Press:** Comprehensive background on the studio's ethos, awards (including the 2025 Home Journal Award), and media features.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
* **Database & ORM:** [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL (`pg` driver)
* **Icons & Animation:** Framer Motion-based animations and custom primitives.
* **Configuration:** TypeScript, ESLint.

---

## 📁 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router (pages, api, layouts)
│   ├── components/     # Reusable UI components (before/after, estimator, primitive elements)
│   ├── db/             # Database connection, schemas, and migrations
│   ├── lib/            # Helper functions, queries, site configuration, and i18n setup
│   └── middleware.ts   # Next.js Middleware (handles redirection/localization)
├── drizzle.config.json # Drizzle schema and migrations config
├── eslint.config.mjs   # ESLint configurations
├── next.config.ts      # Next.js options
├── package.json        # Node.js dependencies and run scripts
├── tsconfig.json       # TypeScript options
└── .gitignore          # Files excluded from git tracking
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18.x or later)
* PostgreSQL Database instance

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bluepumpkineye/arm_studio_hk.git
   cd arm-studio-website-strategy
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/arm_studio_db
   ```

4. **Run Database Migrations (Optional):**
   ```bash
   npx drizzle-kit push
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

6. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📄 License

This project is private and proprietary.
