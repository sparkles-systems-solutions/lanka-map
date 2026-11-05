# Phase 1 — UAT and Regression Checklist

## Test policy

Every item must be marked **Pass**, **Fail** or **Blocked** with browser/device, date, evidence and defect reference. A release is not UAT-approved while any critical or high-severity defect remains open. Existing baseline features must pass regression testing after each change.

## Test environment record

- Build / commit:
- Deployment URL:
- Browser and version:
- Device / OS:
- Network (Wi-Fi / mobile data / constrained):
- Tester:
- Test date:
- Result:

## A. Existing baseline regression

| ID | Test | Expected result | Result |
|---|---|---|---|
| LM-001 | Open application over HTTPS | Application loads without fatal console errors | Not run |
| LM-002 | Initial Sri Lanka view | Map centers on Sri Lanka and tiles render | Not run |
| LM-003 | Zoom and pan | Mouse, touch and navigation controls work smoothly | Not run |
| LM-004 | Click map | Selected coordinates and marker update correctly | Not run |
| LM-005 | Reset Sri Lanka | Camera returns to configured Sri Lanka extent | Not run |
| LM-006 | Request current location | Permission prompt appears only after user action | Not run |
| LM-007 | Deny location permission | Clear non-crashing error message is shown | Not run |
| LM-008 | Search a known Sri Lankan place | Results are shown and selection moves the map | Not run |
| LM-009 | Search with no results | Helpful empty state appears | Not run |
| LM-010 | Start GPS recording | Recording state is visible and valid samples are collected | Not run |
| LM-011 | Stop GPS recording | Watch is stopped and track can be downloaded | Not run |
| LM-012 | Refresh after local track save | Saved local track is restored where browser storage remains available | Not run |
| LM-013 | Import valid GeoJSON LineString | Track is validated and displayed | Not run |
| LM-014 | Import invalid/out-of-area GeoJSON | File is rejected safely with a clear message | Not run |
| LM-015 | Create road issue export | A JSON report is downloaded; UI does not claim server submission | Not run |

## B. Responsive and accessibility

| ID | Test | Expected result | Result |
|---|---|---|---|
| LM-016 | Desktop viewport | Sidebar and map fit without overlap | Not run |
| LM-017 | Mobile viewport | Map and controls remain usable without horizontal overflow | Not run |
| LM-018 | Touch gestures | Pan, pinch zoom and buttons work on touch devices | Not run |
| LM-019 | Keyboard navigation | Interactive controls can be reached and activated by keyboard | Not run |
| LM-020 | Screen reader labels | Inputs, buttons, map status and errors have meaningful labels | Not run |
| LM-021 | Text scaling | Controls remain readable at 200% zoom | Not run |

## C. Reliability, security and performance

| ID | Test | Expected result | Result |
|---|---|---|---|
| LM-022 | Offline / provider failure | Clear recoverable error; no false success | Not run |
| LM-023 | Slow network | Loading state shown; requests time out safely | Not run |
| LM-024 | Repeated search | Older requests are cancelled or ignored; no stale results overwrite newer ones | Not run |
| LM-025 | Malformed search input | Input is bounded and handled safely | Not run |
| LM-026 | Browser console | No uncaught errors during core journeys | Not run |
| LM-027 | Secret scan | No private keys, tokens or credentials committed | Not run |
| LM-028 | Attribution | Tile/data provider attribution remains visible and legible | Not run |
| LM-029 | Provider policy | Tile/geocoding usage complies with selected provider terms | Not run |
| LM-030 | Performance baseline | Initial render and interaction metrics recorded on desktop and mid-range mobile | Not run |

## D. Phase 1 release gate

- [ ] All baseline regression tests pass.
- [ ] All mobile and desktop critical tests pass.
- [ ] No open critical/high severity defects.
- [ ] Provider terms, attribution and usage limits reviewed.
- [ ] No secrets in repository or browser bundle.
- [ ] Deployment URL and exact commit recorded.
- [ ] UAT evidence attached to the release record.
- [ ] Product owner approval recorded.

## Defect record template

- Defect ID:
- Test ID:
- Severity: Critical / High / Medium / Low
- Environment:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence:
- Fix commit:
- Retest result:
