var newBookingsTable = document.getElementById("newBookingsTables");
var hoverContainer = document.getElementById("hoverContainer");

var selectedBooking;
var newBookings = [];
var newBookingIDs = [];

var lastHoveredNewBookingID = 9999;

DisableHoverTooltip();
GetNewBookings();

document.addEventListener('mousemove', function(mouseE) {
  DisableHoverTooltip();
  var element = document.elementFromPoint(mouseE.clientX, mouseE.clientY);
  if (element == null) return;
  if (element.id == null) return;
  if (element.id.length == 0) return;
  if (parseInt(element.id).length == 0) return;
  if (element.closest('table') == null) return;
  var isNewBooking = false;
  var hoverInfoString = "Click for more info";
  var color = bookingColors[element.id]
  if (element.closest('table').id == "newBookingsTables") isNewBooking = true;
  var booking;
  if (isNewBooking) {
    booking = newBookings[element.id];
    color = "var(--accentColor)"
//    if (!element.className.includes("name")) {
//      color = "var(--tableColor)"
//      hoverInfoString = "Click to change room";
//    }
    if (lastHoveredNewBookingID != element.id) {
      lastHoveredNewBookingID = element.id;
      ClearCalendarDisplayer();
      selectedBooking = booking;
      ShowBookingDisplayer(booking);
    }
  } else {
    booking = bookings[element.id];
  }
  if (booking == null) return;
  EnableHoverTooltip(booking, mouseE, color, hoverInfoString, isNewBooking);
})

document.addEventListener('click', function(mouseE) {
  var element = document.elementFromPoint(mouseE.clientX, mouseE.clientY);
  if (element == null) return;
  if (element.id == null) return;
  if (isNaN(element.id) && element.id.length == 0) return;
  if (element.closest('table') == null) return;
  var isNewBooking = false;
  if (element.closest('table').id == "newBookingsTables") isNewBooking = true;
  if (isNewBooking) {
    booking = newBookings[element.id];
    if (booking) {
      if (element.className.includes("name")) {
        var bookingID = newBookingIDs[element.id];
        window.location.href = bookingInfoUrl + "?newBookingID=" + bookingID;
      } else {
        selectedBooking = booking;
        BookingDisplayerNextRoom(booking);
        return;
      }
    }
  } else {
    var bookingID = bookingIDs[element.id];
    window.location.href = bookingInfoUrl + "?bookingID=" + bookingID;
  }
})

document.getElementById('createBookingButton').onclick = function() {
  window.location.href = newBookingURL;
}

function GetNewBookings() {
  firebase.firestore().collection("NewBookings").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var d = doc.data();
        var booking = GetBookingFromData(d);
        newBookings.push(booking);
        newBookingIDs.push(doc.id);
        AddToNewBookingsTable(booking);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
}

function AddToNewBookingsTable(booking) {
  var bookingIndex = newBookings.indexOf(booking);
  var cellClassName = "cell2";
  if (bookingIndex % 2 == 0) {
    cellClassName = "cell1"
  };
  var tr = newBookingsTable.appendChild(document.createElement("tr"));
  var nameTd = tr.appendChild(document.createElement("td"));
  var peopleTd = tr.appendChild(document.createElement("td"));
  var creationDateTd = tr.appendChild(document.createElement("td"));
  nameTd.innerHTML = booking.Name;
  peopleTd.innerHTML = booking.People;
  creationDateTd.innerHTML = GetDisplayDate(GetDateAndTimeFromNLDate(booking.CreationDate));
  tr.className = cellClassName;
  tr.className = cellClassName;
  nameTd.className = cellClassName;
  peopleTd.className = cellClassName;
  creationDateTd.className = cellClassName;
  nameTd.id = bookingIndex;
  nameTd.className += " name";
  peopleTd.id = bookingIndex;
  creationDateTd.id = bookingIndex;
}