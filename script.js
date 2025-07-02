const images = [
	'img1.jpg',
	'img2.jpg',
	'img3.jpg',
	'img4.jpg',
	'img5.jpg'
];

const container = document.getElementById('container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const heading = document.getElementById('h');
const para = document.getElementById('para');

let clickedImages = [];
let duplicateImage = '';

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function loadImages() {
	let tempImages = [...images];

	const randomIndex = Math.floor(Math.random( ) * tempImages.length);
	duplicateImage = tempImages[randomIndex];

	let imageSet = [...tempImages, duplicateImage];

	shuffle(imageSet);

	container.innerHTML = '';

	imageSet.forEach((src, index) => {
		const img = document.createElement('img');
		img.src = src;

		const baseName = src.split('.')[0];
		img.classList.add(baseName);

		img.dataset.index = index;
		img.alt = baseName;

		img.addEventListener('click', () => selectImage(img));
		container.appendChild(img);
	});
}

function selectImage(img) {
	if (clickedImages.includes(img)) return;

	img.style.border = "2px solid green";
	clickedImages.push(img);

	if (clickedImages.length === 1) {
		resetButton.style.display = 'inline-block';
	} else if (clickedImages.length === 2) {
		verifyButton.style.display = 'inline-block';
	}
}

resetButton.addEventListener('click', () => {
	clickedImages.forEach(img => img.style.border = '');
	clickedImages = [];
	resetButton.style.display = 'none';
	verifyButton.style.display = 'none';
	para.textCntent = '';
});

verifyButton.addEventListener('click', () => {
	if (clickedImages.length !== 2) return;
	
verifyButton.style.display = 'none';

const src1 = clickedImages[0].src;
const src2 = clickedImages[1].src;

if (src1 === src2) {
	para.textContent = "You are a human. Congratulations!";
} else {
	para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
}
});

window.onload = loadImages;