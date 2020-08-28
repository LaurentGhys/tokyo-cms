const acceptedTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'INPUT'];
const langDataPath = '../lang.json';
var langData;

function LoadLangData(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', langDataPath, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
     callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

LoadLangData(function(data) {
  // Parse JSON string into object
  langData = JSON.parse(data);
}); 

function SetLang(lang) {
  var elements = document.getElementsByTagName("*");
  for (var i=0; i < elements.length; i++)  {   
    if (elements[i].innerHTML.toString().includes("lang!")) {
      var tag = elements[i].tagName;
      if (acceptedTags.includes(tag)) {
        var key = elements[i].innerHTML.toString().replace('lang!', '');
        if (langData[key]!= null) {
          var value = langData[key][lang];
          elements[i].innerHTML = value;
        }
      }
    } else if (elements[i].placeholder != null) {
      if (elements[i].placeholder.toString().includes('lang!')) {
        var key = elements[i].placeholder.toString().replace('lang!', '');
        var value = langData[key][lang];
        elements[i].placeholder = value;
      }
    }
    if (elements[i].value != null) {
      if (elements[i].value.toString().includes('lang!')) {
        var key = elements[i].value.toString().replace('lang!', '');
        var value = langData[key][lang];
        elements[i].value = value;
      }
    }
  }
}
