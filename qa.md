# Master Plumber Manchester Ltd QA

## Source / Fact Audit

- PASS: Business name verified from Facebook, Nextdoor and Companies House.
- PASS: Profession verified from Facebook snippets, Nextdoor categories and Companies House SIC 43220.
- PASS: Phone `07512 413238` / `+447512413238` verified from Nextdoor.
- PASS: Public Nextdoor address `14 Albert Place, Manchester M45 8NE` recorded for map/contact.
- PASS: Companies House registered office `14 Albert Drive, Whitefield, Manchester M45 8AG` recorded as company record context.
- PASS: Services sourced from Facebook snippets and Nextdoor activity: plumbing, heating, bathroom refurbishments, boiler installation, gas, underfloor heating and kitchen work.
- BLOCKED: No verified public email found. Site uses call and SMS enquiry only.
- BLOCKED: Working hours unavailable from accessible public sources. Site does not display hours.

## Image / Media Audit

- PASS: `image-map.md` created before final QA and records all selected images.
- PASS: Real project images downloaded from public Nextdoor image URLs.
- PASS: Image dimensions checked with `sips`; selected gallery images are 675x900 portrait.
- PASS: Low-resolution `profile-bathroom.jpg` rejected for visible use.
- PASS: No stock project proof, no generated project proof, no duplicate gallery files.
- LIMITED: Gallery images are verified real images but appear to be one grey bathroom refurb project set, not multiple finishes/projects. Public copy has been tightened to describe verified refurb details rather than a varied portfolio.

## Testimonials / Proof Audit

- BLOCKED: Real named testimonial text was not accessible from Google/Facebook/Nextdoor snippets. Site does not invent review cards or review counts.
- PASS: Public proof is limited to source-backed business facts and real project images.

## Copy / Form / Link Audit

- PASS: One H1.
- PASS: One primary form in the hero.
- PASS: Form prepares an SMS to the verified public mobile number; no guessed email route.
- PASS: No upload/photo CTA.
- PASS: Footer links: phone, SMS, Facebook, Nextdoor and Google Maps.
- PASS: LocalBusiness/Plumber schema includes name, phone, address, geo, area served and sameAs links.

## Build / Visual QA

- PASS: `npm run build`
- PASS: `npm run build:github`
- PASS: desktop hero/form screenshot: `qa-desktop-hero.png`
- PASS: mobile hero/form screenshot: `qa-mobile-hero.png`
- PASS: gallery screenshot: `qa-desktop-gallery.png`
- PASS: contact screenshot: `qa-desktop-contact.png`
- PASS: map/footer screenshot: `qa-desktop-map-footer.png`
- PASS: GitHub Pages deployed from `gh-pages` with `.nojekyll`.
- PASS: Live HTML 200, CSS 200, hero image 200.
- PASS: Live HTML has one H1, one form, SMS/call routes, map iframe, schema, OG tags and canonical.
