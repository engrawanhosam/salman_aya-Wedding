import { invitation } from "@/data/invitation";
/** رابط الخريطة: يُستخدم venue.mapsUrl إن وُجد، وإلا بحث Google Maps بالعنوان. */
export function mapsHref(): string {
  const { venue } = invitation;
  if (venue.mapsUrl) return venue.mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.hotel} ${venue.address}`)}`;
}
