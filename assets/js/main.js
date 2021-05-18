const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}

function resizeOverlay() {
  var height = $('#spotlight').height();
  // console.log(height);
  $('#overlay').height(height + 1000);
}

function mapValueRange(value, inMin, inMax, outMin, outMax) {
  return (value - inMin) * (outMax - outMin) / 
    (inMax - inMin) + outMin;
}

// ----------------------------------------------------------------------------

var mouseX = 0;
var mouseY = 0;
var mouseThreshold = 1;
var scrollThreshold = 1;
var scrollCounter = 0;
var currentScroll = 0;

var overlays = [
  { src: 'overlay/01.png', loaded: false },
  { src: 'overlay/02.png', loaded: false },
  { src: 'overlay/03.png', loaded: false },
  { src: 'overlay/04.png', loaded: false },
  { src: 'overlay/05.png', loaded: false },
  { src: 'overlay/06.png', loaded: false },
  { src: 'overlay/07.png', loaded: false },
  { src: 'overlay/08.png', loaded: false },
  { src: 'overlay/09.png', loaded: false },
  { src: 'overlay/10.png', loaded: false },
  { src: 'overlay/12.png', loaded: false },
  { src: 'overlay/13.png', loaded: false },
  { src: 'overlay/14.png', loaded: false },
  { src: 'overlay/15.png', loaded: false },
  { src: 'overlay/16.png', loaded: false },
  { src: 'overlay/17.png', loaded: false },
  { src: 'overlay/18.png', loaded: false },
  { src: 'overlay/19.png', loaded: false },
  { src: 'overlay/20.png', loaded: false },
  { src: 'overlay/21.png', loaded: false },
  { src: 'overlay/22.png', loaded: false },
  { src: 'overlay/23.png', loaded: false },
  { src: 'overlay/24.png', loaded: false },
];
var overlayIDs = new Map();
var index = 0;
$(overlays).each(function () {
  overlayIDs[this.src] = index;
  index++;
});

var overlayChangeEnabled = false;
var overlaysLoaded = 0;
var nextOverlay = 0;

var colors = [
  '#000000',
  '#663300',
  '#ff6666',
  '#ff66ff',
  '#ffcccc',
  '#d3d3d3',
];
var nextColor = 0;
var interval = 0;

function showNewsletter() {
  interval = setInterval(function(){
    $('#newsletter').show();
    $('#mc_embed_signup').show();
    // clearInterval(interval);
    clearInterval(interval);
  }, 1000);
}

function hideNewsletter() {
  $('#newsletter').hide();
  $('#mc_embed_signup').hide();
}

function initOverlays() {

}

function preload() {
  for (var i = 0; i < overlays.length; i++) {
    var img = new Image();
    img.onload = function(event) {
      var key = event.target.attributes['src'].nodeValue;
      overlays[overlayIDs[key]].loaded = true;
      overlaysLoaded++;
      // $('<div id=\"overlay_' + overlayIDs[key] + '\" />').attr('class', 'overlay').appendTo('body').css('display','none');
    }
    img.src = overlays[i].src;
  }
}

function changeOverlay() {
  if (overlaysLoaded == overlays.length) {
    $('#overlay').css('background-image', 'url(' + overlays[nextOverlay].src + ')')
    // $('.overlay').hide();
    // $('#overlay_' + nextOverlay).show();
    if (nextOverlay == overlays.length - 1)
      nextOverlay = 0;
    else
      nextOverlay++;
  }
}

function changeBackgroundColor(forward) {
  $('.bg-color').animate( {
    backgroundColor: colors[nextColor]
  }, 7000);
  if (nextColor == colors.length - 1)
    nextColor = 0;
  else
    nextColor++;
}

$(document).scroll(function(event) {
  // console.log($(document).scrollTop());
  // var topBefore = currentScroll;
  var topAfter = $(document).scrollTop();
  // currentScroll = topAfter;
  // console.log("top-before:" + topBefore);
  // console.log("top-after:" + topAfter);
  // if (topAfter < topBefore)
  //   changeBackgroundColor(false);
  // else
  //   changeBackgroundColor(true);
  // $('#overlay').css('margin-top', topAfter);
  if (scrollCounter > scrollThreshold) {
    changeOverlay();
    scrollCounter = 0;
  }
  scrollCounter++;

  // hideNewsletter();
});

$(document).ready(function() {
  
  // resizeOverlay();

  // $('#overlay').css('background-image', 'url(overlay/0107.png)');
  preload();
  // $('#newsletter-notice').hide();

  // setInterval(function() {
  //   overlaysLoaded = overlays.length;
  // }, 6000);
});

$(window).resize(function() {
  // resizeOverlay();
});

$('#mc_embed_signup .email').click(function() {
  // $('#mc_embed_signup .email').css('background-color', 'white');
});

// $('#overlay').click(function() {
//   $('#mc_embed_signup .email').css('background-color', 'transparent');
// });
$('#mc_embed_signup .email').focusin(function() {
  // $('#newsletter-notice').show();
  // $('#mc_embed_signup form').css('background-color', 'white');
  $('#mc_embed_signup .button').show();
  $('#mc_embed_signup .email').attr("placeholder", "");

});

$('#mc_embed_signup .button').click(function() {
  $('#newsletter-notice').hide();
});

$('#mc_embed_signup .email').focusout(function() {
  
  
  // $('#newsletter-notice').hide();
  
  if($('#mc_embed_signup .email').val() === "") {
    // $('#mc_embed_signup .email').css('background-color', 'transparent');
    $('#mc_embed_signup .email').attr("placeholder", "Get a notification for offline events");
    $('div[for="mce-EMAIL"]').hide();
    $('#mc_embed_signup .button').hide();
    // $('#mc_embed_signup form').css('background-color', 'transparent');
    $('#newsletter-notice').show();
    // $('#newsletter-contact').show();
  } 
  // $('.mce_inline_error').hide();
});






// $('#newsletter-cta').click(function(event) {
//   showNewsletter();
// });