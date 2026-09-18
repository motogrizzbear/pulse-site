# Pulse Site

Public product, support, and privacy site for **Pulse**, the iPhone and Apple Watch app for pelvic-floor exercise guidance and personal bladder-diary tracking.

The application source stays in a separate private repository. This repository intentionally contains only public-facing copy, screenshots, and static website assets.

## Structure

```text
pulse-site/
├── index.html
├── support/
│   └── index.html
├── privacy/
│   └── index.html
├── assets/
│   ├── site.css
│   └── screenshots/
│       ├── pulse-iphone-01.png
│       ├── pulse-iphone-02.png
│       ├── pulse-iphone-03.png
│       ├── pulse-iphone-04.png
│       └── pulse-iphone-05.png
├── 404.html
└── .nojekyll
```

## Local preview

No build step or package manager is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

This site is designed to publish directly from the repository root with GitHub Pages.

After merging the site PR:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **`mainline`** and folder **`/ (root)`**.
4. Save.

The default project-site URLs will be:

- Product: `https://seattle-grizzly-coder.github.io/pulse-site/`
- Support: `https://seattle-grizzly-coder.github.io/pulse-site/support/`
- Privacy: `https://seattle-grizzly-coder.github.io/pulse-site/privacy/`

Use the support URL for App Store Connect’s **Support URL**, the privacy URL for **Privacy Policy URL**, and the root URL as the optional **Marketing URL**.

## Privacy and maintenance

- No analytics, ads, tracking pixels, cookies, accounts, forms, or third-party JavaScript are included.
- The site is plain semantic HTML and CSS.
- Keep medical claims conservative: Pulse is a personal tracking and exercise-guidance tool, not a diagnostic or treatment product.
- Do not publish private user reports, medical details, or application source code in this repository.
- Private support email: `pulse-app@motobear.dev`.
- Public, non-sensitive bug reports can be filed in this repository’s Issues.
