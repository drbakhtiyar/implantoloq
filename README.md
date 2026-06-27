# implantoloq.az

Next.js (App Router) site for Dr. Bakhtiyar Aliyev's dental implant clinic. Locales: `az` (default), `en`, `ru`.

## Local development

```bash
cp .env.example .env.local   # fill in optional WhatsApp keys if needed
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root `/` redirects to `/az`.

## Contributing / shipping a change

1. **Branch off `main`.** Work on a feature branch — never commit directly to `main`.

2. **Develop and verify locally.**
   ```bash
   npm run dev        # hot-reload dev server
   npm run lint       # must pass
   npm run check:i18n # must pass — checks az/en/ru keys are in sync
   ```

3. **Add or update translations** in `messages/az.json`, `messages/en.json`, and `messages/ru.json` whenever you add user-visible text. The CI i18n check will fail if any locale is missing a key.

4. **Open a pull request against `main`.** CI runs automatically:
   - **Build** — ensures the production build succeeds.
   - **Lint** — ESLint must be clean.
   - **i18n parity** — all locale files must have identical key sets.
   - **Smoke tests** — Playwright checks that the home page renders per locale and the calculator gate form works.

5. **Merge only after CI is green.** Merging to `main` triggers a Vercel production deploy.

### Running smoke tests locally

```bash
npm run build        # required — tests run against the production build
npm run test:e2e     # starts the server and runs Playwright tests
```

### Environment variables

See `.env.example` for all supported env vars and their purpose. Copy it to `.env.local` (gitignored) before running locally. No env vars are required for the app to start.
