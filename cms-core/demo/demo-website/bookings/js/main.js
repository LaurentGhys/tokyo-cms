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
const homeUrl = "https://bastideventoux.com/";
const adminLoginUrl = "https://bastideventoux.com/bookings/admin/adminLogin";
const adminHomeUrl = "https://bastideventoux.com/bookings/admin/adminDashboard";
const bookingInfoUrl = "https://bastideventoux.com/bookings/admin/bookingInfo";
const newBookingURL = "https://bastideventoux.com/bookings/newBooking";
var adminUrls = [adminLoginUrl, adminHomeUrl]

const lowSeasonPrice = 115;
const highSeasonPrice = 125;
//Month = number - 1 / Ex: January: 0, July = 7-1 (6)
// So July (6) and August (7)
const highSeasonMonths = [6, 7]

class Booking {
  constructor(Name = "", Email = "", PhoneNumber = "", Country= "", StartDate = "", EndDate = "", People = 0, Description = "", CreationDate = "", Platform = "", Rooms = [], Color = "", Nights = 0, Price = 0, City = "", Lat = 0, Long = 0) {
    this.Name = Name;
    this.Email = Email;
    this.PhoneNumber = PhoneNumber;
    this.Country = Country;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.People = People;
    this.Description = Description;
    this.CreationDate = CreationDate;
    this.Platform = Platform;
    this.Rooms = Rooms;
    this.Color = Color;
    this.Nights = Nights;
    this.Price = Price;
    this.City = City;
    this.Lat = Lat;
    this.Long = Long;
  }
  Validate() {
    var errorMessage = "";
  }
}

const Rooms = {
  BEDOIN: "Bédoin",
  LOUNGE: "Lounge",
  TERASSE: "Terasse",
  VENTOUX: "Ventoux"
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (window.location.href == adminLoginUrl) {
      $.alert({
        title: 'Hi admin!',
        content: 'Logged in successfully',
        theme: 'modern',
        buttons: {
          Dashboard: {
            btnClass: 'btn-green',
            action: function() {window.location.href = adminHomeUrl; }
          }
        }
      });      
    }
  } else {
    if (adminUrls.includes(window.location.href) && window.location.href != adminLoginUrl) {
      $.alert({
        title: 'Logged out!',
        content: 'You are no longer logged in',
        theme: 'modern',
        buttons: {
          Ok: {
            btnClass: 'btn-red',
            action: function() { window.location.href = adminLoginUrl; }
          }
        }
      });
    }
  }
});

function GetBookingFromData(d) {
  return booking = new Booking(d["Name"], d["Email"], d["PhoneNumber"], d["Country"], d["StartDate"],
    d["EndDate"], d["People"], d["Description"], d["CreationDate"], d["Platform"], d["Rooms"], d["Color"], d["Nights"], d["Price"]);
}
function GetDateFromNLDate(dateString) {
  var str = dateString;
  var day = str.substring(0, str.indexOf("-"))
  str = str.replace(day, "").slice(1, str.length);
  var month = str.substring(0, str.indexOf("-"))
  var year = str.replace(month, "").slice(1, str.length);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}
function GetDateAndTimeFromNLDate(dateString) {
  var str = dateString.substring(0, dateString.indexOf(" "));
  var day = str.substring(0, str.indexOf("-"))
  str = str.replace(day, "").slice(1, str.length);
  var month = str.substring(0, str.indexOf("-"))
  var year = str.replace(month, "").slice(1, str.length);

  var time = dateString.substring(dateString.indexOf(" ") + 1, dateString.length);
  var hours = time.substring(0, time.indexOf(":"))
  time = time.replace(hours, "").slice(1, time.length);
  var minutes = time.substring(0, time.indexOf(":"))
  var seconds = time.replace(minutes, "").slice(1, time.length);
  return new Date(year, month - 1, day, hours, minutes, seconds, 0);
}
function GetDisplayDate(date) {
  //Only use this for booking.CreationDate
  var time = date.toLocaleTimeString("NL");
  today = new Date();

  if (today.getDate() == date.getDate()) {
    return "Vaandag (" + time + ")";
  } else if (today.getDate() - 1 == date.getDate()) {
    return "Gisteren (" + time + ")";
  } else if (today.getDate() - 2 == date.getDate()) {
    return "Eergisteren (" + time + ")";
  }
  // compDate = new Date(year,month-1,day); // month - 1 because January == 0
  // diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
  // if (compDate.getTime() == today.getTime()) {
  //     return "Today";
  // } else if (diff <= (24 * 60 * 60 *1000)) {
  //     return "Yesterday";
  // } else {
  //     //return compDate.toDateString(); // or format it what ever way you want
  //     year = compDate.getFullYear();
  //     month = compDate.getMonth();
  //     months = new Array('Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
  //     day = compDate.getDate();
  //     d = compDate.getDay();
  //     days = new Array('Maandag', 'Donderdag', 'Woensdag', 'Dinsdag', 'Vrijdag', 'Zaterdag', 'Zondag');
  //     var formattedDate = days[d + 1] + " " + day + " " + months[month] + " " + year;
  //     return formattedDate;
}
function GetDisplayMonth(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date.getMonth()];
}
function GetAvailableRooms(bookings, start, end) {
  var rooms = [1, 2, 3, 4];
  for (var i = 0; i < bookings.length; i++) {
    var startBooking = GetDateFromNLDate(bookings[i].StartDate);
    var endBooking = GetDateFromNLDate(bookings[i].EndDate);
    if (!IsDateAvailable(startBooking, endBooking, start, end)) {
      rooms = rooms.filter(function(room) {
        return !bookings[i].Rooms.includes(room);
      });
    }
  }
  return rooms;
}
function IsDateAvailable(startBooking, endBooking, start, end) {
  var startBookingTime = GetNeutralDate(startBooking).getTime();
  var endBookingTime = GetNeutralDate(endBooking).getTime();
  var startTime = GetNeutralDate(start).getTime();
  var endTime = GetNeutralDate(end).getTime();
  //console.clear();
  // console.log(GetNeutralDate(startBooking) + ": " + startBookingTime);
  // console.log(GetNeutralDate(start) + ": " + startTime);
  // console.log(GetNeutralDate(end) + ": " + endTime);
  // console.log(GetNeutralDate(endBooking) + ": " + endBookingTime);
  if (startTime < startBookingTime && endTime < startBookingTime) return true;
  if (startTime > endBookingTime && endTime > endBookingTime) return true;
  return false;
}
function GetNeutralDate(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}
function DaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;
  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
  return "#" + RR + GG + BB;
}
function IsTextFieldEmpty(element) {
  return (!element.value || 0 === element.value.length);
}
function GetPriceData(startDate, endDate, people) {
  var data = [];
  var price = 0;
  var nights = moment(endDate).diff(moment(startDate), 'days');
  var rooms = Math.ceil(people / 2);
  if (highSeasonMonths.includes(endDate.getMonth())) price = highSeasonPrice;
  else price = lowSeasonPrice;
  var totalPrice = price * nights * rooms;
  data.push(totalPrice, price, nights, rooms);
  return data;
}