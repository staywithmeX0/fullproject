document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const slidersContainer = document.querySelector(".sliders");
    let currentIndex = 0;
    let autoSlideInterval; 
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add("active");
        } else {
          slide.classList.remove("active");
        }
      });
      const offset = -index * 100;
      slidersContainer.style.transform = `translateX(${offset}%)`;
    }
  
    function moveSlide(direction) {
      const totalSlides = slides.length;
      currentIndex += direction;
      if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
      } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
      }
      showSlide(currentIndex);
    }
  
    function startAutoSlide() {
      stopAutoSlide(); 
      autoSlideInterval = setInterval(() => {
        moveSlide(1);
      }, 3000); 
    }
    function stopAutoSlide() {
      clearInterval(autoSlideInterval); 
    }
    showSlide(currentIndex);
    startAutoSlide();

    document.querySelector(".prev").addEventListener("click", function () {
      stopAutoSlide(); 
      moveSlide(-1);

    });
    document.querySelector(".next").addEventListener("click", function () {
      stopAutoSlide();
      moveSlide(1);
      startAutoSlide();
    });
    slidersContainer.addEventListener("mouseover", stopAutoSlide);
    slidersContainer.addEventListener("mouseout", startAutoSlide);
  });