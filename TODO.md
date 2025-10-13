# TODO for Monsoon Days Project

## Current Task: Fix Journal Upload to Carry to Profile

- [x] Edit frontend/js/journaling.js: Redirect to profile.html after successful upload.
- [x] Edit frontend/js/journaling.js: Improve error handling with response details.
- [ ] Test journal upload flow: Submit on demo.html, check redirect and display in profile.html.
- [ ] Mark as complete.

## New Task: Fix Upload JPG Validation Error on Profile

Information Gathered:
- Frontend: No client-side JPG restriction; generic error alert on !response.ok.
- Backend: No file type validation in /journals POST/PUT; saves any image without check.
- Root cause: Likely missing validation causing failure for non-JPG or even JPG due to unhandled cases; add explicit check for jpg/jpeg/png.

Plan Steps:
- [ ] 1. Add image validation (extension & MIME) in backend/app.py /journals POST: Allow .jpg/.jpeg/.png, return {'error': 'Uploaded file must be jpg, jpeg, or png'} if invalid.
- [ ] 2. Add similar validation in backend/app.py /journals/<id> PUT route.
- [ ] 3. Update frontend/profile.html JS: In submit handler, if !response.ok, parse response.json() and alert data.error if present, else generic message.

## Previous Tasks
- [x] Add fake data to profile.html.
- [x] Fix OTP email sending code.
- [x] Other backend/frontend setups from README.
