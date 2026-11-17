/* No analytics vendor is activated here. Never put enquiry content in analytics. */
(() => {
  'use strict';
  const allowedEvents = new Set(['whatsapp_click', 'telephone_click', 'email_click', 'quote_form_start', 'quote_whatsapp_open']);
  function record(event) {
    if (!allowedEvents.has(event)) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event, enquiry_page: window.location.pathname});
  }
  function buildMessage(values) {
    return [
      'Hello Usahawan Canggih, I would like to request a quotation.',
      `Name: ${values.name.trim()}`,
      values.company.trim() ? `Company: ${values.company.trim()}` : '',
      `Project location: ${values.location.trim()}`,
      `Service: ${values.service}`,
      values.timing.trim() ? `Target start: ${values.timing.trim()}` : '',
      values.details.trim() ? `Project details: ${values.details.trim()}` : '',
      'I will attach any drawings / BQ / soil investigation information in this chat.',
      `Website enquiry: ${window.location.origin}${window.location.pathname}`
    ].filter(Boolean).join('\n');
  }
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const event = href.startsWith('https://wa.me/') ? 'whatsapp_click' : href.startsWith('tel:') ? 'telephone_click' : href.startsWith('mailto:') ? 'email_click' : null;
    if (event) link.addEventListener('click', () => record(event));
  });
  document.querySelectorAll('[data-quote-form]').forEach(form => {
    form.querySelector('[data-quote-submit]').disabled = false;
    let started = false;
    form.addEventListener('input', () => {if (!started) {record('quote_form_start'); started = true;}});
    // Native validation also prevents submit events for invalid fields.
    form.addEventListener('submit', event => {
      event.preventDefault();
      for (const input of form.querySelectorAll('input[required]')) {
        input.setCustomValidity(input.value.trim() ? '' : 'Please complete this field.');
        input.oninput = () => input.setCustomValidity('');
      }
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form));
      const url = 'https://wa.me/60104581313?text=' + encodeURIComponent(buildMessage(values));
      const next = form.querySelector('[data-whatsapp-next]');
      next.href = url;
      next.hidden = false;
      form.querySelector('[data-form-status]').textContent = 'Your message is ready. Attach your drawings/BQ and press Send in WhatsApp. If WhatsApp did not open, use the link below.';
      record('quote_whatsapp_open');
      // This opens a message draft only; the visitor sends it in WhatsApp.
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (popup) popup.opener = null;
    });
  });
})();
