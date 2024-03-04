document.addEventListener("DOMContentLoaded", () => {
  generateDataset();
  renderAvailableAnimals();
  applyFiltersFromLocalStorage(); // Apply filters on page load
});

function applyFiltersFromLocalStorage() {
  const nameFilter = localStorage.getItem("name-filter");
  const weightFilter = localStorage.getItem("weight-filter");
  const heightFilter = localStorage.getItem("height-filter");
  const colorFilter = localStorage.getItem("color-filter");
  const habitatFilter = localStorage.getItem("habitat-filter");

  renderFilteredAnimals(nameFilter, weightFilter, heightFilter, colorFilter, habitatFilter);
}

function renderFilteredAnimals(nameFilter, weightFilter, heightFilter, colorFilter, habitatFilter) {
  const filteredAnimals = animalsForView.filter(animal => {
    // Check if the animal matches all filter criteria
    if (nameFilter && animal.name.toLowerCase() !== nameFilter.toLowerCase()) {
      return false;
    }
    if (weightFilter && animal.weight < parseFloat(weightFilter)) {
      return false;
    }
    if (heightFilter && animal.height < parseFloat(heightFilter)) {
      return false;
    }
    if (colorFilter && animal.color !== colorFilter) {
      return false;
    }
    if (habitatFilter && habitatFilter !== 'all' && animal.habitat !== habitatFilter) {
      return false;
    }
    return true;
  });

  const animalsToDisplay = filteredAnimals.length ? filteredAnimals : animalsForView;
  const animalCards = animalsToDisplay.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.innerHTML = ''; // Clear previous cards
  animalPlaceholder.append(...animalCards);

  // Add event listeners after appending cards to DOM
  animalCards.forEach(card => {
    card.addEventListener("click", () => {
      visitAnimal(card.querySelector(".card-text").textContent); // Assuming the name is in the card text
    });
  });
}

function setFilter(filterKey, filterValue) {
  // Set filter in localStorage
  localStorage.setItem(filterKey, filterValue);
  // Apply filters and render available animals
  applyFiltersFromLocalStorage();
}

// Event listeners for filter inputs
const nameInput = document.querySelector("#name");
nameInput.addEventListener("input", () => {
  setFilter("name-filter", nameInput.value);
});

const weightInput = document.querySelector("#weight");
weightInput.addEventListener("input", () => {
  setFilter("weight-filter", weightInput.value);
});

const heightInput = document.querySelector("#height");
heightInput.addEventListener("input", () => {
  setFilter("height-filter", heightInput.value);
});

const colorInput = document.querySelector("#color");
colorInput.addEventListener("input", () => {
  setFilter("color-filter", colorInput.value);
});

const habitatInputs = document.querySelectorAll("[name='habitat']");
habitatInputs.forEach(input => {
  input.addEventListener("change", () => {
    setFilter("habitat-filter", input.value);
  });
});

function visitAnimal(animalName) {
  localStorage.setItem("selectedAnimal", animalName);
  window.location.href = "animal.html";
}

const animalsForView = [...animals];

const getAnimalTemplate = (animal) => {
  return `
    <div class="card"> 
      <img class="animal-image" src="images/${animal.name}.jpg" alt="${animal.name}">
      <div class="card-body">
        <p class="card-text">${animal.name}</p>
        <p class="card-text">Weight: ${animal.weight}</p>
        <p class="card-text">Height: ${animal.height}</p>
        <p class="card-text">Color: ${animal.color}</p>
        <p class="card-text">Habitat: ${animal.habitat}</p>
        <p class="card-text">Is Predator: ${animal.isPredator}</p>
      </div>
    </div>`;
};

const getAnimalHTMLCard = (animal) => {
  const template = getAnimalTemplate(animal);
  const wrapper = document.createElement("div");
  wrapper.className = "animal-card"; // corrected class name
  wrapper.innerHTML = template;
  return wrapper;
};

const renderAnimals = () => {
  const animalCards = animalsForView.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.innerHTML = ''; // Clear previous cards
  animalPlaceholder.append(...animalCards);

  // Add event listeners after appending cards to DOM
  animalCards.forEach(card => {
    card.addEventListener("click", () => {
      visitAnimal(card.querySelector(".card-text").textContent); // Assuming the name is in the card text
    });
  });
};

// Call renderAnimals to render the initial set of animals
renderAnimals();
