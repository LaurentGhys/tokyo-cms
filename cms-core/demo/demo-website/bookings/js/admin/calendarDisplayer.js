function ShowBookingDisplayer(booking) {
  if (booking == null) return;
  var startDate = GetDateFromNLDate(booking.StartDate);
  var endDate = GetDateFromNLDate(booking.EndDate);
  var isAvailable = true;

  availableRooms = GetAvailableRooms(bookings, startDate, endDate);
  booking.Rooms = [];
  for (var i = 0; i < booking.People / 2; i++) {
    if (availableRooms[i] != null) booking.Rooms.push(availableRooms[i]);
    else {
      for (var i = 1; i <= 4; i++) {
        if (!booking.Rooms.includes(i)) {
          booking.Rooms.push(i);
          break;
        }
      }
    }
  }
  var rooms = booking.Rooms;

  var daysAmount = moment(endDate).diff(moment(startDate), 'days') + 1;
  for (var i = 0; i < rooms.length; i++) {
    for (var j = 0; j < daysAmount; j++) {
      var currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + j);
      var day = currentDay.getDate();
      if (currentDay.getMonth() == currentMonth.getMonth() && currentDay.getFullYear() == currentMonth.getFullYear()) {
        var cell = GetCalendarTableCell(day, rooms[i]);
        cell.style.border = "5px solid " + shadeColor(booking.Color, -50);
      }
    }
  }
}

function ShowCurrentBookingDisplayer(booking) {
  if (booking == null) return;
  var startDate = GetDateFromNLDate(booking.StartDate);
  var endDate = GetDateFromNLDate(booking.EndDate);
  var isAvailable = true;

  var rooms = booking.Rooms;

  var daysAmount = moment(endDate).diff(moment(startDate), 'days') + 1;
  for (var i = 0; i < rooms.length; i++) {
    for (var j = 0; j < daysAmount; j++) {
      var currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + j);
      var day = currentDay.getDate();
      if (currentDay.getMonth() == currentMonth.getMonth() && currentDay.getYear() == currentMonth.getYear()) {
        var cell = GetCalendarTableCell(day, rooms[i]);
        cell.style.border = "5px solid " + shadeColor(booking.Color, -50);
      }
    }
  }
}


function BookingDisplayerNextRoom(booking) {
  ClearCalendarDisplayer();
  ShowBookingDisplayer(booking);
}

function ClearCalendarDisplayer() {
  var days = (document.getElementById("calendarTable").children);
  for (var d = 1; d < days.length; d++) {
    var rooms = (days[d].children);
    for (var r = 1; r < rooms.length; r++) {
      var cell = GetCalendarTableCell(d, r);
      cell.style.border = "0px solid rgb(20, 20, 255)";
    }
  }
}