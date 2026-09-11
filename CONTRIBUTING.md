# Contributing

This repository holds the built plugin: `main.js`, `styles.css` and the
manifests. It is what the Obsidian catalogue installs from. **The source lives
elsewhere and all development happens there:**

<https://github.com/MikolajSapek/havemind>

## Where to send things

| What | Where |
|---|---|
| Bug report | [Issues on the source repo](https://github.com/MikolajSapek/havemind/issues) |
| Feature idea | Same place, or the [forum thread](https://forum.obsidian.md/) |
| Pull request | The source repo. A PR here would be overwritten by the next release |
| Security issue | See [SECURITY.md](https://github.com/MikolajSapek/havemind/blob/main/SECURITY.md), do not open a public issue |

## A good bug report

Sync bugs are hard to reproduce from a description alone, so please include:

1. Plugin version (Settings, Community plugins) and Obsidian version.
2. Desktop or mobile, and which OS.
3. What the other device was doing at the time. Most sync bugs need two
   devices to appear at all.
4. Whether the file was open in Obsidian, closed, or edited by something else.
5. Anything in `Havemind Conflicts/` from around that moment.

If you lost data, say so in the first line. That is the class of bug that gets
looked at before anything else.

## Building from source

```bash
git clone https://github.com/MikolajSapek/havemind
cd havemind
npm ci
npm run verify   # lint, typecheck, ~2000 tests, build
npm run build --workspace @havemind/obsidian-plugin
```

The build lands in `apps/obsidian-plugin/`. Copy `main.js`, `styles.css` and
`manifest.json` into `<vault>/.obsidian/plugins/havemind-sync/`.

Do not point a development build at a vault you care about. Use a throwaway
one.

## Verifying a release

Every release asset carries a GitHub artifact attestation, so you can check
that the `main.js` you install was built from the source it claims:

```bash
gh attestation verify main.js --repo MikolajSapek/obsidian-havemind
```
