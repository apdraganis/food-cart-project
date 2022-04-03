mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: shop.geometry.coordinates, // starting position [lng, lat]
  zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
  .setLngLat(shop.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h3>${shop.title}</h3><p>${shop.location[1]}, ${shop.location[0]}</p>`
      )
  )
  .addTo(map);