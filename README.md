# 1-2-1 Tutor Agency website

Static site for GitHub Pages. No build step, no dependencies.

## Deploy

1. Create a public repo and push these files to the root of the `main` branch.
2. Repo Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The `CNAME` file sets the custom domain to 121tutoragency.com.
4. At the DNS provider, replace the Bluehost records with:
   - A records for `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - CNAME for `www`: `<your-github-username>.github.io`
5. Once the certificate is issued, tick "Enforce HTTPS" in Settings > Pages.

Do not touch MX records unless email is moving too.

## Contact form

Uses the existing FormSubmit alias (already verified), sent via its AJAX endpoint
so visitors see a confirmation on the page. Without JavaScript it posts normally
and redirects to /thanks.html. A hidden honeypot field filters basic spam bots.
