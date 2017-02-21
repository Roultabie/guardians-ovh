// ==UserScript==
// @name        Kolab for roundcube in OVH
// @namespace   https://mail.ovh.net/roundcube
// @include     https://mail.ovh.net/roundcube/*
// @match       https://mail.ovh.net/roundcube/*
// @version     1
// ==/UserScript==

window.$ && $(document).ready(function(){
// Get current elements
var header     = document.getElementById("header");
var topLine    = document.getElementById("topline");
var topNav     = document.getElementById("topnav");
var taskBar    = document.getElementById("taskbar");
var logo       = document.getElementById("toplogo");
var control    = document.getElementById("aria-label-topnav");
var about      = document.getElementById("rcmbtn102");
var logout     = document.getElementById("rcmbtn103");
var mainScreen = document.getElementById("mainscreen");
var username   = document.getElementsByClassName("username")[0];
var br         = document.getElementsByTagName("br")[0];
var body       = document.getElementsByTagName("body")[0];

// Create new divs
var topLeft     = document.createElement("div");
var aboutSpan   = document.createElement("span");
var taskMenu    = document.createElement("div");
var activeTask  = document.createElement("span");
var dropDown    = document.createElement("span");
var topRight    = document.createElement("div");
var topGradient = document.createElement("div");
var kTaskPopup  = topNav;

// Populate topleft
topLeft.setAttribute("class", "topleft");
topLeft.setAttribute("role", "banner");
topLeft.setAttribute("aria-labelledby", "aria-label-topnav");

aboutSpan.setAttribute("class", "aboutlinks");
if (about.className == "about-link") {
 aboutSpan.appendChild(about); 
}

topLeft.appendChild(control);
topLeft.appendChild(logo);
topLeft.appendChild(aboutSpan);

// Populate taskmenu
taskMenu.setAttribute("id", "taskmenu");
taskMenu.setAttribute("class", "topright ktaskmenu");
taskMenu.setAttribute("role", "button");
taskMenu.setAttribute("tabindex", "0");
taskMenu.setAttribute("aria-haspopup", "true");
taskMenu.setAttribute("aria-expanded", "false");
taskMenu.setAttribute("aria-owns", "application-tasks-menu");
activeTask.setAttribute("class", "activetask");
dropDown.setAttribute("class", "dropdownhandle");

taskMenu.appendChild(activeTask);
taskMenu.appendChild(dropDown);

// Populate topright
topRight.setAttribute("class", "topright");
topRight.setAttribute("role", "contentinfo");

topRight.appendChild(username);

// Populate ktaskpopup
kTaskPopup.setAttribute("id", "ktaskpopup");
kTaskPopup.setAttribute("class", "ktaskmenu");
kTaskPopup.setAttribute("role", "navigation");
kTaskPopup.setAttribute("aria-labelledby", "aria-label-tasknav");

taskBar.removeAttribute("role");
taskBar.removeAttribute("aria-labelledby");

taskBar.setAttribute("class", "popupmenu");
taskBar.setAttribute("id", "application-tasks-menu");

// Clean Header
header.removeChild(topLine);
//header.removeChild(topNav);

// Re-populate header
header.appendChild(topLeft);
header.appendChild(taskMenu);
header.appendChild(topRight);
header.appendChild(br);
//...

// Edit and add latest divs
topGradient.setAttribute("class", "topgradient");

document.body.insertBefore(topGradient, mainScreen);
document.body.insertBefore(kTaskPopup, mainScreen);

// Add Menu label
var currentTask = kTaskPopup.querySelector(".button-selected");
var currentType = currentTask.className.substr(currentTask.className.indexOf("-"));
currentType   = currentType.substr(1, currentType.indexOf(" "));
var label = currentTask.querySelector(".tooltip");
activeTask.appendChild(label);
activeTask.setAttribute("class", "activetask " + currentType);

// Customize logo
var logoDataUri = "data:image/png;base64,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"
logo.setAttribute("src", logoDataUri);

// Add class to body for stylish exclude iframe
if (body.className.length > 0) {
    body.setAttribute("class", body.className + " stylish");
}
else {
    body.setAttribute("class", "stylish");
}



// Kolab JS
// register hover events for taskmenu

  $('#ktaskpopup').width($('#taskmenu').outerWidth());

  var timer = null;
  $('#taskmenu, #ktaskpopup').hover(function(e){
    clearTimeout(timer);
    if (e.target.id != 'ktaskpopup') {
      $('#ktaskpopup').fadeIn(100);
    }
  }, function(){
    clearTimeout(timer);
    timer = setTimeout(function(){ $('#ktaskpopup').fadeOut(100) }, 50);
  });

  $('#taskmenu').bind('click touchstart', function(e){
    $('#ktaskpopup').toggle();
    e.preventDefault();
    if (!rcube_event.is_keyboard(e))
      $(this).blur();
  })
  .bind('keyup', function(e){
    var key = rcube_event.get_keycode(e),
      popup = $('#ktaskpopup'),
      vis = popup.is(':visible');

    if (key == 13 || key == 40 || (vis && (key == 27 || key == 9))) {
      if (vis && key == 40) vis = false;
      popup[(vis ? 'hide' : 'show')]();
      vis = !vis;
      if (vis) popup.find('a:not([aria-disabled=true])').first().focus();
      $('#taskmenu').attr('aria-expanded', vis ? 'true' : 'false');
    }
  });

  // enable keyboard navigation inside tasks menu
  $('#ktaskpopup').on('keyup', function(e) {
    var dir = 1;
    switch (rcube_event.get_keycode(e)) {
      case 9:   // tab
      case 27:  // escape
        $('#ktaskpopup').hide();
        $('#taskmenu').attr('aria-expanded', 'false').focus();
        break;

      case 38:  // up
        dir = -1;
      case 40:  // down
        var mod = dir < 0 ? 'prevAll' : 'nextAll';
        $('#ktaskpopup').find(':focus')[mod]('a:not([aria-disabled=true])').first().focus();
        break;
    }
  })
});