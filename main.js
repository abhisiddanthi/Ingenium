const joinUs = document.getElementById('join-us');
const dropdown = document.getElementById('dropdown-menu');
const arrow = document.getElementById('arrow');

joinUs.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('show');
    arrow.innerHTML = isOpen ? '&#x25B2;' : '&#x25BC;';
});

document.addEventListener('click', (e) => {
    if (!joinUs.contains(e.target)) {
        dropdown.classList.remove('show');
        arrow.innerHTML = '&#x25BC;';
    }
});


// Your image sources
const images = [
    'Images/Clientele/clientele1.png',
    'Images/Clientele/clientele2.png',
    'Images/Clientele/clientele3.png',
    'Images/Clientele/clientele4.png',
    'Images/Clientele/clientele5.png',
    'Images/Clientele/clientele6.png',
    'Images/Clientele/clientele7.png',
    'Images/Clientele/clientele8.png',
    'Images/Clientele/clientele9.png',
    'Images/Clientele/clientele10.png',
    'Images/Clientele/clientele11.png',
    'Images/Clientele/clientele12.png',
    'Images/Clientele/clientele13.png',
    'Images/Clientele/clientele14.png',

];

const track = document.getElementById('carousel-track');

function appendImages(imgArray) {
  imgArray.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = "carousel image";
    track.appendChild(img);
  });
}

appendImages(images);
appendImages(images);