var languageDisplayerBackground;

ShowLanguageDisplayer();

function ShowLanguageDisplayer() {
  document.getElementById("content").style.display = "none";

  languageDisplayerBackground = document.createElement('div');
  languageDisplayerBackground.setAttribute('class', 'langDisplayer-background');
  document.body.appendChild(languageDisplayerBackground);

  var container = document.createElement('div');
  container.setAttribute('class', 'langDisplayer-container');
  languageDisplayerBackground.appendChild(container);

  var flagContainer = document.createElement('div');
  flagContainer.setAttribute('class', 'langDisplayer-flagContainer');
  container.appendChild(flagContainer);

  var flagNl = document.createElement('img');
  flagNl.src = '../icons/flag-nl.svg'
  flagNl.onclick = function() {
    LanguagePressed('nl');
  }
  flagNl.setAttribute('class', 'langDisplayer-flag');
  flagContainer.appendChild(flagNl);

  var flagEn = document.createElement('img');
  flagEn.src = '../icons/flag-en.svg'
  flagEn.onclick = function() {
    LanguagePressed('en');
  }
  flagEn.setAttribute('class', 'langDisplayer-flag');
  flagContainer.appendChild(flagEn);

  var flagFr = document.createElement('img');
  flagFr.src = '../icons/flag-fr.svg'
  flagFr.onclick = function() {
    LanguagePressed('fr');
  }
  flagFr.setAttribute('class', 'langDisplayer-flag');
  flagContainer.appendChild(flagFr);
}

function HideLanguageDisplayer() {
  languageDisplayerBackground.classList.add('exitAnim');
  document.getElementById("content").style.display = "inherit";
  setTimeout(function() {
    document.body.removeChild(languageDisplayerBackground);
  }, 1500);
}

function LanguagePressed(lang) {
  SetLang(lang);
  HideLanguageDisplayer();
}