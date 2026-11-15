# reimagined-octo-potato

NestJS 9 API (TypeScript, yarn), package name `potato-nest`, deployed on Vercel through
`vercel.json` (`@vercel/node` on `src/main.ts`). Owner: Swapnil (`swapnil-srivastava`).

Endpoints: `GET /` , `GET /helloworld`, `POST /helloworld/sendnestemail` and
`POST /email/sendnestemail` (send an email through Postmark from
`hello@swapnilsrivastava.eu`).

## Commands (yarn, never npm or pnpm here)

- `yarn install`, `yarn start:dev` (port 3000), `yarn build`, `yarn lint`, `yarn format`
- `yarn test` (unit, `*.spec.ts` beside the code), `yarn test:e2e` (`test/`)
- Needs `EMAIL_KEY` (Postmark server token) in `.env`; without it the app throws at
  start-up because `EmailService` checks it in its constructor.

## Layout

- `src/main.ts` bootstrap + CORS, `src/app.module.ts` wiring.
- `src/controller/<feature>/<feature>.controller.ts`, `src/services/<name>.service.ts`,
  `src/config/configuration.ts` (`registerAs('config', ...)`, read with
  `ConfigService.get('config.<key>')`).

## Things to know before changing anything

- **The email endpoints have no authentication.** Anyone who can reach the service can
  send any HTML email to any address from the site's sender. CORS does not protect a
  server endpoint. Do not link, advertise or build on these routes until they check a
  shared secret or a Supabase JWT; raise it with Swapnil when the service is touched.
- `EmailService` logs the full recipient, subject and body, does not await
  `sendEmail`, and the controller returns nothing, so failures are invisible. The
  website has a better pattern: `lib/server/mailer.ts` `sendMail()` in reimagined-guide.
- CORS allows only `https://swapnilsrivastava.eu`; the site's canonical host is
  `https://www.swapnilsrivastava.eu`, so browser calls from the real site are blocked.
- `app.listen(3000)` with the legacy `@vercel/node` build may not respond on Vercel,
  which expects an exported handler (inferred, not tested).
- Secrets live in Vercel env vars. Never commit `.env` or print the token.
- A Vercel project is connected to this repo; with Vercel's defaults a merge to `main` deploys to production and a PR gets a preview.

## How this fits with the website

The main project is the website, `swapnil-srivastava/reimagined-guide`
(swapnilsrivastava.eu, Next.js + Supabase on Vercel). Its real email (orders, booking,
newsletter) goes through its own `sendMail()` helper, not this service. One leftover
caller exists: `callNestSendEmail` in the website's `services/email.service.ts`, used
by `pages/coverimage`, posts to `https://api.swapnilsrivastava.eu/helloworld/sendnestemail`.
Check that caller before renaming or protecting the route, and change both repos
together. The agreed way to wire a backend in is a Next.js rewrite on the website with
the backend URL in an env var (`/svc/nest/...`), so the browser never calls this
service directly and CORS is not needed.


For step-by-step work use the `nest-api` skill in `.claude/skills/`.
