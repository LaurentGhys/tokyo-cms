//Input ID Names
const nameTextField = document.getElementById("nameTextField");
const emailTextField = document.getElementById("emailTextField");
const phoneTextField = document.getElementById("phoneTextField");
const dateTextField1 = document.getElementById("dateTextField1");
const dateTextField2 = document.getElementById("dateTextField2");
const infoTextField = document.getElementById("infoTextField");
const peopleTextField = document.getElementById("peopleTextField");

// const nameTextFieldFake = document.getElementById("nameTextFieldFake");
// const emailTextFieldFake = document.getElementById("emailTextFieldFake");
// const phoneTextFieldFake = document.getElementById("phoneTextFieldFake");
// const dateTextField1Fake = document.getElementById("dateTextField1Fake");
// const dateTextField2Fake = document.getElementById("dateTextField2Fake");
// const infoTextFieldFake = document.getElementById("infoTextFieldFake");
// const peopleTextFieldFake = document.getElementById("peopleTextFieldFake");

var priceLabel = document.getElementById("priceLabel");
var priceInfoLabel = document.getElementById("priceInfoLabel");
var checkAvailabilityButton = document.getElementById("checkAvailabilityButton");
var nextStepButton1 = document.getElementById("nextStepButton1");
var nextStepButton2 = document.getElementById("nextStepButton2");
var submitBookingButton = document.getElementById("submitBookingButton");
var cancelBookingButton = document.getElementById("cancelBookingButton");

const stepsContainer = document.getElementById("stepsContainer");
const progressBar = document.getElementsByClassName("progressbar")[0];
var infoTable = document.getElementById("infoTable");

var currentStep = 0;
var booking = new Booking();

UpdateStepUI();

//Setup Buttons & Text Fields
var datePicker = new Lightpick({
  field: dateTextField1,
  secondField: dateTextField2,
  singleDate: false,
  onSelect: function(start, end) {
    dateInfoChanged();
    //console.log(Date(start));
  }
});
var iti = window.intlTelInput(phoneTextField);

const typeHandler = function(e) {
  dateInfoChanged();
}

peopleTextField.addEventListener("input", typeHandler);

function dateInfoChanged() {
  checkAvailabilityButton.style.display = "inherit";
  nextStepButton1.style.display = "none";
}

function UpdateStepUI() {
  var progressChildren = progressBar.children;
  for (var i = 0; i < progressChildren.length; i++) {
    progressChildren[i].className = "";
  }
  progressChildren[currentStep].className = "active";
  var steps = stepsContainer.children;
  for (var i = 0; i < steps.length; i++) {
    steps[i].style.display = "none";
  }
  steps[currentStep].style.display = "inherit";
}

checkAvailabilityButton.onclick = function() {
  var validInput = true;
  if (IsTextFieldEmpty(dateTextField1)) {
    validInput = false;
    NewErrorLabel(dateTextField1, "Please select a date");
  }
  if (IsTextFieldEmpty(dateTextField2)) {
    validInput = false;
    NewErrorLabel(dateTextField2, "Please select a date");
  }
  if (IsTextFieldEmpty(peopleTextField)) {
    validInput = false;
    NewErrorLabel(peopleTextField, "Please fill in the amount of people");
  }
  if (!validInput) return;

  var jc = $.dialog({
    title: 'Checking availability',
    content: 'Do not close this page <br> Please be patient...',
    theme: 'modern',
    buttons: {}
  });
  var bookings = [];
  var startDate = GetNeutralDate(new Date(datePicker.getStartDate()));
  var endDate = GetNeutralDate(new Date(datePicker.getEndDate()));
  firebase.firestore().collection("UpcomingBookings").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        bookings.push(GetBookingFromData(doc.data()));
      });
      var availableRooms = GetAvailableRooms(bookings, startDate, endDate);
      if (availableRooms.length >= peopleTextField.value / 2) {
        jc.close();
        booking.Rooms = [];
        for (var i = 0; i < peopleTextField.value / 2; i++) {
          booking.Rooms.push(availableRooms[i]);
        }
        checkAvailabilityButton.style.display = "none";
        nextStepButton1.style.display = "inherit";
        let priceData = GetPriceData(new Date(datePicker.getStartDate()), new Date(datePicker.getEndDate()));
        priceLabel.innerHTML = "Price: " + priceData[0] + "€";
        var priceInfoString = "";
        if (priceData[2] == 1) priceInfoString += priceData[2] + " night";
        else priceInfoString += priceData[2] + " nights";
        priceInfoString += " in ";
        if (priceData[3] == 1) priceInfoString += priceData[3] + " room";
        else priceInfoString += priceData[3] + " rooms";
        priceInfoString += " at ";
        priceInfoString += priceData[1] + " € per room per night";

        priceInfoLabel.innerHTML = priceInfoString;
      } else {
        jc.close();
        $.alert({
          title: 'We are full!',
          content: 'Unfortunatly, there are no rooms available. Please try again with another date',
          theme: 'modern',
          buttons: {
            Retry: {
              btnClass: 'btn-grey',
              action: function() {
                window.location.reload();
              }
            }
          }
        });
      }
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
      jc.close();
      $.alert({
        title: 'An error occurred',
        content: 'Please send your booking to <br> "info@bastideventoux.com" <br> (error code:' + error + ')',
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
};

nextStepButton1.onclick = function() {
  currentStep++;
  UpdateStepUI();
  UpdateBooking();
}

// const nameTextField = document.getElementById("nameTextField");
// const emailTextField = document.getElementById("emailTextField");
// const phoneTextField = document.getElementById("phoneTextField");
// const dateTextField1 = document.getElementById("dateTextField1");
// const dateTextField2 = document.getElementById("dateTextField2");
// const infoTextField = document.getElementById("infoTextField");
// const peopleTextField = document.getElementById("peopleTextField");

nextStepButton2.onclick = function() {

  var validInput = true;
  if (IsTextFieldEmpty(nameTextField)) {
    validInput = false;
    NewErrorLabel(nameTextField, "Please fill in your full name");
  }
  if (IsTextFieldEmpty(emailTextField)) {
    validInput = false;
    NewErrorLabel(emailTextField, "Please fill in your email address");
  }
  if (IsTextFieldEmpty(phoneTextField)) {
    validInput = false;
    NewErrorLabel(phoneTextField, "Please fill in your phone number");
  }
  if (!validInput) return;

  currentStep++;
  UpdateStepUI();
  UpdateBooking();
  UpdateConfirmationUI();
}

cancelBookingButton.onclick = function() {
  window.location.reload();
}

submitBookingButton.onclick = function() {
  submitBookingButton.style.display = "none"
  cancelBookingButton.style.display = "none"
  var json = JSON.stringify(booking);
  var obj = JSON.parse(json);
  var jc = $.dialog({
    title: 'Sending booking',
    content: 'Do not close this page <br> Please be patient...',
    theme: 'modern',
    buttons: {}
  });
  firebase.firestore().collection("NewBookings").doc().set(obj).then(function() {
    var templateParams = {
      bookingName: booking.Name,
      bookingEmail: booking.Email,
      bookingPeople: booking.People,
      bookingStart: booking.StartDate,
      bookingEnd: booking.EndDate,
    };

    emailjs.send('smtp_server', 'template_Q4vuscPg', templateParams, 'user_RQq2gwVMIZeejPSCU592d')
    jc.close();
    $.alert({
      title: 'Booking sent!',
      content: 'We will contact you via email as soon as possible',
      theme: 'modern',
      buttons: {
        Great: {
          btnClass: 'btn-green',
          action: function() {
            window.location.href = homeUrl;
          }
        }
      }
    });
  })
  .catch(function(error) {
    jc.close();
    $.alert({
      title: 'An error occurred',
      content: 'Please send your booking to <br> "info@bastideventoux.com" <br> (error code:' + error + ')',
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

function GetPriceData(startDate, endDate) {
  var data = [];
  var price = 0;
  var nights = moment(endDate).diff(moment(startDate), 'days');
  var people = peopleTextField.value;
  var rooms = Math.ceil(people / 2);
  if (highSeasonMonths.includes(endDate.getMonth())) price = highSeasonPrice;
  else price = lowSeasonPrice;
  var totalPrice = price * nights * rooms;
  data.push(totalPrice, price, nights, rooms);
  return data;
}


function UpdateBooking() {
  var startDateInDate = new Date(datePicker.getStartDate());
  var endDateInDate = new Date(datePicker.getEndDate());
  var name = nameTextField.value;
  var email = emailTextField.value;
  var phoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
  console.log(phoneNumber);
  var info = infoTextField.value;
  var people = Math.round(peopleTextField.value);
  var country = iti.getSelectedCountryData()["name"];
  var startDate = startDateInDate.toLocaleDateString("NL");
  var endDate = endDateInDate.toLocaleDateString("NL");
  var creationDate = new Date().toLocaleString("NL");
  var platform = window.navigator.platform;
  var rooms = booking.Rooms;
  var color = randomColor({
    luminosity: 'dark'
  })
  var nights = GetPriceData(startDateInDate, endDateInDate)[2];
  var price = GetPriceData(startDateInDate, endDateInDate)[0];
  booking = new Booking(name, email, phoneNumber, country, startDate, endDate, people, info, creationDate, platform, rooms, color, nights, price);
}

function UpdateConfirmationUI() {
  AddToInfoTable("Name", booking["Name"]);
  AddToInfoTable("Email", booking["Email"]);
  AddToInfoTable("Phone Number", booking["PhoneNumber"]);
  AddToInfoTable("From", booking["StartDate"]);
  AddToInfoTable("To", booking["EndDate"]);
  if (!booking["Description"] && 0 !== booking["Description"].length) {
    AddToInfoTable("Extra info", booking["Description"]);
  }
  var priceData = GetPriceData(GetDateFromNLDate(booking["StartDate"]), GetDateFromNLDate(booking["EndDate"]));
  AddToInfoTable("Rooms", booking["Rooms"].length);
  AddToInfoTable("Nights", booking["Nights"]);
  AddToInfoTable("Price", booking["Price"] + "€");
}

// constructor(Name, Email, PhoneNumber, Country, StartDate, EndDate, People, Description, CreationDate, Platform, Room) {
var infoTableIndex = 0;

function AddToInfoTable(string1, string2) {
  infoTableIndex++;
  var cellClassName = "cell1";
  if (infoTableIndex % 2 == 0) {
    cellClassName = "cell2"
  };
  var tr = infoTable.appendChild(document.createElement("tr"));
  var td1 = tr.appendChild(document.createElement("td"));
  var td2 = tr.appendChild(document.createElement("td"));
  td1.innerHTML = string1;
  td2.innerHTML = string2;
  // td1.className = cellClassName + " title";
  tr.className = cellClassName;
  td1.className = " title";
  // td2.className = cellClassName;
  // bedoinTd.className = cellClassName;
  // var loungeTd = tr.appendChild(document.createElement("td"));
  // loungeTd.className = cellClassName;
  // var terasseTd = tr.appendChild(document.createElement("td"));
  // terasseTd.className = cellClassName;
  // var ventouxTd = tr.appendChild(document.createElement("td"));
  // ventouxTd.className = cellClassName;
  // dateTd.innerHTML = day;
}