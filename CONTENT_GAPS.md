# Content Gaps vs. Scope of Work

Checklist for scope alignment and client decisions.

| Scope Item | Status | Action / Notes |
|------------|--------|----------------|
| **Landing page bio blurb** | ✅ Done | Hero has bio blurb below district line: *"David Sabry Guirgis is a social worker, organizer and democratic socialist running for Hudson County Commissioner to win for the working class."* |
| **"WTF is a commissioner" wording** | ⚠️ Verify with client | Section uses formal heading **"What is a County Commissioner?"** per brand. If informal "WTF is a commissioner" tone is preferred, update in `Commissioner.tsx`. |
| **Donor solicitation copy ("THEY HAVE THE MONEY...")** | ✅ Done | Donate section includes **"They have the money. We have each other. Chip in now:"** above amount buttons. |
| **"We deserve more." policy opener** | ✅ Done | Issues section has **"We deserve more."** above the Big Four header. |
| **Full policy explainer text** | ✅ Done | Policy cards have expandable "Read more" with full explainer copy. |
| **Individual endorser headshots** | ✅ Structure in place | Brennan, Brooks, Ephros, Little, Griffin are in `lib/constants/endorsements.ts` with placeholder images. Replace `image` paths under `/images/endorsements/` when headshots are available. |
| **Volunteer page** | ✅ Exists | Available at **/volunteer** (`app/volunteer/page.tsx` → `VolunteerPageContent`). |
| **Donation pop-up** | ✅ Done | **Timed (45s)** and **exit-intent** (mouse leaving top of viewport) trigger `DonateModal` once per session. See `DonationModalTrigger.tsx` and `ClientLayout.tsx`. |
| **Privacy Policy page** | ✅ Exists | **/privacy** — link in footer. |
| **Terms of Service page** | ✅ Exists | **/terms** — link in footer. |
| **Video integration** | ⚠️ Clarify with client | Not currently prominent on landing page. If a hero or section video is still needed, confirm placement and source. |
| **Photography credit** | 📝 Pending | Footer shows "Photography: TBD". Replace with photographer name once confirmed. |
