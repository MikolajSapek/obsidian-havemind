<p align="center">
  <img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/banner.png" alt="Havemind — one shared brain for a team and their AIs" width="100%">
</p>

# Havemind

Real-time, self-hosted sync for a shared vault — one brain for a team and their AIs.

## Requirements and disclosures

- **Network use.** The plugin talks to exactly one remote service: the Havemind server that the vault owner self-hosts on their own Tailscale network, at the URL configured in the plugin's settings. There are no calls to any other service, no cloud backend, and no CDN.
- **No account.** There is no hosted Havemind account of any kind. Access to a vault is granted when the vault owner approves a pairing request on their own server — there's nothing to sign up for.
- **No payment.** Havemind is free and open source, licensed under Apache-2.0. There's no paid tier, subscription, or in-app purchase.
- **No telemetry, no ads.** The plugin collects no analytics and shows no advertising. It sends data nowhere except the server URL configured by the user.
- **Server requirement.** A self-hosted Havemind server is required to use this plugin — see the [self-hosting guide](https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md) for the full setup.
- **Platform.** Obsidian `1.11.4` or newer, desktop only (this plugin is desktop-only). Tailscale must be installed and logged in on the server and on every device that syncs.

## What it does

- **Real-time two-way sync.** A long-poll wake channel pushes a peer's change to a device in roughly a second, with a periodic poll as a fallback.
- **Append-only history with full authorship.** The Activity panel shows who changed what, and any previous revision can be restored with one click.
- **Zero silent overwrites.** Non-overlapping edits merge automatically; a genuine clash becomes a visible conflict copy under `Havemind Conflicts/` — never a silent overwrite.
- **Binary attachments.** Images and PDFs sync byte-for-byte, subject to a file-type allowlist and a 25 MB cap per file.
- **Appearance settings, from an explicit allowlist.** Theme CSS, snippets, hotkeys, and appearance, app, and graph settings mirror between devices. Plugin code and plugin state are never included.
- **Multiple isolated vaults on one server.** A single self-hosted server can host several separate vaults, each isolated from the others.

## Screenshots

### Activity panel and authorship

Every revision is attributed. The Activity panel shows who changed what, each
author keeps a stable colour, and any earlier revision restores in one click.

<img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/screenshot-activity.png" alt="The Havemind Activity panel listing revisions by author, with the authorship overlay colouring edited text in the note beside it" width="100%">

### Connecting to a vault

There is nothing to sign up for. The panel walks through connecting to a
self-hosted server and pairing with a code the owner approves.

<img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/screenshot-connect.png" alt="The Havemind connect screen showing the getting-started steps, the server URL field and the pairing token field" width="100%">

### Sync status

The status bar reports the live sync state, and appearance settings such as
graph colour groups mirror across devices.

<img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/screenshot-status.png" alt="The Obsidian status bar showing Havemind synced, with the graph view open and colour groups matching across two devices" width="100%">

## Getting started

1. **Stand up the server.** Follow the [self-hosting guide](https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md) to run the Havemind server on hardware reachable over Tailscale.
2. **Install the plugin.** Once listed, install Havemind from Obsidian's community plugin catalogue. Meanwhile, install it through BRAT:
   1. In Obsidian: **Settings → Community plugins → Browse**, install **BRAT**, then enable it.
   2. Command palette → **BRAT: Add a beta plugin for testing**.
   3. Paste this repository URL: `https://github.com/MikolajSapek/obsidian-havemind`.
   4. Click **Add Plugin**. BRAT installs it and keeps it up to date automatically on every release.
3. **Connect with the pairing code.** Open the Havemind panel (ribbon hexagon or command palette → **Connect to Havemind**) and follow the in-plugin tutorial. Joining a vault requires a short code shown on the joining device, read aloud to the owner, who types it in to approve the connection.
4. **Invite people.** From the command palette, run **Create connection (owner)** to generate a new pairing code for someone else to join the vault.

## Security model

The live database and blob store are stored **unencrypted** on the server volume; anyone who controls the server can read the vault. Security therefore rests on trusting the host and keeping access **tailnet-only** — never expose the server to the public internet and never use `tailscale funnel`. The plugin sends no telemetry and talks only to the server URL configured by the user.

## Manual install

Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/MikolajSapek/obsidian-havemind/releases/latest) into `<vault>/.obsidian/plugins/havemind-sync/`, then enable the plugin.

## Source

This is a distribution repository. Source, issues, and the server live in the main monorepo: <https://github.com/MikolajSapek/havemind>.

## License

Apache-2.0 — see [LICENSE](LICENSE).
