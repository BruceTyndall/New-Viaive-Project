export const STAY22_LMA_ID = "6a0219e46c3091a5e94620d2";
export const STAY22_AID = "viaive";

type Stay22Window = Window & {
  Stay22?: {
    params?: {
      lmaID: string;
    };
  };
};

export function loadStay22Script() {
  if (typeof window === "undefined") return;
  if (document.getElementById("stay22-lma")) return;

  const stay22Window = window as Stay22Window;

  stay22Window.Stay22 = stay22Window.Stay22 || {};
  stay22Window.Stay22.params = { lmaID: STAY22_LMA_ID };

  const s = document.createElement("script");
  s.id = "stay22-lma";
  s.async = true;
  s.src = "https://scripts.stay22.com/letmeallez.js";
  document.head.appendChild(s);
}

export function stay22DeepLink(hotelName: string, city: string): string {
  const q = encodeURIComponent(`${hotelName}, ${city}`);
  return `https://www.stay22.com/allez/booking?aid=${STAY22_AID}&q=${q}`;
}

export function stay22MapEmbedUrl(args: {
  lat: number;
  lng: number;
  zoom?: number;
  city: string;
}): string {
  const { lat, lng, zoom = 12, city } = args;
  const params = new URLSearchParams({
    aid: STAY22_AID,
    lat: String(lat),
    lng: String(lng),
    zoom: String(zoom),
    city,
  });

  return `https://www.stay22.com/embed/allez?${params.toString()}`;
}
