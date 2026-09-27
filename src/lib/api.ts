export async function apiGet(path: string) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}
export async function apiPost(path: string, body: any) {
  const res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}
export const INSTAGRAM_URL = 'https://www.instagram.com/the_bliss_decor_events/';
export const INSTAGRAM_HANDLE = '@the_bliss_decor_events';
export const WHATSAPP_NUMBER = '918446569599';
export const PHONE_DISPLAY = '+91 84465 69599';
export const PHONE_TEL = 'tel:+918446569599';
export const CONTACT_EMAIL = 'poojananwani9@gmail.com';
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export function gmailLink(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export function formatINR(n: number) {
  return '\u20B9' + n.toLocaleString('en-IN');
}
