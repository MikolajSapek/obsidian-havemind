# Havemind

Real-time, self-hosted sync for a shared Obsidian vault — one brain for a team and their AIs, with append-only history, full authorship, and zero silent overwrites.

Havemind is **tailnet-only**. There is no cloud service and no public listener: every device reaches the server over a private [Tailscale](https://tailscale.com) network. You run the server; you own the data.

## Requirements

- A **self-hosted Havemind server** on your own box (home server, NAS, or a small VPS), reachable over Tailscale. There is no hosted option.
- **Tailscale** installed and logged in on the server and on every device that syncs.
- Obsidian `1.11.4` or newer, desktop (this plugin is desktop-only).

See the full self-hosting guide in the main repository: <https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md>

## Install (via BRAT)

This plugin is distributed for testing through [BRAT](https://github.com/TfTHacker/obsidian42-brat) while it is under community-catalogue review.

1. In Obsidian: **Settings → Community plugins → Browse**, install **BRAT**, then enable it.
2. Command palette → **BRAT: Add a beta plugin for testing**.
3. Paste this repository URL: `https://github.com/MikolajSapek/obsidian-havemind`.
4. Click **Add Plugin**. BRAT installs it and keeps it up to date automatically on every release.

Then open the Havemind panel (ribbon hexagon or command palette → **Havemind: Connect to Havemind**) and follow the in-plugin tutorial to connect to your server.

## Manual install

Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/MikolajSapek/obsidian-havemind/releases/latest) into `<vault>/.obsidian/plugins/havemind-sync/`, then enable the plugin.

## Security model

The live database and blob store are stored **unencrypted** on the server volume; anyone who controls the server can read the vault. Security therefore rests on trusting the host and keeping access **tailnet-only** — never expose the server to the public internet and never use `tailscale funnel`. The plugin sends no telemetry and talks only to the server URL you configure.

## Source

This is a distribution repository. Source, issues, and the server live in the main monorepo: <https://github.com/MikolajSapek/havemind>.

## License

Apache-2.0 — see [LICENSE](LICENSE).
