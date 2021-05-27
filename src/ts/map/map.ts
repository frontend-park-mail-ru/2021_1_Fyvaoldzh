import * as L from 'leaflet';

let map: any = null;

export default function getMap(position: [number, number], tooltip: string) {
  const zoom = 15;
  map = L.map('map').setView(position, zoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(position).addTo(map).bindPopup(tooltip).openPopup();
}
