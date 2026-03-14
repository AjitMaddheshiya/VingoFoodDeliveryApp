# Auth Buttons Fix TODO (SignIn/SignUp + Google)

**Issue:** Buttons not working (no action/redirect/errors?). Backend on Render: https://vingofooddeliveryapp-backend.onrender.com/ ✓ in App.jsx.

## Steps:
- [ ] Step 1: Read console/network tab errors (F12 in browser → Network → click buttons).
- [ ] Step 2: Add form validation + auto-submit on Enter in SignIn/SignUp.
- [ ] Step 3: Add useNavigate after successful login/signup/Google → to "/".
- [ ] Step 4: Fix SignUp mobile input type="tel". Test Google popup (Firebase config OK).
- [ ] Step 5: Restart frontend (`cd frontend && npm run dev`).
- [ ] Step 6: Test 4 buttons. attempt_completion.

**Notes:** 
- Handlers look correct (axios withCredentials:true).
- Likely: Empty fields → 400 error; Google popup blocked; no redirect.
- Check VSCode terminal for frontend/backend errors.
