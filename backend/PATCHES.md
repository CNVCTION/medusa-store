# Medusa v2.15.5 Patches

These patches fix bugs in Medusa v2.15.5. They are applied directly to `node_modules` and will need to be re-applied after a fresh `pnpm install`.

## Patch 1: CORS origins must be strings, not arrays

**File:** `backend/medusa-config.js`  
**Issue:** `parseCorsOrigins` in `@medusajs/utils` expects a comma-separated string, but the config uses JS arrays.

**Fix:**
```diff
- storeCors: [process.env.STOREFRONT_URL || "http://localhost:8000"],
+ storeCors: process.env.STOREFRONT_CORS || "http://localhost:8000",
```

## Patch 2: JWT actor_id fallback

**File:** `node_modules/@medusajs/medusa/dist/api/auth/utils/generate-jwt-token.js`  
**Issue:** When authenticating as admin, the auth identity stores the user ID under `app_metadata.user_id`, but the JWT generator looks for `app_metadata.admin_id`. This causes `actor_id` to be empty string, which fails the auth middleware check.

**Fix (line ~16):**
```diff
- const entityId = authIdentity?.app_metadata?.[entityIdKey];
+ const entityId = authIdentity?.app_metadata?.[entityIdKey] ?? authIdentity?.app_metadata?.user_id;
```

## Patch 3: Admin auth middleware actor_type mismatch

**File:** `node_modules/@medusajs/framework/dist/http/router.js`  
**Issue:** The admin auth middleware is configured with `actorType: "user"`, but the login endpoint generates JWTs with `actor_type: "admin"`. The middleware rejects the JWT.

**Fix (line ~89):**
```diff
- ...applyAuthMiddleware).call(this, routesFinder, "/admin", "user", [
+ ...applyAuthMiddleware).call(this, routesFinder, "/admin", "admin", [
```

## Patch 4: Disable admin panel

**File:** `backend/medusa-config.js`  
**Reason:** Admin panel requires React dependencies that are not installed (registry is too slow).

```javascript
admin: {
    disable: true,
}
```
