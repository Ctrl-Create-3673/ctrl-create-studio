/* Portfolio content. Each project's images live in assets/work/<id>/NN.webp (+ NN-thumb.webp).
   `guide: 4` adds brand-guide pages (assets/work/<id>/guide-NN.webp) and a PDF (assets/guides/<id>.pdf). */
window.CC = {
  contact: {
    email: 'ctrlpluscreate3673@gmail.com',
    phone: '+91 95376 25252',
    tel: '+919537625252',
    whatsapp: 'https://wa.me/919537625252'
  },

  folders: [
    { id: 'logos',  name: 'Logos & Identity',  short: 'Logos',    color: 'purple' },
    { id: 'print',  name: 'Print & Editorial', short: 'Print',    color: 'blue' },
    { id: 'web',    name: 'Websites',          short: 'Websites', color: 'teal' },
    { id: 'motion', name: 'Motion & Video',    short: 'Motion',   color: 'orange' },
    { id: 'guides', name: 'Brand Guides',      short: 'Brand Guides', color: 'blue' },
    { id: 'brand',  name: 'Our Brand',         short: 'Our Brand', color: 'ink' },
    { id: 'tadbeer', name: 'Tadbeer',         short: 'Tadbeer',   color: 'sage' }
  ],

  projects: [
    // ---------------------------------------------------------------- logos & identity
    { id: 'aval-tech', folder: 'logos', guide: 4, title: 'Aval Tech', kind: 'Logo + brand guide', ext: 'ai', pages: 2, modified: 'Sep 2021',
      text: 'Logo for Aval Tech, a company offering complete solutions for flow-control systems. The mark combines the A and T into a valve-wheel emblem, delivered with a one-page guide covering colours, typography and how the letterforms were built.',
      tags: ['Logo design', 'Brand guide', 'Industrial'] },
    { id: 'kissan-india-agro', folder: 'logos', guide: 4, title: 'Kissan India Agro', kind: 'Logo', ext: 'ai', pages: 1, modified: 'Jan 2022',
      text: 'Wordmark for Kissan India Agro, an agriculture brand. The "i" grows into a sprouting leaf, set in fresh greens with a warm gold tagline.',
      tags: ['Logo design', 'Agriculture'] },
    { id: 'mufaddal-creation-logo', folder: 'logos', guide: 4, title: 'Mufaddal Creation', kind: 'Logo', ext: 'ai', pages: 1, modified: 'Oct 2023',
      text: 'Bilingual logo for Mufaddal Creation: Arabic calligraphy and a flowing English script, framed by a hand-drawn botanical wreath.',
      tags: ['Logo design', 'Calligraphy'], related: 'mufaddal-creation-website' },
    { id: 'calligraphy-name-logo', folder: 'logos', guide: 4, title: 'Calligraphy Name Logo', kind: 'Logo', ext: 'ai', pages: 1, modified: 'Dec 2021',
      text: 'A personal name mark in Arabic calligraphy, set inside an ornamental lantern with floral details.',
      tags: ['Logo design', 'Calligraphy'] },
    { id: 'nivedya-dies-tools', folder: 'logos', guide: 4, title: 'Nivedya Dies & Tools', kind: 'Logo · 6 variations', ext: 'ai', pages: 6, modified: 'Jun 2021',
      text: 'Monogram logo for Nivedya Dies & Tools, specialists in plastic moulds. The ND mark was explored in six colour and typography variations.',
      tags: ['Logo design', 'Monogram', 'Industrial'] },
    { id: 'noorani-ice-cream', folder: 'logos', guide: 4, title: 'Noorani Ice Cream', kind: 'Logo, card, menu & banner', ext: 'ai', pages: 3, modified: 'Dec 2021',
      text: 'Identity for Noorani Ice Cream: a badge logo, business card, flavour menu and a promotional banner.',
      tags: ['Logo design', 'Stationery', 'Menu design'] },
    { id: 'vvdg-world', folder: 'logos', guide: 4, title: 'VVDG World Pvt Ltd', kind: 'Logo · 3 directions', ext: 'ai', pages: 3, modified: 'Jul 2021',
      text: 'Three logo directions for VVDG World. The final mark brings air and sea freight together inside a single globe.',
      tags: ['Logo design', 'Logistics'] },
    { id: 'madrasa-ezziyah', folder: 'logos', guide: 4, title: 'Al-Madrasatul-Ezziyah', kind: 'Emblem', ext: 'ai', pages: 1, modified: 'Mar 2021',
      text: 'A calligraphic emblem for Al-Madrasatul-Ezziyah, a madrasa in Dohad.',
      tags: ['Emblem', 'Calligraphy', 'Education'] },
    { id: 'marjaan-traders', folder: 'logos', guide: 4, title: 'Marjaan Traders', kind: 'Logo + business cards', ext: 'ai', pages: 3, modified: 'Oct 2021',
      text: 'Logo and business cards for Marjaan, manufacturers and traders of cages for dogs, cats, rabbits and birds.',
      tags: ['Logo design', 'Business cards'] },

    // ---------------------------------------------------------------- print & editorial
    { id: 'shss-magazine', folder: 'print', title: 'The Academic Constellation', kind: 'School magazine · 53 pages', ext: 'pdf', pages: 16, modified: 'May 2026',
      text: 'The 2025–26 annual magazine for Saifiyah Higher Secondary School. Cover, contents and a selection of inside spreads covering the clubs, celebrations and achievements of the year.',
      tags: ['Editorial design', 'Magazine', 'Education'], related: 'saifiyah-school-website' },
    { id: 'bemcon-steel', folder: 'print', title: 'Bemcon Engineering', kind: 'Company brochure', ext: 'ai', pages: 14, modified: 'Jul 2021',
      text: 'A multi-page brochure for Bemcon Engineering: company profile, pipe fittings and flanges, manufacturing facilities, export markets and quality certificates.',
      tags: ['Brochure', 'Industrial', 'Print'] },
    { id: 'ascomech-brochure', folder: 'print', title: 'Ascomech Industries', kind: 'Brochure cover', ext: 'ai', pages: 1, modified: 'Aug 2021',
      text: 'Brochure cover for Ascomech Industries, manufacturers of mechanical seals, rotary joints and pump spares.',
      tags: ['Brochure', 'Industrial'] },
    { id: 'sakhi-engineers', folder: 'print', title: 'Sakhi Engineers', kind: 'Catalogue cover', ext: 'ai', pages: 1, modified: 'Sep 2021',
      text: 'Catalogue cover for Sakhi Engineers Pvt. Ltd., pioneers in industrial valves for the paper, petroleum, gas and engineering sectors.',
      tags: ['Catalogue', 'Industrial'] },
    { id: 'wedding-card', folder: 'print', title: 'Wedding Invitation', kind: 'Invitation card', ext: 'ai', pages: 1, modified: 'Aug 2022',
      text: 'A wedding invitation set in Arabic calligraphy, with a golden honeycomb pattern.',
      tags: ['Invitation', 'Calligraphy', 'Print'] },

    // ---------------------------------------------------------------- websites
    { id: 'saifiyah-school-website', folder: 'web', title: 'Saifiyah Higher Secondary School', kind: 'School website', ext: 'web', pages: 2, modified: 'Live',
      url: 'https://saifiyahschoolkhergone.net/',
      text: 'Website for Saifiyah Higher Secondary School: admissions, the gallery, newsletters, documents and school teams in one responsive site that works just as well on a phone.',
      tags: ['Web design', 'Development', 'Education'] },
    { id: 'mufaddal-creation-website', folder: 'web', title: 'Mufaddal Creation', kind: 'E-commerce website', ext: 'web', pages: 2, modified: 'Live',
      url: 'https://mufaddalcreation.com/',
      text: 'Online store for Mufaddal Creation, a Surat-based maker of safra sets, qadam sets, sujni, masallah and more. It includes product collections, a cart and wishlist, and ordering through WhatsApp.',
      tags: ['E-commerce', 'Web design', 'Development'], related: 'mufaddal-creation-logo' },

    // ---------------------------------------------------------------- motion
    { id: 'logo-reveal', folder: 'motion', title: 'Ctrl + Create Logo Reveal', kind: 'Motion · 0:18', ext: 'mov', video: 'assets/video/logo-reveal.mp4', poster: 'assets/video/logo-reveal.webp', thumb: 'assets/video/logo-reveal-thumb.webp', modified: 'Nov 2026',
      text: 'Our own identity animation. A pen draws the first C, Ctrl+C / Ctrl+V creates the second, a click presses play, and a typing caret turns into the +. It was built in After Effects from the real logo vectors, with sound design timed to every move.',
      tags: ['Motion design', 'After Effects', 'Sound design'] },
    { id: 'teaser-ctrl-plus', folder: 'motion', title: 'Teaser — "Ctrl + _"', kind: 'Instagram Reel · 0:08', ext: 'mov', video: 'assets/video/teaser-ctrl-plus.mp4', poster: 'assets/video/teaser-ctrl-plus.webp', thumb: 'assets/video/teaser-ctrl-plus-thumb.webp', modified: 'Nov 2026',
      text: 'A suspense teaser for our Instagram launch. A 3D Ctrl key is pressed and an empty key waits for its partner, with no logo yet.',
      tags: ['Motion design', 'Social', '3D'] },
    { id: 'bts-logo-reveal', folder: 'motion', title: 'Behind the Scenes', kind: 'Instagram Reel · 0:22', ext: 'mov', video: 'assets/video/bts-logo-reveal.mp4', poster: 'assets/video/bts-logo-reveal.webp', thumb: 'assets/video/bts-logo-reveal-thumb.webp', modified: 'Nov 2026',
      text: 'How the logo reveal was built: the After Effects timeline, the vector pen path, eased keyframes and the 3D camera move.',
      tags: ['BTS', 'After Effects', 'Social'] },

    // ---------------------------------------------------------------- our brand
    { id: 'ctrl-create-identity', folder: 'brand', title: 'Ctrl + Create Identity', kind: 'Brand sheet + logo family', ext: 'ai', pages: 2, modified: 'Nov 2026',
      text: 'Our own identity: a double-C monogram holding a cursor (design), a pen nib (craft) and a play button (video). The brand sheet covers the logo family, clear space, colour palette, typography and usage.',
      tags: ['Brand identity', 'Guidelines'] },
    // ---------------------------------------------------------------- tadbeer
    { id: 'tadbeer-app', folder: 'tadbeer', title: 'Tadbeer Planner', kind: 'Hijri planner web app', ext: 'web', pages: 4, modified: 'Live',
      url: 'https://ctrl-create-3673.github.io/tadbeer/', related: 'tadbeer-identity',
      text: 'Tadbeer (تدبير) is a personal planner built around the Mumineen Hijri calendar: dashboard, month / year / week / day calendar, tasks, events, notes, reminders, monthly and yearly planners, and a printable A4 PDF calendar in English and Arabic. It runs in the browser with no account, keeps your data on your device, installs like an app and can sync reminders to Google Calendar.',
      tags: ['Web app', 'Hijri calendar', 'Design', 'Development', 'PWA'] },
    { id: 'tadbeer-identity', folder: 'tadbeer', guide: 8, title: 'Tadbeer', kind: 'Logo, app icon & brand guide', ext: 'svg', pages: 4, modified: 'Nov 2026', related: 'tadbeer-app',
      text: 'The Tadbeer identity: a square kufic logo that spells تدبير twice with a calendar check at its centre, a simplified app tile for small sizes, a sage and burgundy palette and a short brand guide covering space, colour, type, voice and usage.',
      tags: ['Logo design', 'Kufic calligraphy', 'Brand guide', 'App icon'] }
  ]
};
