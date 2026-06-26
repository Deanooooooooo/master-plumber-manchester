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

- Pending: `npm run build`
- Pending: `npm run build:github`
- Pending: desktop screenshot
- Pending: mobile screenshot
- Pending: gallery/contact/footer screenshot
- Pending: live deployment and live QA
