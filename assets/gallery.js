document.addEventListener("DOMContentLoaded", function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  
  const closeButton = document.createElement('div');
  closeButton.classList.add('lightbox-close');
  closeButton.textContent = '×';
  lightbox.appendChild(closeButton);

  const lightboxImage = document.createElement('img');
  lightbox.appendChild(lightboxImage);
  
  document.body.appendChild(lightbox);

  closeButton.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === closeButton) {
      lightbox.classList.remove('active');
    }
  });

  galleryItems.forEach(item => {
    // Preload the full-size image
    const preloadImage = new Image();
    preloadImage.src = item.href;

    item.addEventListener('click', e => {
      e.preventDefault();
      lightboxImage.src = item.href; // Update the lightbox image src
      lightbox.classList.add('active');
    });
  });
});
