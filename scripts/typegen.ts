// scripts/typegen.js
const { execSync } = require("child_process");

require("dotenv").config({ path: ".env.local" });

const projectId = process.env.SUPABASE_PROJECT_ID;

if (!projectId) {
  console.error("Missing SUPABASE_PROJECT_ID in .env.local");
  process.exit(1);
}

execSync(
  `supabase gen types typescript --project-id ${projectId} > database.types.ts`,
  { stdio: "inherit" }
);
