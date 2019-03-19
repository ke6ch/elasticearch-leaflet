let map;

window.onload = function init() {
  map = L.map('map').setView([34.985849,135.758767], 14);
  L.marker([34.985849,135.758767]).addTo(map);

  L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
    attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
  }).addTo(map);

  // 指定避難所を検索
  getShelter()
    .then((data) => {
      data.docs.forEach((row) => {
        L.marker([row.location.lat, row.location.lon], { title: row.facility }).addTo(map);
      });
    });

  // マップClick時、ルート検索
  map.on('click', onMapClick);
}

// 指定避難所を検索
function getShelter() {
  url = '/api/v1/';

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });

};

// マップClick時、ルート検索
async function onMapClick(e) {

  // 最短距離の地点を検索
  const point = await searchPoint(e.latlng)
    .then((data) => {
      console.log(data.docs[0]);
      return data.docs[0];
    });

  L.Routing.control({
    waypoints: [
      L.latLng(e.latlng),
      L.latLng(point.location.lat, point.location.lon)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
  }).addTo(map);

}

// 指定避難所を検索
function searchPoint(body) {
  url = '/api/v1/';

  return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body)
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });

};
