# rssg-app

## Prisma

Apply migrations

```shell
npx prisma migrate deploy
```

This is a [sidebase cheviot](https://sidebase.io/) app created by running `pnpm create sidebase@latest`. This project uses the following technologies for a great developer- and user-experience:
- [TypeScript](https://www.typescriptlang.org/)
- [Nuxt 3](https://nuxt.com)
- Database models, migrations, queries and easy DB-switching via Prisma
- Deep Prisma integration: Use the client in your endpoints via nuxt-prisma, Prisma client is auto-generated for npm run dev and other commands and more
- Frontend- and Backend data-transformation via nuxt-parse and zod
- In-memory development SQL-database via sqlite3
- Linting via eslint
- Test management, Test UI, component snapshotting via vitest
- Component tests via test-library/vue
- Nuxt 3 native API testing via @nuxt/test-utils
- Code coverage via c8
- CSS utilities via TailwindCSS
- CSS components via Naive UI
- Type checking in script and template via Volar / vue-tsc
- Code editor configuration via .editorconfig files and a portable .settings/ folder whith best-practice VS Code settings and extensions for Vue 3 / Nuxt 3 development

## How to get going?

This is a straight-forward setup with minimal templating and scaffolding. The options you selected during the sidebase CLI setup are all here though. Good places to continue reading are:
- [the First Steps documentation](https://sidebase.io/sidebase/usage)
- [our discord](https://discord.gg/auc8eCeGzx)

Some tasks you should probably do in the beginning are:
- [ ] replace this generic README with a more specific one
- [ ] install the Vue Volar extension
- [ ] enable [Volar takeover mode](https://nuxt.com/docs/getting-started/installation#prerequisites) to ensure a smooth editor setup
- [ ] [install Nuxt 3 devtools](https://github.com/nuxt/devtools#installation) if you want to use them


### Setup

Make sure to install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

### Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```
