// Gera site/assets/img/brasil.svg a partir de data/geo/brazil-states.geojson.
// Projeção plate carrée com correção de latitude; simplificação por decimação + arredondamento.
// Sem dependências externas. Rodar: node site/scripts/generate-map.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const SRC = path.join(ROOT, "data/geo/brazil-states.geojson");
const OUT = path.join(ROOT, "site/assets/img/brasil.svg");

const W = 1000;                // largura do viewBox
const TOL = 1.1;              // tolerância de decimação (unidades do viewBox)
const MIN_RING = 3.5;        // descarta anéis (ilhas) com bbox menor que isso
const ROUND = 1;             // casas decimais

const geo = JSON.parse(fs.readFileSync(SRC, "utf8"));

// bbox global
let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
const eachCoord = (geom, fn) => {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  for (const poly of polys) for (const ring of poly) for (const [lon, lat] of ring) fn(lon, lat);
};
for (const f of geo.features) eachCoord(f.geometry, (lon, lat) => {
  if (lon < minLon) minLon = lon; if (lon > maxLon) maxLon = lon;
  if (lat < minLat) minLat = lat; if (lat > maxLat) maxLat = lat;
});
const meanLat = (minLat + maxLat) / 2;
const kx = Math.cos((meanLat * Math.PI) / 180); // correção de longitude
const projX = (lon) => lon * kx;
const spanX = projX(maxLon) - projX(minLon);
const spanY = maxLat - minLat;
const scale = W / spanX;
const H = Math.round(spanY * scale);
const toXY = (lon, lat) => [
  +(((projX(lon) - projX(minLon)) * scale)).toFixed(ROUND),
  +(((maxLat - lat) * scale)).toFixed(ROUND), // flip Y
];

// decimação: mantém ponto se distância do último >= TOL (sempre mantém extremos)
function decimate(pts) {
  if (pts.length <= 4) return pts;
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i], [px, py] = out[out.length - 1];
    if (Math.hypot(x - px, y - py) >= TOL) out.push(pts[i]);
  }
  out.push(pts[pts.length - 1]);
  return out;
}
const ringBBoxMax = (pts) => {
  let a = Infinity, b = -Infinity, c = Infinity, d = -Infinity;
  for (const [x, y] of pts) { if (x < a) a = x; if (x > b) b = x; if (y < c) c = y; if (y > d) d = y; }
  return Math.max(b - a, d - c);
};

function ringToPath(ring) {
  let pts = ring.map(([lon, lat]) => toXY(lon, lat));
  if (ringBBoxMax(pts) < MIN_RING) return null; // ilha pequena
  pts = decimate(pts);
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) d += `L${pts[i][0]} ${pts[i][1]}`;
  return d + "Z";
}

function featurePath(geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
  const ds = [];
  // garante pelo menos o maior anel mesmo se < MIN_RING
  let biggest = null, biggestSize = -1;
  for (const poly of polys) for (const ring of poly) {
    const size = ringBBoxMax(ring.map(([lon, lat]) => toXY(lon, lat)));
    if (size > biggestSize) { biggestSize = size; biggest = ring; }
    const p = ringToPath(ring);
    if (p) ds.push(p);
  }
  if (!ds.length && biggest) { // fallback: força o maior anel
    let pts = decimate(biggest.map(([lon, lat]) => toXY(lon, lat)));
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) d += `L${pts[i][0]} ${pts[i][1]}`;
    ds.push(d + "Z");
  }
  return ds.join("");
}

const paths = geo.features
  .map((f) => ({ uf: f.properties.sigla, nome: f.properties.name, d: featurePath(f.geometry) }))
  .sort((a, b) => a.uf.localeCompare(b.uf));

const body = paths
  .map((p) => `  <path id="${p.uf}" data-uf="${p.uf}" data-nome="${p.nome}" d="${p.d}"/>`)
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="brasil-map" role="img" aria-label="Mapa do Brasil — clique em um estado">
${body}
</svg>
`;
fs.writeFileSync(OUT, svg, "utf8");
const kb = (Buffer.byteLength(svg) / 1024).toFixed(1);
console.log(`brasil.svg gerado: ${paths.length} UFs, ${W}x${H}, ${kb} KB`);
console.log("UFs:", paths.map((p) => p.uf).join(","));
