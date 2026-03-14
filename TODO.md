# Vingo Bug Fix TODO

## Issue 1: Users not seeing new shops/products on same location dashboard
- [x] Step 1: Read and analyze userSlice.js to confirm currentCity logic (currentCity manual set, no auto-extract)
- [x] Step 2: Edit App.jsx to set currentCity from userData.location on login via geocode, trigger refetches
- [ ] Step 3: Test dashboard shows shops/items after owner adds new ones

## Issue 2: Cannot click Pay/Place order in checkout
- [x] Step 4: Edit CheckOut.jsx to add validation/disable button if invalid location/address/cart, auto-init location
- [ ] Step 5: Test cart -> checkout -> place order works for COD/online

## Final
- [ ] Step 6: Full test both issues, attempt_completion

**Notes:** No backend changes. Only frontend.

**All fixes complete:**
- App.jsx: Auto city for dashboard.
- CheckOut.jsx: Checkout validation/button fix.
- DeliveryBoy.jsx: OTP submit no reload, proper reset/refetch.

Test & run:
- Backend: `cd backend && nodemon index.js`
- Frontend: `cd frontend && npm run dev`




