# ADR-001: Library cards follow the library releases

**Status:** Accepted
**Date:** 2026-11-22
**Deciders:** Anton Vynohradov

## Context

systemfromscratch.com is a static site on GitHub Pages. Its cards for the
libraries (Baton-C, ISOTP-C, DXL2-C, the X430 emulator, Stepper-C, Doppelstep, …)
carried the version and the description by hand in `projects.js` and
`index.html`. Every release of a library meant a second change in this
repository, and the website lagged behind the libraries.

Constraints:

- Static hosting only; the cards must be in the HTML for search engines
  (`tools/prerender.mjs` already does this in the deploy workflow).
- The libraries live in separate repositories under two owners
  (AntonVynohradov and SystemFromScratch), all public.
- The number of commits in this repository should stay under control.

## Decision

1. **Push, with a daily safety net.** A release of a library sends a
   `repository_dispatch` (`library-released`) to this repository through the
   reusable workflow `.github/workflows/library-release.yml`. The deploy workflow
   also runs daily, so a missed notification (expired token, outage) is picked up
   within a day.
2. **The version comes from GitHub Releases**: the latest stable release, or the
   latest pre-release when there is no stable one.
3. **The description lives in the library**, in `site.yml`, read **at the tag of
   that release**, so it changes with the code during development and reaches the
   website with the release it describes.
4. **The website keeps what only it decides**: featured, home page section, the
   order of the cards. A missing `site.yml` falls back to the entry in `projects.js`.
5. **Commit only on change.** The generated `website/assets/js/libraries.js` is
   deterministic (sorted keys, no timestamps); the workflow commits
   `chore: update releases [skip ci]` only when it differs.
6. **Never break the deploy.** On any error the data of the previous run is kept
   for that library and a warning is shown.

## Options considered

### A: Read the GitHub API in the browser

| Dimension | Assessment |
|---|---|
| Complexity | Low |
| Freshness | Immediate |
| SEO | Versions not in the HTML |

**Cons:** 60 unauthenticated requests per hour per visitor IP, versions flicker on
page load, search engines do not see them. Rejected.

### B: Daily scheduled build only

| Dimension | Assessment |
|---|---|
| Complexity | Low, no secrets |
| Freshness | Up to 24 hours |
| SEO | Yes |

Kept as the safety net of C.

### C: Notification from each library on release (chosen, with B)

| Dimension | Assessment |
|---|---|
| Complexity | Medium: one token per owner, a short workflow per library |
| Freshness | About a minute |
| SEO | Yes |

### D: Description in the library (`site.yml`) (chosen)

| Dimension | Assessment |
|---|---|
| Complexity | Medium: a schema and a validator |
| Ownership | The description is changed in the same pull request as the code |

**Cons:** descriptions spread over many repositories; mitigated by one schema,
validation in each library's CI and website-only fields kept here.

## Consequences

- A release needs no change in this repository; the version, the dot colour and
  the *Release notes* link update themselves, the description too once the
  library ships a `site.yml`.
- Automated commits appear only when a library changed.
- The dispatch token expires (at most one year) and has to be renewed; until then
  the daily run covers it.
- Short texts on the home page library list (`index.html`) are still written by
  hand; only their version labels follow the releases (`data-release`).

## To revisit

- Generate the home page library list from the same data if it keeps growing.
- A GitHub App instead of personal tokens if more people publish libraries.
- A "what's new" line on the card from a marked section of the release notes.
