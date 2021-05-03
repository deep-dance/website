const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}

function preload(arrayOfImages) {
  $(arrayOfImages).each(function () {
      $('<img />').attr('src',this).appendTo('body').css('display','none');
  });
}

function resizeOverlay() {
  var height = $('#spotlight').height();
  $('#overlay').height(height + 1000);
}

// ----------------------------------------------------------------------------

var mouseX = 0;
var mouseY = 0;
var mouseThreshold = 10;

var overlays = [
  'overlay/0107.png',
  'overlay/0108.png',
  'overlay/0109.png',
  'overlay/0110.png',
  'overlay/0111.png',
  'overlay/0112.png',
  'overlay/0113.png',
  'overlay/0114.png',

  'overlay/0146.png',
  'overlay/0147.png',
  'overlay/0148.png',
  'overlay/0149.png',
  'overlay/0150.png',
  'overlay/0151.png',
  'overlay/0152.png',
  'overlay/0153.png',

  'overlay/0169.png',
  'overlay/0170.png',
  'overlay/0171.png',
  'overlay/0172.png',
  'overlay/0173.png',
  'overlay/0174.png',
  'overlay/0175.png',
  'overlay/0176.png',
];
var nextOverlay = 1;

function changeOverlay() {
  $('#overlay').css('background-image', 'url(' + overlays[nextOverlay] + ')')
  if (nextOverlay == overlays.length - 1)
    nextOverlay = 0;
  else
    nextOverlay++;
}

// $(document).mousemove(function(event) {
//   var mouseDiffX = Math.abs(mouseX - event.pageX);
//   var mouseDiffY = Math.abs(mouseY - event.pageY);
//   if (mouseDiffX > mouseThreshold || mouseDiffY > mouseThreshold) {
//     changeOverlay();
//   }
//   mouseX = event.pageX;
//   mouseY = event.pageY;
// });

$(document).scroll(function(event) {
  // console.log($(document).scrollTop());
  changeOverlay();
});

$(document).ready(function() {
  resizeOverlay();
  preload(overlays);
});

$(window).resize(function() {
  resizeOverlay();
});