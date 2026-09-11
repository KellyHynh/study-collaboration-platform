# Study Collaboration Platform

## Fresh clone

Prerequisites: PostgreSQL, Node.js 20+, and a database named `knoverse_dev`.

1. Copy `backend/.env.example` to `backend/.env` and set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`.
2. Install dependencies:

```powershell
npm install --prefix backend
npm install --prefix frontend
```

3. Create the schema and load the reproducible demo dataset:

```powershell
npm --prefix backend run db:migrate
npm --prefix backend run db:seed
```

4. Start both applications in separate terminals:

```powershell
npm --prefix backend run dev
npm --prefix frontend run dev
```

Open `http://localhost:5173`.

To destroy and rebuild the local database:

```powershell
npm --prefix backend run db:reset
npm --prefix backend run db:migrate
npm --prefix backend run db:seed
```

`db:seed` is safe to rerun. It replaces only the stable demo courses and their cascading content, then upserts the demo users, enrollments, and progress.

## Demo data

The seed creates four users, six categories, four courses, ten chapters, seventeen ordered lessons, reading/video/quiz content, a local PDF attachment, a quiz image, nine enrollments, and realistic lesson progress.

The frontend's temporary signed-in account is:

`maya.nguyen@knoverse.local` / phone `0900000001`

Other demo accounts are `owen.carter@knoverse.local`, `linh.tran@knoverse.local`, and `sofia.alvarez@knoverse.local`. There is no authentication flow or password validation in the current application.

Stable course join codes are `DEMO-REACT`, `DEMO-DATA`, `DEMO-DSGN`, and `DEMO-TEAM`.

## Assets and limitations

Checked-in thumbnails, quiz art, and the PDF are served by the backend at `/demo-assets/*`. The video lesson uses the public MDN CC0 flower sample because the repository has no upload storage or checked-in video encoding workflow. Video playback therefore requires network access to that external URL. Ratings remain `0.0` because the current schema has no ratings table or rating API.