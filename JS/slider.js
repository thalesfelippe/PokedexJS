let totalSlides = document.querySelectorAll('.slider-item').length;
let currentSlide = 0;

let slider = document.querySelector('.poke-slider');
let sliderWidth = document.querySelector('.leftside').clientWidth;
slider.style.width = `${sliderWidth * totalSlides}px`;

let controls = document.querySelector('.slider-controls');
controls.style.width = `${sliderWidth}px`;
controls.style.height = `${document.querySelector('.leftside').clientHeight}px`;

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
  slider.style.marginLeft = `-${newMargin}px`;
}

// adiciona um event listener que escuta o evento resize no objeto window
window.addEventListener('resize', function() {
  // atualiza a largura do slider e da área de controle
  sliderWidth = document.querySelector('.leftside').clientWidth;
  slider.style.width = `${sliderWidth * totalSlides}px`;
  controls.style.width = `${sliderWidth}px`;
  controls.style.height = `${document.querySelector('.leftside').clientHeight}px`;
});

setInterval(goNext, 5000);