export const publicationTimezone = 'India Standard Time (IST, Asia/Kolkata)';

export function istToUtc(date: string, time: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) throw new Error('Choose a valid publication date and time.');
  const instant = new Date(`${date}T${time}:00+05:30`);
  if (!Number.isFinite(instant.getTime())) throw new Error('Choose a valid publication date and time.');
  const roundtrip = utcToIstFields(instant.toISOString());
  if (roundtrip.date !== date || roundtrip.time !== time) throw new Error('Choose a valid publication date and time.');
  return instant.toISOString();
}

export function utcToIstFields(instant: string): { date: string; time: string } {
  const shifted = new Date(new Date(instant).getTime() + 330 * 60_000).toISOString();
  return { date: shifted.slice(0, 10), time: shifted.slice(11, 16) };
}

export function formatPublicationTime(instant: string): string {
  return `${new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'short' }).format(new Date(instant))} IST`;
}
