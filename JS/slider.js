document.addEventListener('DOMContentLoaded', function() {
  const totalSlides = document.querySelectorAll('.slider-item').length;
  let currentSlide = 0;

  const slider = document.querySelector('.poke-slider');
  const leftside = document.querySelector('.leftside');
  const controls = document.querySelector('.slider-controls');
  const indicatorsContainer = document.querySelector('.slider-indicators');

  function setSliderDimensions() {
    controls.style.width = `${leftside.clientWidth}px`;
    controls.style.height = `${leftside.clientHeight}px`;
  }
  setSliderDimensions();

  for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateMargin();
    });
    indicatorsContainer.appendChild(dot);
  }

  function updateIndicators() {
    const dots = indicatorsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  window.goPrevious = function() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    }
    updateMargin();
  };

  window.goNext = function() {
    currentSlide++;
    if (currentSlide > (totalSlides - 1)) {
      currentSlide = 0;
    }
    updateMargin();
  };

  function updateMargin() {
    const sliderItem = document.querySelector('.slider-item');
    const sliderItemWidth = sliderItem.offsetWidth;
    const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
    const totalSlideWidth = sliderItemWidth + gap;

    const leftsideWidth = leftside.clientWidth;
    const offset = (leftsideWidth - sliderItemWidth) / 2;

    slider.style.marginLeft = `calc(${-currentSlide * totalSlideWidth + offset}px)`;

    updateIndicators();
  }

  window.addEventListener('resize', function() {
    setSliderDimensions();
    updateMargin();
  });

  setInterval(window.goNext, 5000);

  let touchStartX = null;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  slider.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    let touchEndX = e.changedTouches[0].clientX;
    if (touchEndX < touchStartX - 40) {
      window.goNext();
    } else if (touchEndX > touchStartX + 40) {
      window.goPrevious();
    }
    touchStartX = null;
  });

  updateMargin();
});
