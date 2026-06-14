# Clow Skincare — Design System

> *La skincare coréenne sélectionnée pour une peau saine et lumineuse.*

Clow Skincare (**clowskincare.com**) is a French-language, EU-wide **K-beauty e-commerce boutique** built on Shopify. It curates authentic Korean skincare (Anua, Axis-Y, Beplain, Round Lab, Torriden, Numbuzin, LANEIGE, Medicube, SKIN1004, etc.) and packages it into **routines and packs by skin concern**, with a **skin-type quiz** that recommends products, and a **loyalty / points program** (15% off the first order on sign-up, points earned on every purchase).

This design system is the brand's single source of truth for building well-branded interfaces and assets — production or throwaway — for the website, email flows, and marketing.

---

## Brand at a glance

| | |
|---|---|
| **Name** | Clow Skincare · wordmark "Clow" + Korean subtitle **스킨케어** (*skincare*) |
| **Category** | Curated Korean skincare (K-beauty) e-commerce |
| **Market** | France-first; ships across the EU + UK (EUR primary; FR / NL / EN) |
| **Platform** | Shopify |
| **Personality** | Warm, editorial, calm, expert-but-friendly. Quiet luxury, not clinical. |
| **Core colour** | Espresso brown `#51361f` on cream `#f2f1ec` (sampled from the logo) |
| **Voice** | French, informal **"tu"**, encouraging, sensorial |

### What the product does (surfaces represented here)
1. **Website / storefront** — homepage, routine & pack collections, product pages, the skin-type **quiz**, cart, account & **loyalty / points** dashboard.
2. **Email flows** — welcome (15% code), order/shipping, abandoned cart, points & rewards, routine recommendation, win-back.

### Routines / skin concerns (the spine of the catalogue)
- **Routine Hydratation** — dry / dehydrated skin
- **Routine Anti-imperfections & Pores** — blemish-prone, enlarged pores
- **Routine Anti-Âge** — fine lines, firmness
- **Routine Glass Skin** — luminous, dewy finish
- **Routine Peau Sensible** — reactive / sensitive skin

Each routine maps to a **dusty pastel accent** (see Visual Foundations → Skin-concern accents).

### Real catalogue reference (prices in EUR, comma decimals)
**Packs:** Hydratation €40,95 (~~€50,95~~) · Anti-Aging €49,95 (~~€59,95~~) · Peau Sensible €69,95 (~~€79,95~~) · Anti-Imperfections €75,95 (~~€85,95~~) · Glass Skin €79,95 (~~€89,95~~).
**Products (28 packshots in `assets/products/`, categorised):** Round Lab 1025 Dokdo Cleansing Oil · Anua Heartleaf Cleansing Oil · Anua Azelaic Acid 10 · Torriden Dive-In Serum & Soothing Cream · VT Reedle Shot 100 · AXIS-Y PHA Resurfacing Glow Peel & Glass Skin Duo · Medicube PDRN Pink Peptide Glow Serum · Celimax Vita-A Retinal Shot · Dr. Althea 345 Relief Cream · SKIN1004 Centella Cream & Brightening Toner · Aestura Atobarrier 365 Cream · Centellian 24 Madeca Cream · Innisfree Volcanic Pore Clay Mask · Arencia Fresh Green Clay Mask · Round Lab Birch Juice Pad · LANEIGE Water Sleeping Mask · Numbuzin No.5+ Pads · Skinfood Carrot Carotene Pad · Purito Centella Eye Cream · LANEIGE Lip Sleeping Mask & Lip Glowy Balm (Milky Way / Pink Supernova) · Yunjac Base Prep · Shiseido Fino Shampoo & Hair Mask. Categories: **Nettoyants · Lotions · Sérums · Crèmes · Masques · Yeux · Lèvres · Teint · Cheveux.**
**Trust strip:** Expédition sous 1–2 jours · Produits authentiques de Corée · Paiement sécurisé · Échantillons offerts.
**Social:** Instagram **@clowskincare_** · TikTok **@clowskincare** · Pinterest **@clowskincare** · hello@clowskincare.com

---

## Sources used to build this system
The reader may not have access to these — they are recorded for provenance.
- **Logo:** `uploads/Logo écrit Clow.jpg` (provided) → copied to `assets/logo-clow.jpg`.
- **Live site:** https://clowskincare.com (homepage, `/pages/quiz-skincare`, `/collections/packs`) — read for catalogue, copy, structure, tone.
- **Stated competitive references:** soooraskin.com, hannacoreana.com (named by the owner as peers; *not* copied — Clow's own brand drives this system).
- **Brief:** owner wants the same features as the live site but a **better website and a strong email flow.**

> ⚠️ No codebase or Figma file was provided. Visual foundations below are **derived from the logo + live site** and elevated into a coherent system. Product photography on the live site is hosted on Shopify's CDN and could not be copied in; UI kits use neutral placeholders / image-slots where real photos belong. See **Caveats** at the bottom.

---

## CONTENT FUNDAMENTALS

How Clow writes. Copy is **French, warm, and personal** — it talks *to* one person about *their* skin.

**Person & address — informal "tu".** Never "vous" in marketing copy.
- *"Donne à ta peau ce dont elle a besoin."*
- *"Tu ne sais pas quelle crème est faite pour toi ? Passe notre test."*
- *"Découvre ton type de peau."*
- *"Rejoins notre newsletter."*

**Voice = a knowledgeable friend, not a lab.** Sensorial and reassuring, lightly aspirational. Leans on K-beauty vocabulary the audience already loves: *routine, glass skin, hydratation, éclat, peau lumineuse, synergie, soin*.
- *"Ma peau me parle tous les jours. Bien choisir mes produits pour répondre à mes besoins, quand j'en ai besoin."*
- *"Une manière simple et élégante d'offrir à ta peau une routine d'exception."*

**Casing.** Sentence case for body and most headings. Product/pack names use **Title Case** and keep brand model names verbatim (*1025 Dokdo Cleanser*, *345 Relief Cream*, *Pack Routine Glass Skin*). Eyebrows/nav may be UPPERCASE with wide tracking, used sparingly.

**Numbers & price.** European format — **comma decimal, € before or after per locale** (the store shows `€14,95`). Discounts show *Prix promotionnel* next to a struck *Prix régulier*. "−15%" framing for the welcome offer.

**Emoji.** Essentially none in UI copy. A single **🇰🇷** appears as a provenance cue ("authentique de Corée") and is the *only* sanctioned emoji — use rarely, never decoratively in headings or buttons.

**Buttons / CTAs.** Short, action-first, "tu" implied: *Ajouter au panier, Choisir, Passe le test, Découvre, Rejoins, Voir la routine, Profite de −15%.*

**Bilingual texture.** The brand's Korean subtitle (**스킨케어**) and concept words (glass skin) are part of the identity. Korean may appear as a small typographic accent — never as body copy the French reader must parse.

**Do / Don't**
- ✅ "Ta routine, simplifiée." ❌ "Nos solutions skincare innovantes pour tous."
- ✅ "On t'envoie 15% pour ta première commande." ❌ "Bénéficiez d'une réduction promotionnelle."
- ✅ Calm, specific, benefit-led. ❌ Hype, ALL-CAPS shouting, exclamation spam.

---

## VISUAL FOUNDATIONS

The Clow look is **warm editorial minimalism**: lots of cream space, espresso-brown type, an elegant high-contrast serif for big moments, generous air, soft dusty pastels to code skin concerns, and real product photography against neutral backgrounds. Think *quiet luxury apothecary*, not clinical-blue pharmacy.

**Colour.**
- **Foundation is warm-neutral:** espresso `#51361f` / deep `#2e1d0e` text on cream `#f2f1ec`, with mocha/latte/sand/almond mid-tones for hierarchy. This warm brown↔cream axis carries ~90% of every screen.
- **Accent = dusty pastels, one per skin concern** (`--c-hydra`, `--c-pores`, `--c-age`, `--c-glass`, `--c-sensitive`), each with a pale tint for fills/badges. They are **muted on purpose** so they sit calmly on cream — never neon, never candy.
- **Semantic** colours are warm-shifted (terracotta error, olive success, amber warning) so nothing breaks the palette. Sale price is clay-red `#a8493f`.
- **Avoid:** cool blue-greys, purple gradients, pure black, hard white-on-white clinical looks.

**Typography.**
- **Display:** *Cormorant Garamond* (serif) — hero headlines, editorial titles, the "Clow" feel. Used **large, with tight tracking and generous leading**, often at 400–500 weight.
- **UI / body:** *Hanken Grotesk* — clean humanist grotesque, warm enough not to feel techy. Handles nav, buttons, prices, forms.
- **Korean:** *Noto Sans KR* for any Hangul.
- **Eyebrows:** Hanken Grotesk, uppercase, `0.16em` tracking, latte colour. Pairing rule: **serif for the emotional line, sans for everything functional.**

**Spacing & layout.** 4-pt spacing scale; **very generous whitespace**. Content sits on a centred max-width (~1200px) with wide gutters. Section rhythm is tall (80–128px vertical padding). Editorial **asymmetry** is welcome — offset image/text splits, oversized serif headings against small sans labels. Grids: 2-up for routines, 3–4-up for product cards.

**Backgrounds.** Predominantly **flat cream / warm-cream blocks** — no busy patterns. Alternate sections between `--cream` and `--cream-warm`, plus occasional **full-bleed lifestyle/product photography** and **espresso blocks** for contrast moments (footer, promo bands). Subtle warm grain/texture is acceptable; **no loud gradients**. The brand's own backdrops read warm and softly lit.

**Imagery vibe.** Warm, soft daylight, low-contrast, beige/sand/skin tones; minimal props; product-forward on neutral surfaces. Lifestyle shots feel calm and natural. No cold studio blue, no heavy grain, no high-saturation.

**Cards.** Soft, light: `--surface` (porcelain) on cream, hairline `--border`, radius `--r-md`→`--r-lg`, **soft warm-tinted shadow** (`--shadow-sm`/`md`) that deepens on hover. Product cards are often near-borderless — image on a faint tint, name + price below, lots of breathing room.

**Corner radii.** Soft but not bubbly: inputs/buttons `--r-sm`/pill, cards `--r-md`–`--r-lg`, hero media `--r-xl`. Pills (`--r-pill`) for chips, badges, filter tags and the primary CTA when playful.

**Borders.** Thin warm hairlines (`#e3d8c6`). Dividers are sand-coloured, never grey. Inputs use a 1px border that darkens to espresso on focus (no heavy blue focus ring — use a soft espresso ring).

**Shadows / elevation.** Warm-tinted, soft, low-spread (`rgba(46,29,14,…)`). Elevation is gentle: xs for inputs, sm for resting cards, md on hover, lg for modals/menus. Prefer shadow + hairline over hard outlines.

**Buttons & states.**
- *Primary:* espresso fill, cream text, pill or `--r-sm`. **Hover:** darken to `--espresso-deep` + slight lift (shadow-sm→md). **Press:** scale `.98`, shadow collapses.
- *Secondary:* transparent with espresso hairline + espresso text; hover fills `--almond`.
- *Text/link:* mocha, underline on hover.
- Transitions short and eased (`--dur` `--ease-out`). No bounce. Opacity/colour shifts over motion.

**Motion.** Restrained and elegant: **fades and short rises** (8–16px), `--ease-out`, 160–520ms. Image reveals and section entrances fade up. Hovers are colour/elevation, not transforms beyond a 1–2px lift or `.98` press. No infinite loops, no spring/bounce.

**Transparency & blur.** Used lightly: a translucent cream header that blurs (`backdrop-filter`) over content on scroll; soft scrim gradients over full-bleed photos to protect overlaid text (bottom-up espresso→transparent). Otherwise surfaces are opaque.

**Layout fixtures.** Sticky translucent top nav; floating cart/quiz affordances are minimal. Trust strip ("Expédition 1–2 jours · Authentique · Paiement sécurisé · Échantillons offerts") recurs near the fold and footer. Footer is an espresso block.

---

## ICONOGRAPHY

Clow's iconography is **minimal, line-based, and warm** — icons are functional, never decorative clutter, and always inherit the espresso/mocha text colour (`stroke: currentColor`).

- **Style:** thin-to-medium **stroke / outline** icons, ~1.5px, rounded joins — quiet and apothecary-like. No filled glyph packs, no duotone, no 3D.
- **Set used here:** **Lucide** (CDN) is adopted as the house line set because its 1.5px rounded-stroke geometry matches the brand's calm minimalism. Loaded from `https://unpkg.com/lucide@latest`. Common icons: `search, user, heart, shopping-bag, truck, shield-check, sparkles, leaf, droplet, sun, star, chevron-right, gift, check, plus, minus, x`.
  - ⚠️ **Substitution flag:** the live Shopify theme uses its own small inline SVGs; no icon font/sprite was available to copy. Lucide is the closest stroke-matched stand-in. Swap for the real set if/when provided.
- **Brand mark:** the wordmark is the primary brand asset — **`assets/logo-clow.png`** (transparent, espresso brown; use on light surfaces). For dark/espresso surfaces, recolour to cream (`#f4ece1`) via a `source-in` fill (the UI kits do this for headers/footers). Treat "Clow" + 스킨케어 as the identity lock-up; use the asset rather than re-typing it.
- **Emoji as icon:** avoid, except the single 🇰🇷 provenance cue (rare).
- **Social glyphs:** Lucide dropped brand logos, so Instagram + TikTok + Pinterest use small inline-SVG glyphs (in each kit's `Icon` component). Handles: Instagram **@clowskincare_**, TikTok **@clowskincare**, Pinterest **@clowskincare**.
- **Unicode/decorative:** a thin middot `·` separates trust-strip items; arrows use the icon set, not glyphs. Five-pointed star (`star`) for review ratings.

Never hand-draw bespoke SVG illustrations for the brand. Use real photography (image-slots) for imagery and the Lucide line set for UI icons.

---

## Index — what's in this system

| File / folder | What it is |
|---|---|
| `README.md` | This document — overview, content & visual foundations, iconography, index. |
| `colors_and_type.css` | All design tokens: colour, type, spacing, radii, shadow, motion. Import this first. |
| `SKILL.md` | Agent-Skill manifest so this system works as a downloadable Claude skill. |
| `assets/` | Brand assets — `logo-clow.png` (transparent wordmark), `photos/` (brand photos), `products/` (packshots), `photo-data.js` + `product-data.js` (data-URI registries for inlining; includes 5 pack-hero group shots + gift card). |
| `fonts/` | Webfont notes (fonts are loaded from Google Fonts — see caveats). |
| `preview/` | Small HTML cards that populate the **Design System** tab (colours, type, spacing, components…). |
| `ui_kits/website/` | Storefront UI kit — homepage, routines/packs, product, **skin quiz**, cart, loyalty. `index.html` + JSX components. |
| `ui_kits/email/` | Email-flow UI kit — welcome (−15%), order, abandoned cart, rewards, routine recommendation. |

**Start here:** open `preview/` cards for the visual language, then `ui_kits/website/index.html` for the storefront and `ui_kits/email/index.html` for the email flows.

---

## Caveats
- **Fonts are Google Fonts substitutions.** The wordmark "Clow" is a refined Garalde serif; *Cormorant Garamond* is the closest free match, paired with *Hanken Grotesk* (UI) and *Noto Sans KR* (Hangul). **Please confirm the real brand fonts** (and send the files) so we can swap them in and pin the wordmark exactly.
- **Self-contained HTML.** This host blocks token-less same-origin subresource requests, so every `preview/` card and UI-kit `index.html` **inlines** its tokens (and the logo as a data-URI) instead of linking `colors_and_type.css`. The modular `.jsx` sources remain the editable source of truth — change them, then re-inline into the `index.html`. When you build new Clow artifacts, inline the same way.
- **No codebase / Figma** was shared, so components are reconstructed from the live site + logo and *elevated* (the brief asks for a "better website"). They intentionally improve on the stock Shopify theme rather than clone it pixel-for-pixel.
- **Real brand photography** (8 shots) is now provided and lives in **`assets/photos/`** (web-optimised) with data-URI versions in **`assets/photo-data.js`** for inlining. The storefront hero, ritual band, quiz band and Instagram strip — and the email banners — use these. Product *grid* tiles still use warm placeholder swatches (no clean packshots yet); send packshots to fill them.
- **Icons** are Lucide (CDN) as a stroke-matched stand-in for the theme's inline SVGs.
