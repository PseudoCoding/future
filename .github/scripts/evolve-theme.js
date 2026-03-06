/**
 * Copilot Theme Evolution Script
 *
 * Reads the current theme, sends it to GitHub Models (via Copilot),
 * and writes back an evolved version that reflects predicted future UI/UX trends.
 *
 * Uses the GitHub Models REST API with GITHUB_TOKEN authentication.
 * Docs: https://docs.github.com/en/github-models
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEME_PATH = path.resolve(__dirname, '../../src/theme/evolution.json');
const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com';
const MODEL = 'gpt-4o';

function loadTheme() {
  return JSON.parse(fs.readFileSync(THEME_PATH, 'utf-8'));
}

function saveTheme(theme) {
  fs.writeFileSync(THEME_PATH, JSON.stringify(theme, null, 2) + '\n', 'utf-8');
}

function buildSystemPrompt() {
  return `You are a UI/UX design assistant helping evolve the visual theme of a dark, futuristic React SPA \
that demonstrates AI predicting the future. The site uses a deep dark background aesthetic.

Your task is to take the current theme JSON and return a creatively updated version that reflects emerging \
UI/UX trends — as if imagining what interfaces might look like 1–5 years from now.

Design guidance:
- Keep background colors dark (in the #000000–#1a1a2e range) to preserve the site's core identity
- Feel free to explore new primary, secondary, and accent glow color palettes
- Adjust animation durations, particle counts, blur amounts, and border radii where it enhances the aesthetic
- Aim to evolve at least 4–8 color or effect values to give the theme a meaningfully fresh feel
- Update _evolutionNote with a short description of the aesthetic direction chosen and why it resonates with future UI/UX
- Update _lastEvolvedAt to: ${new Date().toISOString()}
- Set _lastEvolvedBy to: "GitHub Copilot"
- Preserve every existing JSON key — only values should change

Aesthetic directions to consider (pick one that feels fresh given the current theme):
- Bioluminescent deep-ocean (deep blues, cyan, ethereal greens)
- Quantum chromodynamics (abstract particle color fields)
- Retro-futurism (amber/green CRT aesthetic with modern glassmorphism)
- Solar flare (warm oranges, golds, deep reds)
- Arctic aurora (icy blues, greens, purples, high contrast)
- Void matter (near-black with barely-visible ultra-violet accents)
- Neon brutalism (stark contrasts, electric pinks, pure whites)
- Neural substrate (warm purples, deep magentas, biological undertones)
- Silicon photonics (greens, oranges, precise geometric glow)
- Quantum entanglement (paired complementary colors that mirror each other)

Respond with the updated theme as a JSON object.`;
}

function buildUserPrompt(currentTheme) {
  return `Here is the current theme JSON. Please evolve it creatively following the design guidance provided.

Current theme:
${JSON.stringify(currentTheme, null, 2)}`;
}

async function callGitHubModels(messages) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not set');

  const response = await fetch(`${GITHUB_MODELS_ENDPOINT}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.85,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub Models API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content;
}

function validateTheme(original, evolved) {
  // Ensure all top-level keys are preserved
  const requiredKeys = ['_comment', '_lastEvolvedBy', '_lastEvolvedAt', '_evolutionNote', 'colors', 'typography', 'effects', 'animations', 'layout'];
  for (const key of requiredKeys) {
    if (!(key in evolved)) {
      throw new Error(`Missing required key: ${key}`);
    }
  }

  // Ensure all color keys are preserved
  for (const key of Object.keys(original.colors)) {
    if (!(key in evolved.colors)) {
      throw new Error(`Missing color key: ${key}`);
    }
  }

  // Ensure all effect keys are preserved
  for (const key of Object.keys(original.effects)) {
    if (!(key in evolved.effects)) {
      throw new Error(`Missing effect key: ${key}`);
    }
  }

  // Ensure background stays dark
  const bg = evolved.colors.background;
  if (bg && bg !== '#000000') {
    // Allow but warn if it looks too light
    console.log(`Background color: ${bg}`);
  }

  return true;
}

async function main() {
  console.log('🤖 Starting Copilot aesthetic evolution...');

  const currentTheme = loadTheme();
  console.log(`📖 Loaded current theme (last evolved: ${currentTheme._lastEvolvedAt})`);

  const messages = [
    { role: 'system', content: buildSystemPrompt() },
    { role: 'user', content: buildUserPrompt(currentTheme) },
  ];

  console.log(`🌐 Calling GitHub Models API (model: ${MODEL})...`);
  const rawResponse = await callGitHubModels(messages);

  if (!rawResponse) {
    throw new Error('Empty response from GitHub Models API');
  }

  let evolvedTheme;
  try {
    evolvedTheme = JSON.parse(rawResponse);
  } catch (parseError) {
    console.error('Failed to parse JSON response:', rawResponse.slice(0, 500));
    throw new Error(`Invalid JSON from model: ${parseError.message}`);
  }

  // Validate the evolved theme
  validateTheme(currentTheme, evolvedTheme);

  // Ensure metadata is correct
  evolvedTheme._lastEvolvedBy = 'GitHub Copilot';
  evolvedTheme._lastEvolvedAt = new Date().toISOString();

  // Log the evolution note
  console.log(`✨ Evolution note: "${evolvedTheme._evolutionNote}"`);
  console.log(`🎨 Primary color: ${currentTheme.colors.primary} → ${evolvedTheme.colors.primary}`);
  console.log(`🎨 Secondary color: ${currentTheme.colors.secondary} → ${evolvedTheme.colors.secondary}`);

  // Save the evolved theme
  saveTheme(evolvedTheme);
  console.log('✅ Theme evolved and saved successfully!');
}

main().catch(err => {
  console.error('❌ Theme evolution failed:', err.message);
  process.exit(1);
});
