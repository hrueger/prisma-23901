# Prisma Bug: Migrations not compatible with D1 (prisma/prisma#24208)

## Setup
- `npm i`
- `npx wrangler d1 migrations apply prisma-demo-db --local`
- `npm run dev`
- Open the webpage once to create initial data
- Edit `schema.prisma` and rename the field in line 21
- `npx wrangler d1 migrations create prisma-demo-db rename-new-field`
- `npx prisma migrate diff --from-url file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/1c0166116b3dc5e758489f1353805b3aff124b5bea706fe4b493691401206277.sqlite --to-schema-datamodel ./prisma/schema.prisma --script --output prisma/migrations/0002_rename-new-field.sql`
- `npx wrangler d1 migrations apply prisma-demo-db --local`