var errorLabels = [];

function NewErrorLabel(element, string) {
  var h = document.createElement("p");
  var t = document.createTextNode(string);
  h.appendChild(t);
  document.body.appendChild(h);
  h.className = "errorLabel";
  errorLabels.push(h);

  var xScroll = element.scrollLeft || document.documentElement.scrollLeft;
  var yScroll = element.scrollTop || document.documentElement.scrollTop;
  var rect = element.getBoundingClientRect();

  //var xOffset = parseInt(window.getComputedStyle(element, null).getPropertyValue('padding-left'), 10);
  var xOffset = 10;

  var x = rect.left + xScroll + xOffset;
  var y = rect.bottom + yScroll - 10;

  h.style.top = y + "px";
  h.style.left = x + "px";
}

function ClearErrorLabels() {
  for (var i = errorLabels.length - 1; i >= 0; i--) {
    errorLabels[i].parentNode.removeChild(errorLabels[i]);
    removeFromArray(errorLabels, errorLabels[i]);
  }
}

window.onresize = function() {
  ClearErrorLabels();
}

document.onmousedown = function() {
  ClearErrorLabels();
}

function removeFromArray(array, elem) {
  var index = array.indexOf(elem);
  while (index > -1) {
    array.splice(index, 1);
    index = array.indexOf(elem);
  }
}
