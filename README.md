<p align="center">
  <img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/banner.png" alt="Havemind, a shared Obsidian vault for people you trust" width="100%">
</p>

<h1 align="center">Havemind</h1>

<p align="center">
  <b>One vault. Every device. Your server. About a second.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.4.8-8257e6" alt="Version 1.4.8">
  <img src="https://img.shields.io/badge/licence-Apache--2.0-8257e6" alt="Apache 2.0">
  <img src="https://img.shields.io/badge/Obsidian-1.11.4%2B-8257e6" alt="Obsidian 1.11.4 or newer">
  <img src="https://img.shields.io/badge/desktop%20%2B%20mobile-8257e6" alt="Desktop and mobile">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/hero.gif" alt="A note typed on a MacBook appearing on an iPhone about a second later, the Havemind pane visible on both" width="100%">
</p>

Share one Obsidian vault with the people you trust. Each person keeps a normal
local copy while a server **you** control relays changes, keeps history, and
records who changed what. No Havemind cloud, no account, no telemetry.

---

## Requirements

Read this before installing, because the plugin is half of the product:

- **A server you host.** A home server, a NAS, or a small VPS that can run
  Docker. There is no hosted Havemind to sign up for.
- **Tailscale, on every device that syncs.** The server binds to localhost and
  is reached only over your private tailnet. Nothing is exposed to the public
  internet, and there is no public fallback.
- **Obsidian 1.11.4 or newer**, on macOS, Windows, Linux, iOS or Android.

If you are joining someone else's vault, they handle the server; you install
Tailscale and the plugin.

## Install

Settings → Community plugins → Browse → search **Havemind** → Install →
Enable.

## Quick start

### If you are hosting the vault

1. **Install Tailscale** on the machine that will run the server and log in.
2. **Start the server.** From a checkout of the
   [source repository](https://github.com/MikolajSapek/havemind):
   `docker compose up -d`
3. **Put Tailscale in front of it** with `tailscale serve`, so your other
   devices can reach it. Exact commands: [self-hosting guide](https://github.com/MikolajSapek/havemind/blob/main/docs/self-hosting.md).
4. **Connect the plugin.** Open the Havemind pane, go to **Connect**, and enter
   your server's tailnet address (`something.your-tailnet.ts.net`). Status
   turns green when it works.
5. **Invite someone.** **People → Invite someone**, and send them the
   invitation. It works once.
6. **Approve their device.** Your pane shows *A device wants to join* with six
   digits. Ask them to read out the digits on their screen. If they match,
   press **They match, approve**. Do this by voice, never by message: that
   comparison is what binds their identity, and approving gives the device
   full read and write access.

### If you are joining someone else's vault

1. **Install Tailscale**, log in, and accept their invitation to the tailnet.
2. **Install the Havemind plugin** and enable it.
3. **Open the Havemind pane** and choose *Someone sent me an invitation*.
4. **Paste the invitation** they sent you and press **Connect**. It is valid
   for 15 minutes and works once.
5. **Read the six digits aloud.** Your screen shows them and says who invited
   you. The owner sees the same six on their side and confirms they match. If
   they do not match, stop: someone else is trying to join.
6. **Wait.** The screen updates itself. Once the owner approves, the vault
   syncs and appears like any other vault.

## Key features

- 🔄 **Real-time two-way sync, about a second.** A long-poll wake channel
  pushes a peer's change to your device, with a periodic poll as a fallback.
- 📱 **Desktop and mobile, the same vault.** macOS, Windows, Linux, iOS and
  Android. The pane docks into the sidebar on a desktop and fills the screen on
  a phone.
- 🖊️ **Authorship everywhere.** Every revision carries who made it, with a
  stable colour per author and one-click restore of any earlier version.
- 🛡️ **No silent overwrites.** Non-overlapping edits merge automatically. When
  two people edit the same lines, both versions are kept and a conflict copy
  lands in `Havemind Conflicts/` for review.
- 📎 **Notes and attachments.** Markdown with line-level history; images and
  PDFs up to 25 MB sync byte for byte.
- 🎨 **Appearance settings, from an explicit allowlist.** Themes, CSS snippets,
  hotkeys and graph colours mirror between devices. Nothing else under
  `.obsidian/` is in scope, and never `.obsidian/plugins/`.
- 👥 **Presence roster and rejoin.** See who is connected; if a session dies,
  one click re-admits a known contact with no new code exchange.
- 🔐 **Human-verified onboarding.** Both devices show the same six digits; the
  joiner reads them aloud and the owner confirms they match. Identity is bound
  server-side at approval and never trusted from the client afterwards.

## What it looks like

### Status

Whether you are connected, when the last sync landed, and over what network.

<img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/pane-status.png" alt="Havemind on a MacBook: the Status tab shows Connected and synced, the time of the last sync, and that the connection runs over a private Tailscale network" width="100%">

### People

Everyone in the vault, their role, and whether they are connected right now.
Invite someone from the same place.

<img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/pane-people.png" alt="Havemind on a MacBook: the People tab lists the vault owner and two connected editors, with an Invite someone action" width="100%">

### On a phone

The same pane, full screen, with touch targets and safe areas sized for it.

<p align="center">
  <img src="https://raw.githubusercontent.com/MikolajSapek/obsidian-havemind/main/assets/pane-mobile.png" alt="Havemind running full screen on an iPhone, showing Connected and synced" width="380">
</p>

## Commands

Every one is available from the command palette:

| Command | What it does |
|---|---|
| Open activity | Opens the activity feed in its own view |
| Connect to Havemind | Connects this vault to a server |
| Create connection (owner) | Creates an invitation for someone else |
| Sync now | Forces a sync instead of waiting |
| Show authors | Toggles the author overlay in the editor |
| Disconnect | Stops syncing, keeps your local copy |
| Reset connection | Clears local sync state and starts over |

## Settings

Settings → Havemind shows the server address, connection state, last sync,
the member roster, and the same actions as the pane menu.

## Privacy and permission disclosures

Havemind has no telemetry, analytics, advertisements, or Havemind-operated
account service.

- **Network use.** After a user explicitly connects a vault, Havemind makes
  HTTPS requests only to the self-hosted server URL entered by that user. The
  requests authenticate devices, create and approve invitations, synchronise
  revisions and blobs, load membership state, and wait for changes. No network
  request is made while the plugin is disconnected. The self-hosted server
  stores synced vault content in plaintext, so it must be operated by someone
  the vault members trust.
- **Vault file enumeration.** During initial reconciliation and conflict
  handling, Havemind lists vault paths to detect creates, deletions, renames
  and conflicts. It reads and synchronises supported vault content plus an
  explicit allowlist of appearance settings. It never synchronises
  `.obsidian/plugins/`, plugin data, or plugin secrets.
- **Clipboard.** Havemind only writes a one-time invitation to the system
  clipboard after the vault owner selects **Copy invitation**. It never reads
  the clipboard or logs invitations.
- **Base64 encoding.** Base64url encodes binary revision envelopes and
  invitations for transport. It is not encryption, obfuscation, or a mechanism
  for hiding code, URLs, or keys.

## Security model

Havemind relies on the private Tailscale network and the server chosen by vault
members. **It does not provide end-to-end encryption:** the server stores synced
content in plaintext. Do not connect a vault to a server you do not trust, and
do not expose the server to the public internet.

Joining is human-verified: both devices display the same six digits, the
joiner reads them aloud, and the owner approves only if they match. An
invitation is valid for 15 minutes and can be redeemed once. Identity is bound
server-side at approval and never trusted from the client afterwards.

## Troubleshooting

**Status stays on "Disconnected".** Check Tailscale is running and logged in on
both the server and this device, then confirm the address in the Connect tab
matches your tailnet name.

**A change has not arrived.** Havemind waits for a file to be quiet for 1.5
seconds before sending it, so a note being typed into syncs when you pause. Use
**Sync now** to force it.

**A conflict copy appeared.** Two people edited the same lines. Both versions
are kept in `Havemind Conflicts/`; open the pane and pick which to keep.

**Nothing works after a server rebuild.** Use **Reset connection**, then
reconnect. Your local notes are untouched.

## Support

Source, self-hosting instructions and issue tracking:
<https://github.com/MikolajSapek/havemind>

Licensed under Apache 2.0.
