$(function() {

  //settings for slider
  var width = 720;
  var animationSpeed = 1000;
  var pause = 3000;
  var currentSlide = 1;

  //cache DOM elements
  var $slider = $('#slider');
  var $slideContainer = $('.slides', $slider);
  var $slides = $('.slide', $slider);
  var currentActiveImage, nextActiveImage;
  var restartTimeout;
  var interval;

  function nextSlide(e){
    currentActiveImage = $(".active-image");
    nextActiveImage = currentActiveImage.next();

    if(nextActiveImage.length == 0){
      nextActiveImage = $('.slides li').first();
      console.log(nextActiveImage);
    }
    nextActiveImage.addClass('next-image').removeClass('hidden-image');
    if(currentActiveImage.index() == $('.slides li').last().index()){
      changeSlides();
    } else {
      toTheLeftAnimation();
    }
    if (e !== undefined) e.preventDefault();
  }

  function prevSlide(e){
    currentActiveImage = $(".active-image");
    nextActiveImage = currentActiveImage.prev();

    if(nextActiveImage.length == 0){
      nextActiveImage = $('.slides li').last();
      console.log(nextActiveImage);
    }
    nextActiveImage.addClass('next-image').removeClass('hidden-image');
    if(currentActiveImage.index() == $('.slides li').first().index()){
      changeSlides();
    } else {
      $slideContainer.css('margin-left', -width);
      toTheRightAnimation();
    }

    if (e !== undefined) e.preventDefault();
  }

  function changeSlides(){
    currentActiveImage.removeClass('active-image').addClass('hidden-image').css("z-index", 8);
    nextActiveImage.addClass('active-image').removeClass('next-image').css("z-index", 8);
    $("#slider .slide").not(currentActiveImage, nextActiveImage).css("z-index", 1);
  }

  $('.control').on("click", function(e){
    moveToSlide = $(this).index();
    newSlide = $('.slides li').eq(moveToSlide);
      currentActiveImage = $(".active-image");
      nextActiveImage = newSlide;
      nextActiveImage.removeClass('hidden-image');
      changeSlides();
      newSlide.removeClass('hidden-image');
    e.preventDefault();
  });

  function toTheLeftAnimation() {
    $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
      changeSlides();
      $slideContainer.css('margin-left', 0);
      $(".prevLink").prop( "disabled", false );
      $(".nextLink").prop( "disabled", false );
    });
  }

  function toTheRightAnimation() {
    $slideContainer.animate({'margin-left': '+='+width}, animationSpeed, function() {
      changeSlides();
      $slideContainer.css('margin-left', 0);
      $(".prevLink").prop( "disabled", false );
    });
  }

  $(".nextLink").on("click", function(){
    $(".nextLink").prop( "disabled", true );
    nextSlide();
  });
  $(".prevLink").on("click", function(){
    $(".prevLink").prop( "disabled", true );
    prevSlide();
  });

  function startSlider() {
    interval = setInterval(function() {
      nextSlide();
    }, pause);
  }

  function pauseSlider() {
      clearInterval(interval);
  }

  $slider
      .on('mouseenter', pauseSlider)
      .on('mouseleave', startSlider);

  startSlider();
});
