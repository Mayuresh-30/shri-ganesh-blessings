# Deployment Runbook

This project is sized for a small, short-lived event. Use one Render backend service, one Render static frontend site, and a managed MySQL database.

## 1. Create the database

Create an empty MySQL database, then run `backend/schema.sql` against that database. The `user_id` unique key prevents one browser session from receiving multiple blessings.

Keep regular provider backups enabled during the event. Before launch, insert a test blessing and verify that a second request with the same `user_id` returns HTTP 409.

## 2. Deploy the backend on Render

Create a Web Service from this repository with:

- Root directory: repository root (leave Render's root directory blank)
- Build command: `npm ci --omit=dev`
- Start command: `npm run server`
- Health check path: `/health`

Set these Render environment variables:

- `DB_HOST`: managed MySQL host
- `DB_USER`: database user
- `DB_PASSWORD`: database password
- `DB_NAME`: database name
- `DB_PORT`: usually `3306`
- `PORT`: use the port supplied by Render, or leave it to Render
- `CLIENT_ORIGIN`: exact frontend URL, for example `https://your-site.onrender.com`

The backend loads `.env` locally, but production values must be entered in Render's environment settings. Never commit the real `.env` file.

Use `/health` for the Render liveness check. Use `/ready` when you need to confirm that the backend can reach MySQL. `/health` intentionally does not require the database so Render can distinguish a running process from database readiness.

## 3. Deploy the frontend on Render

Create a Static Site from this repository with:

- Root directory: repository root (leave Render's root directory blank)
- Build command: `npm ci && npm run build`
- Publish directory: `frontend/dist`

Set this environment variable before building:

- `VITE_API_URL`: `https://your-api-service.onrender.com`

Add a rewrite from `/*` to `/index.html` with status `200`. This is required when refreshing `/ganesh` or `/blessings` directly.

After the frontend URL is known, update the backend `CLIENT_ORIGIN` to that exact URL and redeploy the backend if necessary.

## 4. Local configuration

Copy the example files and replace placeholders with local values:

- `backend/.env.example` -> `backend/.env`
- `frontend/.env.example` -> `frontend/.env`

For local development, leave `VITE_API_URL` empty. Vite then uses its `/api` proxy to `http://localhost:3000`.

## 5. Smoke test before sharing the site

1. Open the production frontend on a phone and desktop browser.
2. Enter a name and navigate to the Ganesh page.
3. Offer all flowers and submit a wish.
4. Confirm a blessing appears and a row exists in MySQL.
5. Submit again in the same browser and confirm the existing blessing is shown.
6. Open `/health` and `/ready` on the backend URL.
7. Refresh `/ganesh` and `/blessings` directly.
8. Test the WhatsApp share button and background audio behavior.

## 6. Restarting the backend

In Render, open the backend Web Service, choose **Manual Deploy**, then **Deploy latest commit**. For a simple restart without a new commit, use the service's **Restart** action if available in the Render dashboard. Render also restarts the service automatically after a crash or health failure.

The backend handles `SIGTERM` and closes the MySQL pool before exiting, so Render can replace instances cleanly.

## 7. Backups and restore

Use the managed MySQL provider's backup/export feature. Before the event, perform one restore to a separate test database and verify that the table and rows are present.

A generic command-line export is:

```text
mysqldump -h HOST -u USER -p DATABASE > backup.sql
```

A generic restore is:

```text
mysql -h HOST -u USER -p DATABASE < backup.sql
```

Do not put the password in either command. Enter it when prompted or use your provider's secure backup restore workflow.

## 8. Monitoring during the event

For this audience size, check these a few times per day:

- Frontend opens successfully.
- Backend `/health` returns `{ "status": "ok" }`.
- Backend `/ready` returns `{ "status": "ready" }`.
- Render logs show no repeated database errors.
- Database row count increases when users complete the flow.

Keep the previous frontend deployment available so you can roll back from Render if a new deployment breaks the flow.
