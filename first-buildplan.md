# Oddly Useful: Dawn Restyle Build Plan

Store: bkjigz-dn.myshopify.com
Base theme: Shopify Dawn (theme ID 147946995778)
Scope: Homepage and product page first

---

## Brand values (from Oddly Useful Logo.svg)

| Role | Hex | Use |
|---|---|---|
| Brand yellow | `#fcc503` | Buttons, badges, hero background, swoosh |
| Ink black | `#0b0a0a` | All text, borders, shadows |
| White | `#ffffff` | Page background, card faces |

Design rules:
- Yellow is for backgrounds, buttons, and badges. Black is for text.
- Never use yellow text on white (poor contrast).
- Thick black borders and hard offset shadows, no soft gradients.
- Restraint: bold styling on the hero, buttons, badges, and product cards only.

---

## Step 1: Load fonts and the brand stylesheet

File: `layout/theme.liquid`

Paste this just before `</head>`:

```liquid
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
{{ 'brand.css' | asset_url | stylesheet_tag }}
```

If Fredoka doesn't match the wordmark, try Baloo 2 (change the font name in both the link and `brand.css`).

---

## Step 2: Create the brand stylesheet

File: `assets/brand.css`

```css
/* Oddly Useful brand layer. Loaded after base.css. */
:root {
  --ou-yellow: #fcc503;
  --ou-ink: #0b0a0a;
  --ou-white: #ffffff;
  --ou-border: 3px solid var(--ou-ink);
  --ou-shadow: 5px 5px 0 var(--ou-ink);
  --ou-shadow-hover: 3px 3px 0 var(--ou-ink);
  --ou-radius: 16px;
  --ou-font-display: "Fredoka", sans-serif;
  --ou-font-body: "Inter", sans-serif;
}

body {
  background: var(--ou-white);
  color: var(--ou-ink);
  font-family: var(--ou-font-body);
}

h1, h2, h3,
.h0, .h1, .h2, .h3 {
  font-family: var(--ou-font-display);
  font-weight: 700;
  color: var(--ou-ink);
  letter-spacing: -0.01em;
}

/* Announcement bar */
.announcement-bar {
  background: var(--ou-yellow) !important;
  color: var(--ou-ink) !important;
  border-bottom: var(--ou-border);
  font-weight: 700;
}

/* Header */
.header-wrapper,
.header {
  background: var(--ou-white);
  border-bottom: var(--ou-border);
}

/* Buttons: sticker look */
.button,
.cart__checkout-button,
.product-form__submit {
  background: var(--ou-yellow) !important;
  color: var(--ou-ink) !important;
  border: var(--ou-border) !important;
  border-radius: 999px !important;
  box-shadow: var(--ou-shadow);
  font-family: var(--ou-font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: transform .1s ease, box-shadow .1s ease;
}
.button:hover,
.cart__checkout-button:hover,
.product-form__submit:hover {
  transform: translate(2px, 2px);
  box-shadow: var(--ou-shadow-hover);
}
.button--secondary {
  background: var(--ou-white) !important;
}

/* Product cards */
.card {
  background: var(--ou-white);
  border: var(--ou-border);
  border-radius: var(--ou-radius);
  box-shadow: var(--ou-shadow);
  overflow: hidden;
}
.card-wrapper:hover .card {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--ou-ink);
  transition: transform .15s ease, box-shadow .15s ease;
}

/* Sticker badges */
.badge,
.badge-sticker {
  background: var(--ou-yellow) !important;
  color: var(--ou-ink) !important;
  border: 2px solid var(--ou-ink);
  border-radius: 999px;
  font-family: var(--ou-font-display);
  font-weight: 700;
  padding: 4px 12px;
  transform: rotate(-4deg);
  display: inline-block;
}

/* Swoosh divider (from the logo) */
.ou-swoosh {
  height: 18px;
  background: var(--ou-yellow);
  border-top: var(--ou-border);
  border-bottom: var(--ou-border);
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  margin: 0 auto;
  width: 100%;
}

/* Footer */
.footer {
  background: var(--ou-ink);
  color: var(--ou-white);
}
.footer h2,
.footer h3 {
  color: var(--ou-yellow);
}
.footer a {
  color: var(--ou-white);
}

/* Homepage hero */
.ou-hero {
  padding: 48px 0;
  border-bottom: var(--ou-border);
  background: var(--hero-bg, var(--ou-yellow));
}
.ou-hero__inner {
  display: grid;
  gap: 32px;
  align-items: center;
}
.ou-hero__heading {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  margin: 16px 0;
}
.ou-hero__sub {
  font-size: 1.125rem;
  max-width: 36ch;
}
.ou-hero__img {
  width: 100%;
  height: auto;
  border: var(--ou-border);
  border-radius: var(--ou-radius);
  box-shadow: var(--ou-shadow);
  background: var(--ou-white);
}
@media (min-width: 750px) {
  .ou-hero__inner {
    grid-template-columns: 1fr 1fr;
  }
}

/* Product tip block */
.ou-tip {
  margin: 32px auto;
  padding: 24px;
  background: var(--ou-yellow);
  border: var(--ou-border);
  border-radius: var(--ou-radius);
  box-shadow: var(--ou-shadow);
}

/* Product page */
.product__title h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
}
.product__media-wrapper {
  border: var(--ou-border);
  border-radius: var(--ou-radius);
  overflow: hidden;
  box-shadow: var(--ou-shadow);
}
```

---

## Step 3: Homepage hero section

File: `sections/oddly-hero.liquid`

```liquid
<section class="ou-hero" style="--hero-bg: {{ section.settings.bg_color }};">
  <div class="ou-hero__inner page-width">
    <div class="ou-hero__copy">
      {% if section.settings.eyebrow != blank %}
        <p class="badge-sticker">{{ section.settings.eyebrow | escape }}</p>
      {% endif %}
      <h1 class="ou-hero__heading">{{ section.settings.heading | escape }}</h1>
      {% if section.settings.subheading != blank %}
        <p class="ou-hero__sub">{{ section.settings.subheading | escape }}</p>
      {% endif %}
      {% if section.settings.button_label != blank %}
        <a class="button button--primary" href="{{ section.settings.button_link }}">
          {{ section.settings.button_label | escape }}
        </a>
      {% endif %}
    </div>

    {% if section.settings.image != blank %}
      <div class="ou-hero__media">
        {{ section.settings.image | image_url: width: 1200 | image_tag: class: 'ou-hero__img', loading: 'eager' }}
      </div>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Oddly Useful hero",
  "tag": "section",
  "class": "section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Badge text", "default": "New drop" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Oddly useful finds" },
    { "type": "textarea", "id": "subheading", "label": "Subheading", "default": "Things you didn't know you needed, shipped fast." },
    { "type": "text", "id": "button_label", "label": "Button label", "default": "Shop now" },
    { "type": "url", "id": "button_link", "label": "Button link" },
    { "type": "image_picker", "id": "image", "label": "Product image" },
    { "type": "color", "id": "bg_color", "label": "Background", "default": "#fcc503" }
  ],
  "presets": [{ "name": "Oddly Useful hero" }]
}
{% endschema %}
```

Placement: Theme Editor → Homepage → Add section → "Oddly Useful hero" → drag to the top. Remove the default image banner if you don't want both.

---

## Step 4: "How it's useful" block for product pages

File: `sections/oddly-useful-tip.liquid`

```liquid
<div class="ou-tip page-width">
  <h3>{{ section.settings.heading | escape }}</h3>
  <div class="rte">{{ section.settings.body }}</div>
</div>

{% schema %}
{
  "name": "Oddly Useful tip",
  "tag": "section",
  "class": "section",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "How it's useful" },
    { "type": "richtext", "id": "body", "label": "Text", "default": "<p>Describe the everyday problem this product solves.</p>" }
  ],
  "presets": [{ "name": "Oddly Useful tip" }]
}
{% endschema %}
```

Placement: Theme Editor → Product page template → Add section → "Oddly Useful tip" → move below the add-to-cart button.

---

## Step 5: Logo and favicon (Theme Editor, no code)

- **Logo:** Theme settings → Header → Logo. Upload `Oddly Useful Logo.svg`. Set width to about 180px.
- **Favicon:** Theme settings → Favicon. Shopify does not accept SVG favicons. Export the lightbulb as a 512×512 PNG.

---

## Step 6: Test and deploy

1. Run `shopify theme dev --store bkjigz-dn.myshopify.com` and keep it running.
2. Check the homepage and a product page at 375px width first, then desktop.
3. Run `shopify theme check` and fix all errors.
4. Commit:
   ```bash
   git add .
   git commit -m "Oddly Useful brand: hero, tip block, buttons, cards"
   ```
5. Push as unpublished:
   ```bash
   shopify theme push --store bkjigz-dn.myshopify.com --unpublished
   ```
6. Preview in Shopify admin, then publish when it passes.

---

## Watch-outs

- **`!important` on buttons:** Dawn's color schemes set button colors through their own variables, so the brand rules need `!important` to win. Don't use it elsewhere.
- **Dawn updates:** Keep brand changes in `brand.css` and the two new sections. Avoid editing Dawn core files so future merges stay easy.
- **Selectors:** The product page selectors follow Dawn's standard structure. If a rule doesn't apply, right-click the element in the preview → Inspect, and replace the selector with the class it actually uses.

---

## Measurement

Before publishing, record the current add-to-cart rate on the product page. Compare after 1 to 2 weeks.
- Holds or rises: the styling is working.
- Drops: the bold styling is getting in the way. Soften the shadows or yellow before changing anything else.