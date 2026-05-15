export const STAY22_LMA_ID = "STAY22_PARTNER_ID_PLACEHOLDER";
export const STAY22_AID = "STAY22_AID_PLACEHOLDER";

export function loadStay22Script() {
  if (typeof document === "undefined") return;
  if (document.querySelector("script[data-stay22]")) return;
  const s = document.createElement("script");
  s.src = `https://scripts.stay22.com/letmeallez.js?lmaID=${STAY22_LMA_ID}`;
  s.async = true;
  s.dataset.stay22 = "true";
  document.head.appendChild(s);
}

export function stay22DeepLink(hotelName: string, city: string) {
  const q = encodeURIComponent(`${hotelName} ${city}`);
  return `https://www.stay22.com/allez/booking?aid=${STAY22_AID}&q=${q}`;
}

export function stay22MapEmbedUrl(opts: { lat: number; lng: number; zoom?: number; city?: string }) {
  const { lat, lng, zoom = 13, city = "" } = opts;
  return `https://www.stay22.com/embed/gm?aid=${STAY22_AID}&lat=${lat}&lng=${lng}&zoom=${zoom}&maincolor=0b0b0c&markercolor=c8a96a&hidesearchbar=false&address=${encodeURIComponent(city)}`;
}
