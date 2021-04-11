let breeds = [];
document.addEventListener('DOMContentLoaded',function () {
    loadImages();
    loadBreedOptions();
})
function loadImages() {
const imgUrl = "https://dog.ceo/api/breeds/image/random/6"
fetch(imgUrl)
.then(res=> res.json())
.then(results => {
  results.message.forEach(image => addImage(image))
});
}
function addImage(dogPic) {
    let container = document.querySelector("#dog-image-container");
    let newImageEl = document.createElement('img');
    newImageEl.src = dogPic;
    container.appendChild(newImageEl);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(res=> res.json())
    .then(results => {
            breeds = Object.keys(results.message);
            updateBreedList(breeds);
            addBreedSelectionListener();
    })
}

function updateBreedList(breeds) {
let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
  }
  
function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectionListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      selectBreedsStartingWith(event.target.value);
    });
  }

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'blue';
  }