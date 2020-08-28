function DisableHoverTooltip() {
  hoverContainer.style.display = "none";
}

function EnableHoverTooltip(booking, mouseE, color, hoverInfoString, isNewBooking) {
  hoverContainer.style.display = "inherit";
  hoverContainer.style.top = mouseE.pageY + 15 + "px";
  hoverContainer.style.left = mouseE.pageX + 15 + "px";
  if (isNewBooking) {
    hoverContainer.children[0].style.display = "none";
    hoverContainer.children[1].style.display = "none";
    hoverContainer.children[2].innerHTML = hoverInfoString;
  } else {
    hoverContainer.children[0].style.display = "inherit";
    hoverContainer.children[1].style.display = "inherit";
    hoverContainer.children[0].innerHTML = booking.Name;
    hoverContainer.children[1].innerHTML = booking.People + " persoon";
    hoverContainer.children[2].innerHTML = hoverInfoString;
  }
  if (booking.People > 1) hoverContainer.children[1].innerHTML = booking.People + " personen";
  hoverContainer.style.borderColor = color;
}