# Backend Development Plan for Monsoon Days Platform

## 1. Setup Dependencies
- [x] Create/update requirements.txt with Flask, Flask-CORS, Flask-SQLAlchemy, Flask-JWT-Extended, Flask-Mail, Werkzeug, python-dotenv
- [x] Install dependencies: pip install -r requirements.txt

## 2. Enhance Backend Models and Config
- [x] Update backend/config.py: Add MAIL settings, JWT secret, UPLOAD_FOLDER
- [x] Update backend/app.py: Add imports for JWT, Mail, Werkzeug; update models (hash passwords, add title/image_url to Journal); add JWT setup, Mail setup, upload folder config
- [x] Implement send_otp_email in backend/otp_utils.py using Flask-Mail

## 3. Secure Auth and Endpoints
- [x] Update /register: Hash password, send OTP
- [x] Update /verify-otp: Create user with hashed password
- [x] Update /login: Verify password, return JWT token
- [x] Protect POST endpoints with @jwt_required; add user_id from token
- [x] Add /upload-image endpoint for file uploads
- [x] Update /journals: Handle image upload, store URL; add title field
- [x] Add user-specific GETs (e.g., /journals/<user_id>)

## 4. Frontend Integration
- [x] Update frontend/js/journaling.js: Add fetch to POST /journals with FormData (title, desc, image), include JWT auth
- [x] Create/update frontend/js/register.js: Handle /register and /verify-otp calls
- [x] Update frontend/js/article.js: Fetch articles from /articles
- [x] Update frontend/js/community.js (if exists): Fetch/post community posts with auth
- [x] Update index.html login modal: Use real /login, store JWT in localStorage

## 5. Testing and Deployment
- [x] Run app.py to create DB tables
- [x] Test endpoints with curl or Postman
- [x] Use browser_action to test frontend-backend integration
- [x] Ensure CORS allows frontend (localhost:3000 or file://)
