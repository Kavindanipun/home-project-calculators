# GitHub Pages deployment

1. Create a public repository named `home-project-calculators`.
2. Upload the CONTENTS of this folder to the repository root (not the outer folder itself).
3. Before indexing, replace every occurrence of:
   `https://YOUR-USERNAME.github.io/home-project-calculators`
   with your real GitHub Pages base URL, for example:
   `https://yourusername.github.io/home-project-calculators`
4. GitHub: Settings → Pages → Deploy from a branch → `main` / `(root)`.
5. Open the live site and test all five calculators.
6. Add the exact live URL as a URL-prefix property in Google Search Console.
7. Submit `sitemap.xml` in Search Console and request indexing for the homepage and the five calculator pages.

IMPORTANT: Do not submit the sitemap until the placeholder URL has been replaced.

Search/replace command example on macOS/Linux:
`grep -rl 'YOUR-USERNAME.github.io/home-project-calculators' . --exclude=DEPLOY-GITHUB.md | xargs sed -i 's#https://YOUR-USERNAME.github.io/home-project-calculators#https://yourusername.github.io/home-project-calculators#g'`

The launch build intentionally contains no AdSense or Analytics scripts. Add those only after you update the Privacy Policy and implement any required consent flow.
