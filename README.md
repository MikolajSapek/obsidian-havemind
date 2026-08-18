<p align="center">
  <img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/banner.png" alt="Havemind" width="100%">
</p>

# Havemind

**Two people, one vault, no cloud.** Havemind syncs a shared Obsidian vault
between your own devices in about a second, over a server you host yourself —
and records who wrote every line.

No account. No subscription. No third party holding your notes.

> [!IMPORTANT]
> Note content is stored **unencrypted** on your server, so whoever controls
> that machine can read the vault. Run it on hardware you trust, keep it
> tailnet-only, and read [Security model](#security-model) before connecting a
> vault that matters.

## Why this exists

Obsidian Sync is excellent, but it is someone else's server. File-sync tools
(Dropbox, Syncthing, iCloud) treat a vault as loose files: two people editing
the same note produces a silent overwrite or a pile of conflicted copies, and
nothing tells you who changed what.

Havemind is built for the small case that neither solves well — **two or three
people who trust each other, sharing one vault, on their own hardware.**

| | Obsidian Sync | File sync | Havemind |
|---|---|---|---|
| Runs on your hardware | ✗ | ✓ | ✓ |
| Real-time (~1s) | ✓ | varies | ✓ |
| Per-line authorship | ✗ | ✗ | ✓ |
| Concurrent edits merge | ✓ | ✗ | ✓ |
| Silent overwrites possible | ✗ | ✓ | **never** |
| Subscription | ✓ | ✗ | ✗ |

## What you get

- **Real-time sync.** A peer's edit lands on your device in roughly a second.
  Not a poll loop with a spinner — a push channel, with polling only as a
  fallback.
- **Zero silent overwrites — enforced, not promised.** Non-overlapping edits
  merge automatically over a common ancestor. A genuine clash becomes a visible
  conflict copy with both versions intact, resolvable in-app. Nothing is ever
  quietly discarded.
- **Authorship on every line.** The Activity panel shows who changed what and
  when, each author in a stable colour. Restore any earlier revision in one
  click; the restore itself is a new revision, attributed to you.
- **Notes and attachments.** Markdown with line-level history; images and PDFs
  up to 25 MB, byte-for-byte.
- **Appearance that follows you.** Themes, CSS snippets, hotkeys and graph
  colour groups mirror across devices, from an explicit allowlist.
- **Plugin code never syncs.** `.obsidian/plugins/` is excluded in full, at two
  independent layers. No member can replace another member's plugin code, and
  your machines can run completely different plugin sets.
- **Survives crashes.** The outbox is durable and fails closed: a corrupted
  state file is quarantined for recovery, never silently emptied.

<img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/screenshot-graph.png" alt="Obsidian's graph view with a colour group applied, mirrored from another device in the same Havemind vault" width="100%">

## Requirements and disclosures

- **Network use.** The plugin talks to exactly one remote service: the Havemind
  server you or a peer self-hosts, at the URL you enter in settings. No cloud
  backend, no CDN, no other host.
- **No account, no payment, no telemetry, no ads.** Nothing to sign up for,
  nothing collected, no analytics.
- **A self-hosted server is required.** See the
  [self-hosting guide](https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md).
- **Platform.** Obsidian 1.11.4+, desktop only. Tailscale on the server and on
  every syncing device.
- **Licence.** Apache-2.0, source fully public.

## Getting started

1. **Stand up a server.** Follow the
   [self-hosting guide](https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md)
   (Docker Compose + Tailscale). Or get a pairing token from whoever runs yours.
2. **Install the plugin.** Until it lands in the community catalogue, install
   [BRAT](https://github.com/TfTHacker/obsidian42-brat), run **BRAT: Add a beta
   plugin**, and paste `https://github.com/MikolajSapek/obsidian-havemind`.
   BRAT keeps it updated automatically.
3. **Connect.** Open the Havemind panel and paste your server URL and token.
4. **Invite someone.** Run **Create connection (owner)** to mint an invitation.
   The joining device shows a 6-digit code; they read it to you aloud, you
   approve it. Identity is bound server-side at approval and never trusted from
   the client afterwards.

Use a dedicated vault, and don't run another sync tool on it.

## Security model

Security rests on [Tailscale](https://tailscale.com), not on application-layer
encryption. The server is reachable only on your private tailnet, never the
public internet, with WireGuard encryption in transit and per-device
authentication.

**The trust boundary is the machine running the server.** Content is stored
there in plaintext, so server access is vault access. End-to-end encryption is
deliberately out of scope: this is a small, self-hosted, trusted-circle tool,
not a zero-trust service. If your threat model includes the server operator,
this is the wrong tool for that vault.

Within a vault the boundary is drawn at **code**: appearance settings sync from
an explicit allowlist, and plugin code, plugin state and plugin secrets never
cross the wire.

## How it works

```
Obsidian (device A) ─┐
                     ├── HTTPS over tailnet ──► opaque server (Fastify + SQLite)
Obsidian (device B) ─┘      real-time wake        content-addressed blobs
```

The server is an **opaque append-only relay**. It stores content-addressed
blobs and revision headers, and never computes a diff, a merge, or provenance —
all of that happens on your device. Vaults on one server are fully isolated
from each other.

Because every device keeps a complete local vault, the server holds no
irreplaceable copy: it is a bridge, not the source of truth.

## Manual install

Download `main.js`, `manifest.json` and `styles.css` from the
[latest release](https://github.com/MikolajSapek/obsidian-havemind/releases/latest)
into `<vault>/.obsidian/plugins/havemind-sync/`, then enable the plugin.

## Source and support

This is the distribution repository. Source, issues and the server live in the
monorepo: <https://github.com/MikolajSapek/havemind>.

Security reports: see
[SECURITY.md](https://github.com/MikolajSapek/havemind/blob/main/SECURITY.md) —
please report privately, not as a public issue.

## Licence

Apache-2.0 — see [LICENSE](LICENSE).
