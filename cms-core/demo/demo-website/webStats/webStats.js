var firebaseConfigStats = {
  apiKey: "AIzaSyAAyYogrY84qy8Q3X3W3X5cfSUE-c7BX1o",
  authDomain: "bastide-ventoux.firebaseapp.com",
  databaseURL: "https://bastide-ventoux.firebaseio.com",
  projectId: "bastide-ventoux",
  storageBucket: "",
  messagingSenderId: "796265888288",
  appId: "1:796265888288:web:ed2a6a12c30942f0"
};
var appStats = firebase.initializeApp(firebaseConfigStats);
databaseStats = firebase.firestore(appStats);

var map = L.map('map').setView([51.505, -0.09], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];

var currentMonth = (new Date()).getMonth();
var currentYear = (new Date()).getFullYear();

GetStats();


function GetStats() {
  var docPath = currentYear + '/' + monthNames[currentMonth];
  var currentDateString = monthNames[currentMonth] + " " + currentYear;
  var monthlyVisits = 0;
  databaseStats.collection("Stats/" + docPath).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var d = doc.data();
          monthlyVisits++;
          UpdateStatsUI(currentDateString, monthlyVisits);
          var popupString = '<b>City:</b> ' + d['City'] + ", " + d['Country'] + '<br/> <b>IP:</b> ' + d['Ip'] + '<br/> <b>Date:</b> ' + new Date(d['Date']).toLocaleString('nl') +
          '<br/> <b>Info:</b> ' + d['UserAgent'];
          L.marker([d['Lat'], d['Long']]).addTo(map).bindPopup(popupString, {className: 'mapTooltip'});
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function UpdateStatsUI(currentDate, monthlyVisits) {
 // document.getElementById('currentDateText').innerHTML = currentDate;
  document.getElementById('monthlyVisitsText').innerHTML = monthlyVisits;
}


