(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);

// var element = document.documentElement,
//     body = document.body,
//     scrollTop = 'scrollTop',
//     scrollHeight = 'scrollHeight',
//     progress = document.querySelector('.progress-bar'),
//     scroll;

// document.addEventListener('scroll', function() {
//     scroll = (element[scrollTop] || body[scrollTop]) / ((element[scrollHeight] || body[scrollHeight]) - element.clientHeight) * 100;
//     progress.style.setProperty('--scroll', scroll + '%');
// });