/**
 * Scheduled Article Publisher
 * 
 * Reads the next article from the queue (by date), appends it to
 * src/data/articles.ts, moves it to published/, and sends a Discord
 * webhook notification.
 *
 * Usage:  node scheduled-articles/publish.mjs [--force]
 *   --force  publishes the next article regardless of date
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUEUE_DIR = path.join(__dirname, "queue");
const PUBLISHED_DIR = path.join(__dirname, "published");
const ARTICLES_FILE = path.join(__dirname, "..", "src", "data", "articles.ts");
const DISCORD_WEBHOOK =
  "https://discord.com/api/webhooks/1498683260618932316/c44UjryNivXhRrkKmafY8Mn9AVEHHMgI77BKPmgcQULJfkfDkJM4hKZZChhmOuSFY9Dz";
const SITE_URL = "https://www.ddpropainting.net";

const force = process.argv.includes("--force");

// ── helpers ──────────────────────────────────────────────────────────
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function escapeTS(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function articleToTS(a) {
  const lines = [];
  lines.push("  {");
  lines.push(`    slug: "${a.slug}",`);
  lines.push(`    title: "${a.title.replace(/"/g, '\\"')}",`);
  lines.push(`    metaDescription:`);
  lines.push(`      "${a.metaDescription.replace(/"/g, '\\"')}",`);
  lines.push(`    heroImage: "${a.heroImage}",`);
  lines.push(`    heroImageAlt: "${a.heroImageAlt.replace(/"/g, '\\"')}",`);
  lines.push(`    category: "${a.category}",`);
  lines.push(`    publishDate: "${a.publishDate}",`);
  lines.push(`    readTime: "${a.readTime}",`);
  lines.push(`    content: \`${escapeTS(a.content)}\`,`);

  // keyTakeaways
  lines.push("    keyTakeaways: [");
  for (const t of a.keyTakeaways) {
    lines.push(`      "${t.replace(/"/g, '\\"')}",`);
  }
  lines.push("    ],");

  // faqs
  lines.push("    faqs: [");
  for (const faq of a.faqs) {
    lines.push("      {");
    lines.push(`        question: "${faq.question.replace(/"/g, '\\"')}",`);
    lines.push("        answer:");
    lines.push(`          "${faq.answer.replace(/"/g, '\\"')}",`);
    lines.push("      },");
  }
  lines.push("    ],");
  lines.push("  },");
  return lines.join("\n");
}

// ── main ─────────────────────────────────────────────────────────────
async function main() {
  const today = todayISO();
  console.log(`[publish] Today: ${today}  force=${force}`);

  // read queue
  if (!fs.existsSync(QUEUE_DIR)) {
    console.log("[publish] No queue directory. Nothing to do.");
    process.exit(0);
  }

  const files = fs
    .readdirSync(QUEUE_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (files.length === 0) {
    console.log("[publish] Queue is empty. Nothing to do.");
    process.exit(0);
  }

  // find articles due today or earlier
  const due = [];
  for (const f of files) {
    const raw = fs.readFileSync(path.join(QUEUE_DIR, f), "utf-8");
    const article = JSON.parse(raw);
    if (force || article.publishDate <= today) {
      due.push({ file: f, article });
    }
  }

  if (due.length === 0) {
    console.log("[publish] No articles due today. Next up:", files[0]);
    process.exit(0);
  }

  // publish one at a time (oldest first)
  const { file, article } = due[0];
  console.log(`[publish] Publishing: ${article.title} (${article.slug})`);

  // read current articles.ts
  let articlesTS = fs.readFileSync(ARTICLES_FILE, "utf-8");

  // insert before the closing ];
  const insertPoint = articlesTS.lastIndexOf("];");
  if (insertPoint === -1) {
    console.error("[publish] Could not find ]; in articles.ts");
    process.exit(1);
  }

  const newEntry = articleToTS(article);
  articlesTS =
    articlesTS.slice(0, insertPoint) + newEntry + "\n" + articlesTS.slice(insertPoint);

  fs.writeFileSync(ARTICLES_FILE, articlesTS, "utf-8");
  console.log("[publish] Updated articles.ts");

  // move to published
  fs.mkdirSync(PUBLISHED_DIR, { recursive: true });
  fs.renameSync(
    path.join(QUEUE_DIR, file),
    path.join(PUBLISHED_DIR, file)
  );
  console.log(`[publish] Moved ${file} to published/`);

  // Discord notification
  try {
    const embed = {
      title: "New Article Published",
      description: article.title,
      url: `${SITE_URL}/resources/${article.slug}`,
      color: 0xd4a843,
      fields: [
        { name: "Category", value: article.category, inline: true },
        { name: "Read Time", value: article.readTime, inline: true },
        { name: "Publish Date", value: article.publishDate, inline: true },
      ],
      footer: { text: "D&D Pro Painting Auto-Publisher" },
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (res.ok) {
      console.log("[publish] Discord notification sent.");
    } else {
      console.warn("[publish] Discord webhook returned", res.status);
    }
  } catch (err) {
    console.warn("[publish] Discord webhook failed:", err.message);
  }

  console.log("[publish] Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
