---
name: Hearth & Harvest
colors:
  surface: '#fbfbe2'
  surface-dim: '#dbdcc3'
  surface-bright: '#fbfbe2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f5dc'
  surface-container: '#efefd7'
  surface-container-high: '#eaead1'
  surface-container-highest: '#e4e4cc'
  on-surface: '#1b1d0e'
  on-surface-variant: '#4e453d'
  inverse-surface: '#303221'
  inverse-on-surface: '#f2f2d9'
  outline: '#80756c'
  outline-variant: '#d2c4ba'
  surface-tint: '#725a42'
  primary: '#33210d'
  on-primary: '#ffffff'
  primary-container: '#4b3621'
  on-primary-container: '#bd9f83'
  inverse-primary: '#e1c1a4'
  secondary: '#56642b'
  on-secondary: '#ffffff'
  secondary-container: '#d6e7a1'
  on-secondary-container: '#5a682f'
  tertiary: '#332100'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f3500'
  on-tertiary-container: '#d39a25'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fedcbe'
  primary-fixed-dim: '#e1c1a4'
  on-primary-fixed: '#291806'
  on-primary-fixed-variant: '#59422c'
  secondary-fixed: '#d9eaa3'
  secondary-fixed-dim: '#bdce89'
  on-secondary-fixed: '#161f00'
  on-secondary-fixed-variant: '#3e4c16'
  tertiary-fixed: '#ffdeab'
  tertiary-fixed-dim: '#fabc46'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#fbfbe2'
  on-background: '#1b1d0e'
  surface-variant: '#e4e4cc'
typography:
  display-lg:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Literata
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Literata
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Literata
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is built to evoke the atmosphere of a local sanctuary—a place of warmth, organic growth, and community connection. The brand personality is grounded and welcoming, leaning into a **Modern Tactile** aesthetic. 

The visual language balances the reliability of a long-standing local institution with the freshness of artisanal craft. It utilizes soft textures, generous whitespace to prevent digital clutter, and a deliberate "human" touch in its presentation to mirror the physical experience of a cozy cafe in Cadillac.

## Colors
The palette is rooted in the natural world. 
- **Primary (Deep Coffee):** Used for primary actions, main text, and structural elements to provide grounding and authority.
- **Secondary (Sage Green):** Applied to secondary interactions and decorative motifs to evoke a sense of calm and freshness.
- **Background (Cream):** A soft, eye-straining-free alternative to pure white, providing a paper-like quality to the UI.
- **Accents (Caramel & Leaf):** Used sparingly for highlights, success states, or seasonal promotions to add warmth and organic vibrancy.

## Typography
The typographic strategy pairs the literary, slightly rustic charm of **Literata** with the clean, friendly modernism of **Be Vietnam Pro**. 

- **Headlines:** Use Literata for all headings. It provides a "hand-crafted" editorial feel that distinguishes the cafe from fast-food chains.
- **Body & UI:** Use Be Vietnam Pro for menus, descriptions, and functional labels. It ensures high legibility on mobile devices while maintaining a soft, approachable character.
- **Hierarchy:** Maintain high contrast between heading sizes and body text to guide the user's eye through the menu and story sections.

## Layout & Spacing
The layout follows a **Fluid-Fixed hybrid model**. Content is contained within a 1200px max-width container on desktop, centered with generous outer margins to emphasize the "cozy" and "focused" brand nature.

- **Grid:** A 12-column grid for desktop and a 4-column grid for mobile.
- **Rhythm:** Use multiples of 8px for all padding and margins. 
- **Spaciousness:** Avoid dense information clusters. Every element should have "room to breathe," reflecting the relaxed pace of a local cafe.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layering** and **Ambient Shadows**. 

- **Surface Levels:** The base layer is the Cream (#F5F5DC). Floating cards and menus use a slightly lighter, pure-white surface to lift them off the page.
- **Shadows:** Use extremely soft, diffused shadows with a slight warm tint (e.g., `rgba(75, 54, 33, 0.08)`). Avoid harsh, black shadows.
- **Interactive Depth:** Buttons should feel "pressed" when active using a subtle inner shadow or a slight vertical translation (1-2px) rather than a heavy color shift.

## Shapes
The shape language is consistently **Rounded**. There are no sharp corners in this design system, as they feel too corporate or aggressive for a cozy brand.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Container Elements:** Large sections and featured images use the `rounded-xl` setting (1.5rem / 24px) to create a soft, framing effect.
- **Icons:** Use icons with rounded terminals and medium stroke weights to match the typography.

## Components
- **Buttons:** Primary buttons are solid Deep Coffee with Cream text. Secondary buttons are Sage Green outlines with Sage text. All buttons have high padding (12px 24px) to feel substantial and "touchable."
- **Cards:** Used for menu items. Cards feature a subtle 1px border in a darker cream shade and the standard ambient shadow. Images within cards should always have the top corners rounded.
- **Chips:** Used for dietary labels (e.g., "Vegan," "Gluten-Free"). These use a soft leaf green background with a low opacity to remain informative without being distracting.
- **Input Fields:** Soft cream backgrounds with a 1px Sage Green border when focused. Label text sits above the field in Literata (small) for a premium feel.
- **Lists:** Menu lists should use generous vertical spacing (16px between items) with a thin, dotted separator to evoke vintage cafe menu boards.
- **Special Component (The "Special Board"):** A featured card component with a Caramel border and Literata Display text, used to highlight daily specials or Cadillac-specific events.
