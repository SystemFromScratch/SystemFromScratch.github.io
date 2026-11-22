# Library cards: release sync

The cards of the libraries on systemfromscratch.com update themselves when a
library publishes a release. Nothing on the website has to be edited by hand.
The decision behind this is in [ADR-001](adr/ADR-001-library-release-sync.md).

## What comes from where

| On the card | Source |
|---|---|
| Version, Stable / Pre-release, *Release notes* link | Latest release on GitHub: the latest stable one, or the latest pre-release when there is no stable one. Drafts are ignored. |
| Title, summary, features, highlights, categories, tags, illustration or image, links to docs / manual / article / demo | `site.yml` at the root of the library repository, **read at the tag of that release** |
| Featured, home page section, order of the cards, *Source code* link | `website/assets/js/projects.js` in this repository |
| Anything missing above | The entry in `projects.js` |

So:

- A release without a `site.yml` still shows its new version; the description
  stays as written in `projects.js`.
- A `site.yml` edited on `main` appears on the website with the next release,
  so the card never describes features that are not released yet.
- A library is tracked as soon as its entry in `projects.js` has a GitHub
  `links.repo`. Set `track: false` on the entry to stop it, or `sitePath` to read
  the description from another path.
- Labels outside the cards (the library list on the home page, the Doppelstep
  badge in `robot.html`) follow the release when they carry
  `data-release="owner/repo"`. The repository must be tracked in `projects.js`.
  On elements with the class `meta` the green dot (`is-stable`) follows too.

## When the website updates

`.github/workflows/deploy.yml` reads all tracked libraries on every run:

1. on a release of a library, through the workflow below (about a minute),
2. every day at 04:23 UTC, as a safety net for a missed notification,
3. on every push to `main` and on a manual run (*Actions → Deploy website → Run workflow*).

It writes `website/assets/js/libraries.js` and commits it as
`chore: update releases [skip ci]` **only when something changed**: a version,
Stable / Pre-release, or the `site.yml` of a release. A run where nothing changed
makes no commit. The file has sorted keys and no timestamps, so the same releases
always give the same bytes.

Nothing in this step fails the deploy. When GitHub cannot be reached, a
repository is not found or a `site.yml` is not valid, the data of the previous
run is kept for that library and the run shows a warning in its summary.

## Set up a library (once per repository)

### 1. Token for the notification (once per owner)

The notification is a `repository_dispatch` to this repository, which the
default `GITHUB_TOKEN` of another repository may not send.

1. GitHub → *Settings → Developer settings → Fine-grained personal access tokens → Generate new token*.
2. *Resource owner*: **SystemFromScratch**. *Repository access*: only
   **SystemFromScratch/SystemFromScratch.github.io**.
3. *Repository permissions → Contents*: **Read and write** (nothing else).
4. Expiration: up to one year. Put a reminder in your calendar; until it is
   renewed the daily run still picks up every release, only later.
5. Store it as a secret named `SITE_DISPATCH_TOKEN`:
   - libraries under the **SystemFromScratch** organization: once, as an
     organization secret (*Organization settings → Secrets and variables → Actions*);
   - libraries under **AntonVynohradov**: in each repository
     (*Settings → Secrets and variables → Actions*).

If the organization does not allow fine-grained tokens yet, enable them under
*Organization settings → Personal access tokens*.

### 2. Workflow in the library

Add `.github/workflows/website.yml` to the library:

```yaml
name: Website card

on:
  release:
    types: [published]
  pull_request:
    paths: [site.yml]
  workflow_dispatch:

jobs:
  website:
    uses: SystemFromScratch/SystemFromScratch.github.io/.github/workflows/library-release.yml@main
    secrets:
      SITE_DISPATCH_TOKEN: ${{ secrets.SITE_DISPATCH_TOKEN }}
```

- On a pull request that changes `site.yml` it only validates the file, so a
  mistake shows up before the release.
- On a published release (and on a manual run) it validates and then notifies
  the website. An invalid `site.yml` does not stop the notification: the new
  version appears with the last valid description.

### 3. `site.yml`

Copy [examples/site.yml](examples/site.yml) to the root of the library and
adjust it. The schema is [tools/site.schema.json](../tools/site.schema.json); the
first line of the example lets VS Code (YAML extension) check the file and
complete the fields while you type. To check it locally from this repository:

```sh
npm install
node tools/validate-site.mjs ../isotp-c/site.yml
```

Fields that belong to the website (`featured`, `homeSection`) or to the release
(`status`, `stable`, `version`) are rejected with a message saying where they are set.
An `image` path is relative to the library repository; the website copies the
file to `website/assets/img/projects/<repository>/` at build time.

Once a release with a `site.yml` is on the website, the entry in `projects.js`
can be reduced to what only the website decides:

```js
{
  featured: true,
  links: { repo: "https://github.com/AntonVynohradov/isotp-c" },
},
```

## Run it locally

```sh
npm install                       # once: the YAML parser
node tools/fetch-libraries.mjs    # optional: set GITHUB_TOKEN for a higher rate limit
node tools/prerender.mjs
```

The VS Code task **Website: update libraries** runs both.
