var firebaseConfig = {
  apiKey: "AIzaSyAAyYogrY84qy8Q3X3W3X5cfSUE-c7BX1o",
  authDomain: "bastide-ventoux.firebaseapp.com",
  databaseURL: "https://bastide-ventoux.firebaseio.com",
  projectId: "bastide-ventoux",
  storageBucket: "",
  messagingSenderId: "796265888288",
  appId: "1:796265888288:web:ed2a6a12c30942f0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];


NewStat();

function NewStat() {
  var docPath = (new Date()).getFullYear() + '/' + monthNames[(new Date()).getMonth()]
  $.getJSON('https://api.muctool.de/whois', function(ipData){
    firebase.firestore().collection('Stats/' + docPath).doc().set({
      Date: (new Date()).getTime(),
      Country: ipData['country'],
      City: ipData['city'],
      Ip: ipData['ip'],
      UserAgent: navigator.userAgent,
      Url: window.location.href,
      Lat: ipData['latitude'],
      Long: ipData['longitude']
    }).then(function() {
      console.log('Stats uploaded to database');
    }).catch(function(error) {
      console.log('Error uploading stats: ' + error);
    })
  });
}
