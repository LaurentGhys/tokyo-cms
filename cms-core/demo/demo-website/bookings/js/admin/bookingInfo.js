const nameTextField = document.getElementById("nameTextField");
const emailTextField = document.getElementById("emailTextField");
const phoneTextField = document.getElementById("phoneTextField");
const infoTextField = document.getElementById("infoTextField");
const dateTextField1 = document.getElementById("dateTextField1");
const dateTextField2 = document.getElementById("dateTextField2");
const peopleTextField = document.getElementById("peopleTextField");

const confirmButton = document.getElementById("confirmButton");
const deleteButton = document.getElementById("deleteButton");
const sendFormButton = document.getElementById("sendFormButton");
const showFormButton = document.getElementById("showFormButton");

const nextRoomButton = document.getElementById("nextRoomButton");
const updateRoomButton = document.getElementById("updateRoomButton");

var isNewBooking = false;
var bookingCollection = "";
var bookingID = "";
var currentBooking;

bookingID = GetBookingID();
GetNewBookingInfo();

// nextRoomButton.onclick = function() {
//   BookingDisplayerNextRoom(currentBooking);
// }
//
// updateRoomButton.onclick = function() {
//   UpdateBookingRoom();
// }

confirmButton.onclick = function() {
  SetAsUpcomingBooking();
}

deleteButton.onclick = function() {
  $.confirm({
    title: 'Booking verwijderen',
    content: 'Wilt u deze booking verwijderen?',
    theme: 'supervan',
    buttons: {
      Jaa: {
        btnClass: 'btn-red',
        action: function() {
          DeleteBooking();
        }
      },
      Nee: {
        btnClass: 'btn-grey',
        action: function() {}
      }
    }
  });
};

downloadFormButton.onclick = function() {
  NewBookingForm(currentBooking.Name, currentBooking.Email, currentBooking.PhoneNumber, currentBooking.People.toString(), currentBooking.Rooms.length.toString(),  currentBooking.Nights.toString(), currentBooking.StartDate, currentBooking.EndDate, currentBooking.Price.toString() + "€");
}

function GetBookingID() {
  let url = window.location.href;
  if (url.includes("newBookingID")) {
    isNewBooking = true;
    bookingCollection = "NewBookings";
    return url.slice(url.indexOf("newBookingID="), url.length).replace("newBookingID=", "");
  } else if (url.includes("bookingID")) {
    bookingCollection = "UpcomingBookings";
    return url.slice(url.indexOf("bookingID="), url.length).replace("bookingID=", "");
  }
  console.log("ERROR: URL DOES NOT CONTAIN A BOOKING ID");
  return null
}

function GetNewBookingInfo() {
  var jc = $.dialog({
    title: 'Getting data',
    content: 'Do not close this page <br> Please be patient...',
    theme: 'modern',
    buttons: {}
  });
  firebase.firestore().collection(bookingCollection).doc(bookingID).get().then(function(doc) {
    jc.close()
    var d = doc.data();
    var booking = GetBookingFromData(d);
    currentBooking = booking;
    SetTextFields(booking);
    if (isNewBooking) ShowBookingDisplayer(currentBooking);
    else ShowCurrentBookingDisplayer(currentBooking);
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
    $.alert({
      title: 'An error occurred',
      content: '(Error code:' + error + ')',
      theme: 'modern',
      buttons: {
        Ok: {
          btnClass: 'btn-red',
          action: function() {
            window.location.href = adminHomeUrl;
          }
        }
      }
    });
  });
}

function SetTextFields(booking) {
  nameTextField.value = booking.Name;
  emailTextField.value = booking.Email;
  phoneTextField.value = booking.PhoneNumber;
  infoTextField.value = booking.Description;
  dateTextField1.value = booking.StartDate;
  dateTextField2.value = booking.EndDate;
  peopleTextField.value = booking.People;
}

// function UpdateBookingRoom() {
//   var json = JSON.stringify(currentBooking);
//   var obj = JSON.parse(json);
//   var jc = $.dialog({
//     title: 'Updating room',
//     content: 'Do not close this page <br> Please be patient...',
//     theme: 'modern',
//     buttons: {}
//   });
//   firebase.firestore().collection(bookingCollection).doc(bookingID).set(obj).then(function() {
//     jc.close()
//     $.alert({
//       title: 'Rooms updated!',
//       content: 'The rooms has been changed in the database',
//       theme: 'modern',
//       buttons: {
//         Reload: {
//           btnClass: 'btn-green',
//           action: function() {
//             window.location.reload();
//           }
//         }
//       }
//     });
//   }).catch(function(error) {
//     console.log("Error getting documents: ", error);
//     $.alert({
//       title: 'An error occurred',
//       content: '(error code:' + error + ')',
//       theme: 'modern',
//       buttons: {
//         Ok: {
//           btnClass: 'btn-red',
//           action: function() {
//             window.location.href = adminHomeUrl;
//           }
//         }
//       }
//     });
//   });
// }

function SetAsUpcomingBooking() {

  var data;
  var jc = $.dialog({
    title: 'Confirming Booking',
    content: 'Do not close this page <br> Please be patient...',
    theme: 'modern',
    buttons: {}
  });
  var json = JSON.stringify(currentBooking);
  var data = JSON.parse(json);
  if (data) {
    firebase.firestore().collection("UpcomingBookings").doc(bookingID).set(data).then(function() {
      firebase.firestore().collection("NewBookings").doc(bookingID).delete().then(function() {
        jc.close()
        $.alert({
          title: 'Booking Confirmed!',
          content: 'The booking has been updated from New Booking to Upcoming Booking',
          theme: 'modern',
          buttons: {
            Great: {
              btnClass: 'btn-green',
              action: function() {
                window.location.href = window.location.href.replace("newBookingID", "bookingID");
              }
            }
          }
        });
      }).catch(function(error) {
        console.log("Error getting documents: ", error);
        $.alert({
          title: 'An error occurred',
          content: '(error code:' + error + ')',
          theme: 'modern',
          buttons: {
            Ok: {
              btnClass: 'btn-red',
              action: function() {
                window.location.reload();
              }
            }
          }
        });
      });
    }).catch(function(error) {
      console.log("Error getting documents: ", error);
      $.alert({
        title: 'An error occurred',
        content: '(error code:' + error + ')',
        theme: 'modern',
        buttons: {
          Ok: {
            btnClass: 'btn-red',
            action: function() {
              window.location.reload();
            }
          }
        }
      });
    });
  }
}

function DeleteBooking() {
  firebase.firestore().collection("NewBookings").doc(bookingID).delete().then(function() {
    $.alert({
      title: 'Booking verwijdert!',
      content: '',
      theme: 'supervan',
      buttons: {
        Ok: {
          btnClass: 'btn-grey',
          action: function() {
            window.location.href = adminHomeUrl;
          }
        }
      }
    });
  }).catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}