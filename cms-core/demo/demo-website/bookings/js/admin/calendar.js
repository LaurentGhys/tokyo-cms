const calendarTable = "#calendarTable";
const monthHeading = document.getElementById("monthHeading");

const previousMonthButton = document.getElementById("previousMonthButton");
const nextMonthButton = document.getElementById("nextMonthButton");

var bookings = [];
var bookingIDs = [];
var bookingColors = [];
var currentMonth = (new Date());

GenerateCalendar();
SetCalendarData("UpcomingBookings");

previousMonthButton.onclick = function() {
  currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1));
  ClearCalendar();
  GenerateCalendar();
  SetCalendarData("UpcomingBookings");
  ShowBookingDisplayer(booking);
}

nextMonthButton.onclick = function() {
  currentMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
  ClearCalendar();
  GenerateCalendar();
  SetCalendarData("UpcomingBookings");
  ShowBookingDisplayer(booking);
}

function SetCalendarData(firebaseCollection) {
  var jc = $.dialog({
    title: 'Getting data',
    content: 'Do not close this page <br> Please be patient...',
    theme: 'modern',
    buttons: {}
  });
  firebase.firestore().collection(firebaseCollection).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var booking = GetBookingFromData(doc.data());
        bookings.push(booking);
        bookingColors.push(booking.Color);
        bookingIDs.push(doc.id);
        for (var i = 0; i < booking.Rooms.length; i++) {
          if (booking.Rooms[i] == 0) continue;
          var startDate = GetNeutralDate(GetDateFromNLDate(booking.StartDate));
          var endDate = GetNeutralDate(GetDateFromNLDate(booking.EndDate));
          var daysAmount = moment(endDate).diff(moment(startDate), 'days') + 1;
          for (var j = 0; j < daysAmount; j++) {
            var currentDay = new Date(startDate);
            currentDay.setDate(startDate.getDate() + j);
            if (currentDay.getMonth() == currentMonth.getMonth() && currentDay.getYear() == currentMonth.getYear()) {
              var day = currentDay.getDate();
              var cell = GetCalendarTableCell(day, booking.Rooms[i]);
              cell.style.backgroundColor = booking.Color;
              cell.id = (bookings.length - 1);
            }
          }
        }
      });
      jc.close()
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      $.alert({
        title: 'An error occurred',
        content: '(error code:' + error + ')',
        theme: 'modern',
        buttons: {
          Retry: {
            btnClass: 'btn-red',
            action: function() {
              window.location.reload();
            }
          }
        }
      });
    });
}

function ClearCalendar() {
  var table = (document.getElementById("calendarTable"));
  while (table.childNodes.length > 2) {
    table.removeChild(table.lastChild);
  }
}

function GenerateCalendar() {
  monthHeading.innerHTML = GetDisplayMonth(currentMonth) + ' ' + currentMonth.getFullYear();
  var daysAmount = DaysInMonth(currentMonth.getMonth(), currentMonth.getYear());
  for (var i = 1; i <= daysAmount; i++) {
    AddToCalendarTable(i)
  }
}

function GetCalendarTableCell(x, y) {
  var days = (document.getElementById("calendarTable").children);
  for (var d = 1; d < days.length + 1; d++) {
    if (x == d) {
      var rooms = (days[d].children);
      for (var r = 1; r < rooms.length + 1; r++) {
        if (y == r) {
          return (rooms[r]);
        }
      }
    }
  }
}

function AddToCalendarTable(day) {
  var cellClassName = "cell1";
  if (day % 2 == 0) cellClassName = "cell2";
  if (new Date().getDate() == day) cellClassName = "today ";
  var tr = document.querySelector(calendarTable).appendChild(document.createElement("tr"));
  var dateTd = tr.appendChild(document.createElement("td"));
  dateTd.className = cellClassName;
  var bedoinTd = tr.appendChild(document.createElement("td"));
  bedoinTd.className = cellClassName;
  var loungeTd = tr.appendChild(document.createElement("td"));
  loungeTd.className = cellClassName;
  var terasseTd = tr.appendChild(document.createElement("td"));
  terasseTd.className = cellClassName;
  var ventouxTd = tr.appendChild(document.createElement("td"));
  ventouxTd.className = cellClassName;
  dateTd.innerHTML = day;
}