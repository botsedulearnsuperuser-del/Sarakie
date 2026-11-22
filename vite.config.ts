import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "node:fs";
import path from "node:path";
import chatHandler from "./api/chat.js";
import adminEvaluatorsHandler from "./api/admin-evaluators.js";

// Load .env.local into process.env so the dev middleware (api/chat) can read secrets.
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  const raw = fs.readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
} catch {
  // no .env.local present
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "ceda-admin-evaluators-dev-middleware",
      configureServer(server) {
        server.middlewares.use("/api/admin-evaluators", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }
          let body = "";
          req.on("data", (c) => (body += c));
          req.on("end", async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            try {
              await adminEvaluatorsHandler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err?.message || "Server error" }));
            }
          });
        });
      },
    },
    {
      name: "ceda-chat-dev-middleware",
      configureServer(server) {
        server.middlewares.use("/api/chat", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }
          let body = "";
          req.on("data", (c) => (body += c));
          req.on("end", async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            res.status = (c) => { res.statusCode = c; return res; };
            res.json = (b) => {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(b));
              return res;
            };
            try {
              await chatHandler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err?.message || "Server error" }));
            }
          });
        });
      },
    },
  ],
  server: {
    allowedHosts: [
      "pv-d1bcf4fee5ea-21597296-4f5d-4c8b-9ff2-7366e5e9a2d0.style.dev",
      "pv-d1bcf4fee5ea-37040274-19d0-4072-8a61-ef8d958839a2.style.dev",
      "pv-d1bcf4fee5ea-d3d0d0ca-9b04-49c5-8c3c-6f2fb159228f.style.dev"
    ]
  },
});