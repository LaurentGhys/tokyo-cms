function NewBookingForm(name, email, phone, people, rooms, nights, arrival, departure, price) {

const filename = 'Booking ' + name;
let doc = new jsPDF('p', 'mm', 'a4');
  
doc.setFillColor(38, 139, 210);
doc.rect(0, 0, 211, 298, 'F');

doc.setFillColor(255, 255, 255)
doc.roundedRect(25, 25, 161, 248, 3, 3, 'F')

doc.setTextColor(38, 139, 210)
doc.setFont('helvetica')
doc.setFontType('bold')
doc.setFontSize(22)
doc.text(60, 40, 'La Bastide aux Ventoux')

doc.setTextColor(150)
doc.setFontType('normal')
doc.setFontSize(16)
doc.text(87, 46, 'Booking form')

var infoTop = 10;

doc.setFontType('bold');
doc.setFontSize(12);
doc.setFillColor(230);
doc.roundedRect(55, 52 + infoTop, 101, 12, 3, 3, 'F');
doc.text(70, 60 + infoTop, 'Name:');
doc.text(70, 75 + infoTop, 'Email:');
doc.setFillColor(230);
doc.roundedRect(55, 82 + infoTop, 101, 12, 3, 3, 'F');
doc.text(70, 90 + infoTop, 'Phone:');
doc.text(70, 105 + infoTop, 'People:');
doc.setFillColor(230);
doc.roundedRect(55, 112 + infoTop, 101, 12, 3, 3, 'F');
doc.text(70, 120 + infoTop, 'Rooms:');
doc.text(70, 135 + infoTop, 'Nights:');
doc.setFillColor(230);
doc.roundedRect(55, 142 + infoTop, 101, 12, 3, 3, 'F');
doc.text(70, 150 + infoTop, 'Arrival:');
doc.text(70, 165 + infoTop, 'Departure:');
doc.setFillColor(230);
doc.roundedRect(55, 172 + infoTop, 101, 12, 3, 3, 'F');
doc.text(70, 180 + infoTop, 'Total price:');
doc.setFontType('normal');
doc.text(115, 60 + infoTop, name);
doc.text(115, 75 + infoTop, email);
doc.text(115, 90 + infoTop, phone);
doc.text(115, 105 + infoTop, people);
doc.text(115, 120 + infoTop, rooms);
doc.text(115, 135 + infoTop, nights);
doc.text(115, 150 + infoTop, arrival);
doc.text(115, 165 + infoTop, departure);
doc.text(115, 180 + infoTop, price);

doc.setTextColor(150);
doc.setFontType('normal');
doc.setFontSize(13);
doc.text(73, 220, 'Please deposit the total amount');
doc.text(58, 225, 'of your booking on the following bank account');
doc.text(75, 235, 'IBAN: BE56 0013 7532 3388');
doc.text(87, 242, 'BIC: GEBABEBB');

doc.setTextColor(38, 139, 210);
doc.setFontType('bold');
doc.setFontSize(20);
doc.text(55, 257, 'WE HOPE TO SEE YOU SOON!');

// doc.setDrawColor(255, 0, 0) // draw red lines
// doc.setLineWidth(0.5)
// doc.line(105.5, 0, 105.5, 298) // 2
// doc.line(70, 0, 70, 298) // 1
// doc.line(140.6, 0, 140.6, 298) // 3

doc.save(filename);

}