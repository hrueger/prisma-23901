# Prisma Bug: D1 One-to-Many Relation INSERTs fail with `The required connected records were not found.` when using indices

## Setup
- `npm i`
- `npx wrangler d1 migrations apply prisma-demo-db --local`
- `npm run dev`