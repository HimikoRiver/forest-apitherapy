# APIDARB — production security checklist

This checklist is part of the security hardening. Application-level protections are not enough if the Next.js process, PostgreSQL or SSH are directly exposed.

## 1. Required environment variables

Keep production secrets only on the server. Never commit them to Git.

```env
DATABASE_URL=...
BETTER_AUTH_URL=https://apidarb.ru
BETTER_AUTH_SECRET=...

LEGAL_OPERATOR_NAME=...
LEGAL_OPERATOR_INN=...
LEGAL_OPERATOR_OGRNIP=...
```

Requirements:

- `BETTER_AUTH_SECRET` must be a cryptographically random secret with at least 32 bytes of entropy.
- Restrict the production `.env` file to the application account, for example `chmod 600 .env`.
- If a secret has ever been committed, pasted into a public place or shared with an untrusted party, rotate it before deployment.
- Do not expose any server-only variable with a `NEXT_PUBLIC_` prefix.

## 2. Update dependencies before build

The application must use the patched Next.js release declared in `package.json`.

```bash
npm install
npm run security:audit
npm run build
```

`npm install` must regenerate `package-lock.json` so it matches `package.json`. Commit the regenerated lockfile before merging the production branch.

## 3. Apply database migration

The security migration adds persistent rate limiting and Better Auth two-factor tables.

```bash
npx prisma generate
npx prisma migrate deploy
```

Do not deploy the new authentication configuration before the migration has completed successfully.

## 4. Nginx reverse proxy

The Next.js process must listen only on the local interface and must not be directly reachable from the internet.

Recommended application binding:

```text
127.0.0.1:3000
```

Nginx must overwrite the client IP headers rather than forwarding arbitrary values supplied by a visitor:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

Better Auth rate limiting is configured to use `X-Real-IP`, so the origin must remain reachable only through the trusted Nginx proxy.

## 5. HTTPS

- Redirect all HTTP requests to HTTPS.
- Use a valid TLS certificate for `apidarb.ru` and `www.apidarb.ru`.
- Enable automatic certificate renewal.
- Do not expose an alternative unsecured production URL to the Next.js process.

The application sends HSTS in production. Enable HSTS only after HTTPS is confirmed to work correctly on the production domains.

## 6. Firewall

Allow only services that must be public.

Typical public ports:

```text
80/tcp
443/tcp
```

SSH should be restricted as tightly as operationally possible. PostgreSQL must not be public.

Verify that these are NOT reachable from the internet:

```text
3000/tcp  Next.js origin
5432/tcp  PostgreSQL
```

## 7. SSH

After confirming key-based access works:

```text
PasswordAuthentication no
PermitRootLogin no
```

Also:

- use a separate non-root deployment account;
- keep SSH keys out of the project directory;
- remove obsolete authorized keys;
- install and configure Fail2ban or an equivalent SSH brute-force protection;
- keep OpenSSH and the operating system patched.

Do not disable password/root login until a verified alternative administrator session is available.

## 8. PostgreSQL

- Bind PostgreSQL to localhost or a private interface only.
- Do not publish port 5432 through the firewall.
- Use a dedicated database user for this application.
- Give the application user only the privileges it actually needs.
- Use a strong unique database password.
- Back up the database regularly.
- Periodically test restoration from a backup; a backup that has never been restored is not a verified backup.
- Store backups with access controls separate from the web root.

## 9. Better Auth production checks

Before opening the site to users:

- `BETTER_AUTH_URL` must be exactly the production HTTPS origin.
- `BETTER_AUTH_SECRET` must exist and must not be a development value.
- Nginx must overwrite `X-Real-IP`.
- The server must be able to make outbound HTTPS requests to the Have I Been Pwned password API; the plugin sends only the password hash prefix, never the full password.
- Confirm rate-limit records are being created in the `rateLimit` table after repeated login requests.
- Enable 2FA for every `ADMIN` account before expecting admin routes to work.
- Store administrator backup codes offline in a secure location.

## 10. Admin protection

Admin routes are checked server-side and additionally require `twoFactorEnabled=true`.

After deployment:

1. Sign in as the administrator.
2. Open `/profile/security`.
3. Enable 2FA with an authenticator application.
4. Save the recovery codes offline.
5. Sign out.
6. Sign in again and verify that `/two-factor` is required before the session is created.
7. Confirm `/admin`, `/admin/products` and `/admin/orders` are unavailable to a normal user.

## 11. Security headers

After deployment verify the response headers:

```bash
curl -I https://apidarb.ru
```

Confirm the response includes at least:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy
Permissions-Policy
Cross-Origin-Opener-Policy
```

Also manually verify the Yandex map and all client-side interactions after CSP is enabled.

## 12. Logs

- Never log passwords, session tokens, authentication secrets or database connection strings.
- Avoid logging full customer addresses and phone numbers unless required for a specific operational reason.
- Restrict access to Nginx/application/database logs.
- Configure log rotation so disks cannot be exhausted by unbounded log files.
- Review authentication failures and unexpected admin activity periodically.

## 13. Backups and recovery

At minimum back up:

- PostgreSQL data;
- production environment configuration/secrets through an appropriate secret-management process;
- Nginx configuration;
- deployment/service configuration.

Do not store a plain-text backup of production secrets in a public repository or web-accessible directory.

## 14. Legal page production blocker

The legal pages intentionally do not invent seller details. Before production, set:

```text
LEGAL_OPERATOR_NAME
LEGAL_OPERATOR_INN
LEGAL_OPERATOR_OGRNIP
```

The site displays a visible draft warning while these values are missing.

## 15. Final release gate

Do not merge/deploy until all of the following pass:

- patched Next.js is installed and `package-lock.json` is regenerated;
- `npm run security:audit` is reviewed;
- `npm run lint` passes;
- `npm run build` passes;
- Prisma migration succeeds;
- normal registration and sign-in work;
- compromised-password rejection works;
- login rate limiting works;
- administrator 2FA setup and challenge work;
- normal users cannot access admin routes;
- legal pages render on mobile/tablet/desktop;
- footer links work on mobile/tablet/desktop;
- HTTPS/security headers are verified;
- PostgreSQL and port 3000 are not publicly reachable;
- seller FIO/INN/OGRNIP are filled in.
