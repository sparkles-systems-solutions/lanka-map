# Lanka Map — Independent Mapping Platform

An independent, Sri Lanka-first mapping platform built with open mapping standards and services. The project aims to provide familiar map, search, routing, navigation and live-location capabilities without depending on Google Maps Platform APIs.

## Current application baseline

The existing static application is intentionally preserved while the platform is expanded. It currently includes:

- MapLibre GL JS interactive map centered on Sri Lanka
- OpenFreeMap vector basemap with map attribution
- Sri Lanka-focused place search through Nominatim
- Browser geolocation and map point selection
- Phone-local GPS track recording and GeoJSON download
- Local GeoJSON road-track import and overlay
- Local road-issue report export

These features are not yet a production mapping service. In particular, road reports are downloaded locally, GPS tracks are stored in the browser, and route planning/navigation are not implemented.

## Technology direction

| Area | Planned technology |
|---|---|
| Map rendering | MapLibre GL JS |
| Map data | OpenStreetMap-derived data, with required attribution and compatible licensing |
| Basemap tiles | Licensed hosted vector tiles initially; self-hosting evaluated for scale |
| Search/geocoding | Nominatim or Photon behind a controlled API, subject to provider policy |
| Routing | Valhalla or OSRM hosted outside Workers |
| Web/API edge | Cloudflare Pages + Workers |
| Application data | Cloudflare D1 |
| Files and generated exports | Cloudflare R2 |
| Real-time sessions | Cloudflare Durable Objects |
| Source control and CI | GitHub |

Cloudflare Workers will act as the API gateway and application backend. CPU- and memory-intensive routing engines will run as a separate service or use a managed routing provider; they will not be embedded directly into Workers.

## Development principles

1. Preserve existing working GPS and GeoJSON functionality.
2. Keep provider-specific services behind adapters so providers can be replaced.
3. Never expose private API keys or service credentials in browser code.
4. Respect OSM attribution, ODbL obligations, tile-provider terms, rate limits and caching policies.
5. Do not label user-recorded GPS traces as verified roads.
6. Make UAT and regression testing mandatory for every phase.
7. Avoid collecting or retaining precise location data unless the feature requires it and the user has been informed.

## Local development

The current baseline is a static site. Open `index.html` through a local HTTP server (not `file://`) to test browser geolocation and module/resource loading. For example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Phase 1 UAT plan](docs/PHASE-1-UAT.md)
- [Cloudflare deployment plan](docs/CLOUDFLARE-DEPLOYMENT.md)

## Status

Phase 1 foundation and audit documentation are being established on a dedicated feature branch. No production deployment or Cloudflare resources are created by this repository documentation commit.
