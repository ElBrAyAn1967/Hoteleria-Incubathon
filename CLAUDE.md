# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is a **planning/spec repository for a hackathon project**, not a codebase. There is no source code, build system, package manager, or test suite yet — only Markdown specs and pitch slide images. Future work in this repo will likely start with scaffolding an actual application based on the specs below.

Product: a B2B marketplace connecting hotels/hostels (≤50 keys) to local experience hosts ("anfitriones locales") in Mexico, with WhatsApp-based booking intake and instant on-chain commission settlement to the host/operator. Working name in docs: "Marketplace de Experiencias" / brief reference "Navigo X"; a broader long-term vision is called "Early Bird Hospitality OS" (explicitly out of scope for the MVP — narrative only, not to be built).

## Document map

- `README.md` — synthesis of the problem, team, competitive landscape, and the core differentiator (instant commission settlement, not just "WhatsApp + AI").
- `CHECKLIST_MANANA.md` — pre-build decisions the team must close (validation anchor, jury criteria, "real-time" language, single use case) and discovery questions to ask real business contacts.
- `ICP_CONTEXTO.md` — target customer profile: hotel/hostel staff drowning in manual WhatsApp coordination with tour operators. ICP is the business (B2B), not the tourist.
- `MVP_SCOPE.md` — the frozen 36-hour hackathon scope: what's in (WhatsApp intake → pre-loaded catalog → booking confirmation → instant commission payout with on-chain proof) and explicitly what's out (bidirectional PMS sync, real-time multi-operator availability, admin dashboards, KYC/AML). Contains the hour-by-hour hackathon checkpoint schedule.
- `SPEC_CASO_USO_NEGOCIO.md` — supply-side spec: onboarding local hosts (assisted, not self-service — hosts may have no smartphone), host profile as the actual product (not a generic listing), and the hotel-referral commission link.
- `SPEC_CASO_USO_TURISMO.md` — demand-side spec: the tourist/guest use case, discovery via hotel staff recommendation (not open marketplace search), and why the host's personality/specialty *is* the product, not metadata.
- `SLIDES/` — pitch deck images.

## Key product constraints to respect when building

- **Single use case only** — do not build parallel flows for "the hotel" and "the tour operator" as two separate products; pick one primary demo user.
- **B2B ICP, not B2C** — the paying/validated pain is the hotel/hostel staff's wasted time, not the tourist's discovery experience.
- **Assisted host onboarding, not self-service** — hosts may be non-technical or lack a smartphone; onboarding is done *for* them by the team/hotel via a simple template (photo, bio, specialty, availability), not a public signup form.
- **Static/pre-loaded availability is acceptable for the MVP** — do not build real bidirectional calendar sync with operators; none of the real-world operators have APIs to sync with.
- **Instant commission settlement is the actual differentiator** — not the WhatsApp/AI layer, which is commodity. Any payments work should produce visible proof (transaction hash or equivalent) that money moved in minutes, not days/weeks.
- **Don't over-promise "real-time"** — the agreed pitch language is "response in seconds via automated WhatsApp," not "real-time availability."
- **Host is not interchangeable** — profile/UX should surface the individual host's personality and specialty, not reduce them to a generic service-provider row.
