let totalSlides = document.querySelectorAll('.slider-item').length;
let currentSlide = 0;

let sliderWidth = document.querySelector('.leftside').clientWidth;

document.querySelector('.poke-slider').style.width = `${sliderWidth * totalSlides}px`;

document.querySelector('.slider-controls').style.width = `${sliderWidth}px`;
document.querySelector('.slider-controls').style.height = `${document.querySelector('.leftside').clientHeight}px`;

function goPrevious(){
  currentSlide--;
  if(currentSlide < 0){
    currentSlide = totalSlides - 1;
  }
  updateMargin();
}

function goNext(){
  currentSlide++;
  if(currentSlide > (totalSlides-1)) {
    currentSlide = 0;
  }
  updateMargin();
}

function updateMargin(){
  let sliderItemWidth = document.querySelector('.slider-item').clientWidth;
  let newMargin = (currentSlide * sliderItemWidth);
  document.querySelector('.poke-slider').style.marginLeft = `-${newMargin}px`;
}

setInterval(goNext, 5000);