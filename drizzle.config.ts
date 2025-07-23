import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src-tauri/migrations',
  schema: './src/lib/database/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: ':memory:',
  },
});
