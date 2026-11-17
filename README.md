# Usahawan Canggih website

Static HTML/CSS/JavaScript site at https://canggihgroup.com.my/. GitHub Pages publishes the repository root from `main`. Keep `CNAME` intact. There is no framework build or package installation step.

## Structure

- `index.html`: original company homepage, enquiry section and FAQs.
- Five service pages: `piling-contractor-sabah.html`, `rc-square-piling.html`, `spun-piling.html`, `pile-testing.html`, `civil-infrastructure-works.html`.
- `request-quotation.html`: WhatsApp draft form and FAQs.
- `assets/site.css`: shared original design; image paths are relative to `assets/`.
- `assets/lead-generation.css`: enquiry, service-page and responsive styles.
- `assets/enquiry.js`: form validation, WhatsApp draft creation, optional non-PII event queue.
- `assets/navigation.js`: service-page navigation.
- `robots.txt`, `sitemap.xml`, `404.html`: crawl/discovery and missing-page handling.

## Enquiry behaviour

The form does **not** submit an email, upload files, store a lead or send WhatsApp automatically. It opens a draft for the existing published WhatsApp contact. The visitor attaches documents and sends in WhatsApp. The visible fallback link supports popup-blocked browsers; native validation and a no-JavaScript direct-contact option remain available.

No Google Analytics vendor or measurement ID is configured. The optional `dataLayer` event queue contains only event names and page paths, not enquiry fields. `quote_whatsapp_open` is an attempted draft open, **not** proof of a received enquiry. Do not load a tracker or add a fictitious ID to imply tracking is connected. Use an authorized owner account and appropriate consent handling when configuring actual analytics.

## Editing and verification

1. Preserve verified contact details and existing assets. Do not invent project names, client endorsements, qualifications, branch addresses or review ratings.
2. Each indexable page needs one descriptive H1, unique title/description, a self-canonical URL and accurate structured data matching visible content.
3. Update internal links and `sitemap.xml` when adding/removing pages. Do not add the custom 404 page to the sitemap.
4. Check desktop/mobile layout, navigation, keyboard focus and required-field validation. Confirm the draft recipient, escaped message content and popup fallback without actually sending test messages.
5. Check CSS image paths, local anchors, image loading, JS console errors, JSON-LD parsing and HTTP status after deployment. Verify the Pages build commit matches the pushed commit.

The core homepage visual design predates the November 2026 enquiry/search improvements. Those improvements began at commit `02586c3`; the previous public commit was `33c3373`.
