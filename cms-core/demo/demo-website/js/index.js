const navbar = document.getElementById("navbar");


var scroll = new SmoothScroll('a[href*="#"]');


// Load map code
var script = document.createElement('script');
//API Key secured with reference
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4bubaaxwnePG4xrCUsQLQIaTSydwXXeU&callback=initMap';
script.defer = true;
script.async = true;

document.head.appendChild(script);

window.initMap = function () {

  var map = new google.maps.Map(document.getElementById('contactMap'), {
    center: { lat: 44.122839, lng: 5.1921463 },
    zoom: 16,
    styles:
      [{
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }]
      }]
  });

  var contentString = '<h3>La Bastide au Ventoux</h3><p class="paragraph">Chemin des vergers aux baux<br/>84410 Bedoin<br/> France</p>'

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  })

  var marker = new google.maps.Marker({
    position: { lat: 44.122839, lng: 5.1921463 },
    map: map,
    title: 'La Bastide au Ventoux'
  })

  marker.addListener('click', function () {
    infoWindow.open(map, marker);
  });
};


function anchorJump(anchor) {
  var url = location.href;               //Save down the URL without hash.
  location.href = "#" + anchor;                 //Go to the target element.
  //history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}
function showMobileNavbar() {
  var x = document.getElementById("navbar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
