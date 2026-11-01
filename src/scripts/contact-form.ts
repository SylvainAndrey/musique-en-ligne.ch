const CONTACT_EMAIL = 'sylvain.andrey@musique-en-ligne.ch';

const form = document.getElementById('contact-form') as HTMLFormElement | null;

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();

  const subject = encodeURIComponent(`Message de ${name} via musique-en-ligne.ch`);
  const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
