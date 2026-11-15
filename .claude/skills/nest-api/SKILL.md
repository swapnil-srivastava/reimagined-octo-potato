---
name: nest-api
description: Use when adding or changing endpoints, services, configuration, email sending, CORS, tests or the Vercel setup in this NestJS API (reimagined-octo-potato). Covers module wiring, auth for anything that sends email, testing and what merging to main deploys.
---

# Working on the NestJS API

Read `CLAUDE.md` first for the known problems (unauthenticated email routes, CORS
host, Vercel entry point).

## Adding an endpoint

1. Controller in `src/controller/<feature>/<feature>.controller.ts`, logic in
   `src/services/<name>.service.ts`, both registered in `src/app.module.ts`
   (`controllers` / `providers`). Move to a feature module once a feature has more
   than one controller or service.
2. Request bodies are DTO classes with `class-validator` and a global
   `ValidationPipe({ whitelist: true })` (add `class-validator` and
   `class-transformer` when first needed) instead of loose `@Body('field')` strings.
3. Return a value or throw an `HttpException`; `await` async work so errors reach
   the client. Use the Nest `Logger`, never `console.log`, and never log email
   bodies, addresses or tokens.
4. Handlers for `OPTIONS` are unnecessary: `enableCors` in `main.ts` answers preflight.

## Anything that sends email or costs money

- Must be authenticated before it ships: a guard that checks a shared secret header
  (`timingSafeEqual` against an env var) for server-to-server calls, or a Supabase
  JWT for browser calls. Ask Swapnil which one; do not ship it open.
- Add a rate limit (`@nestjs/throttler`).
- The caller must not choose the sender, and HTML from callers is not trusted:
  prefer named templates filled in on the server.
- Postmark calls go through `EmailService` only, awaited, returning success/failure.

## Configuration

New settings: add to `src/config/configuration.ts`, read with `ConfigService`,
document in the PR. Fail at start-up with a clear message if a required one is
missing. Values live in Vercel env vars, set by Swapnil.

## CORS

Allowed origins are in `src/main.ts`. Keep an explicit list (the site's `www` and
apex hosts); never `*` with credentials. If the website proxies this API through a
Next.js rewrite, the browser never calls it directly and CORS can stay closed.

## Before you say it works

- `yarn lint`, `yarn test`, `yarn test:e2e`, `yarn build`, with the real output.
- Unit tests mock `EmailService`/Postmark; no test may send a real email.

## Shipping

Session branch, PR to `main`. With Vercel's defaults the PR gets a preview and a merge
to `main` deploys to production, so say in the PR what changes for callers and which env
vars are needed. Never push to `main` directly.
