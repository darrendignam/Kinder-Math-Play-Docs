# Kinder Math

Website, user guide, privacy policy and public issue tracker for **Kinder Math**, a maths
worksheet app for young children on Android and iOS.

- Website: <https://darrendignam.github.io/Kinder-Math-Play-Docs/>
- Report a problem: [Issues](https://github.com/darrendignam/Kinder-Math-Play-Docs/issues/new/choose)
- Ideas and questions: [Discussions](https://github.com/darrendignam/Kinder-Math-Play-Docs/discussions)

This repository holds the website only; the app's source code is not here.

## Editing the site

GitHub Pages builds the site with Jekyll from the `main` branch root. Pages are Markdown
(`guide.md`, `privacy.md`, `support.md`) or HTML (`index.html`), sharing
`_layouts/default.html`. Settings such as the contact email and store links are in
`_config.yml`.

Preview locally with Docker, then open <http://localhost:4000/Kinder-Math-Play-Docs/>:

```sh
docker compose up
```

## Custom domain

1. Add a `CNAME` file containing the domain, and set `url` to it and `baseurl` to `""`
   in `_config.yml`.
2. Point the domain's DNS at GitHub Pages and turn on **Enforce HTTPS** in the repository's
   Pages settings.
3. Update the URLs in `.github/ISSUE_TEMPLATE/config.yml` and in the store listings.

## Licences

The Andika font in `assets/fonts` is under the SIL Open Font License (`OFL.txt`).
