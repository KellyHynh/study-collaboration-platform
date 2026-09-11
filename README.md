# Study Collaboration Platform

KnoVerse is a React/Vite frontend and Express/PostgreSQL backend for browsing courses, studying reading and video lessons, taking quizzes, managing enrollments, and tracking lesson progress.

## Prerequisites

- Node.js 20 or newer
- PostgreSQL
- A PostgreSQL database named `knoverse_dev`

## Fresh clone setup

From the repository root, install dependencies for both applications:

```powershell
npm install --prefix backend
npm install --prefix frontend
```

Create the database if it does not already exist:

```powershell
psql -U postgres -c "CREATE DATABASE knoverse_dev;"
```

Copy `backend/.env.example` to `backend/.env` and set the PostgreSQL connection values:

```powershell
Copy-Item backend/.env.example backend/.env
```

The supported variables are `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`. The default database name is `knoverse_dev` and the default port is `5432`.

Run all SQL migrations, then load the reproducible demo data:

```powershell
npm --prefix backend run db:migrate
npm --prefix backend run db:seed
```

`db:seed` is safe to rerun. It replaces the seeded courses and their cascading content, then upserts the demo users, enrollments, and lesson progress.

To remove the current schema and rebuild it from scratch:

```powershell
npm --prefix backend run db:reset
npm --prefix backend run db:migrate
npm --prefix backend run db:seed
```

Start the backend and frontend in separate terminals:

```powershell
npm --prefix backend run dev
npm --prefix frontend run dev
```

The backend listens on `http://localhost:3000`; its health check is `http://localhost:3000/api/health`. The frontend is available at `http://localhost:5173` and proxies `/api` requests to the backend.

## Demo data

The seed creates 4 users, 6 categories, 8 courses, 10 chapters, 17 ordered lessons, 7 reading records, 5 video records, 4 quizzes, 7 quiz questions, 15 quiz options, 10 enrollments, and 9 lesson-progress records.

The four primary demo courses and join codes are:

- React Foundations: Build with Confidence (`DEMO-REACT`)
- Data Storytelling with SQL and Charts (`DEMO-DATA`)
- Design Systems for Product Teams (`DEMO-DSGN`)
- Reliable APIs: Contracts, Errors, and Observability (`DEMO-TEAM`)

The seed also includes Python for Practical Automation (`PYTHON-01`), Shipping Software with DevOps Habits (`DEVOPS-01`), Product Thinking for Technical Teams (`PRODUCT-01`), and English for Clear Technical Writing (`ENGLISH-01`).

The frontend has no login flow; its current-user constant is `KnoVerse CRUD Test`, `crud-test@knoverse.local`, phone `0900000001`, using the seeded user UUID for Maya Nguyen (`maya.nguyen@knoverse.local`). The other seeded accounts are Owen Carter (`owen.carter@knoverse.local`), Linh Tran (`linh.tran@knoverse.local`), and Sofia Alvarez (`sofia.alvarez@knoverse.local`).

## Assets and limitations

Checked-in demo assets are served by the backend at `/demo-assets/*`: course thumbnails (`knoverse-code.svg`, `knoverse-data.svg`, `knoverse-design.svg`), user avatars, `quiz-network.svg`, and `reading-notes.pdf`. Video lessons use the public MDN CC0 sample at `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4`, so video playback requires network access.

Authentication, password validation, file-upload storage, and ratings are not implemented. The schema has no ratings table or ratings API, and the application currently relies on the hardcoded demo user and seeded data.