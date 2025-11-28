export function generateRandomPoint(center, maxDistanceMeters) {
  const r = maxDistanceMeters / 111300; // convert meters to degrees

  let u = Math.random();
  let v = Math.random();

  let w = r * Math.sqrt(u);
  let t = 2 * Math.PI * v;

  let latOffset = w * Math.sin(t);
  let lngOffset = w * Math.cos(t);

  return {
    lat: center.lat + latOffset,
    lng: center.lng + lngOffset,
  };
}
