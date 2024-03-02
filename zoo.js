// // function renderAvailableAnimals() {
// //   // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
// //   // וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
// //   // במידה ואין פילטרים מסומנים, הציגו את כל החיות
// // }



// // function visitAnimal(animalName) {
// //   localStorage.setItem("selectedAnimal", animalName);
// //   Window.location.href = "animal.html"
// //   // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
// //   // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
// // }

// // // function setFilter(filterKey, filterValue) {


// //   /**
// //    * ממשו את הלוגיקה של השמת פילטר
// //    * הפילטרים הקיימים הם
// //    * isPredator: true | false
// //    * habitat: "land" | "sea"
// //    * weight: value > user selected weight
// //    * height: value > user selected height
// //    * color: dropdown of all available colors
// //    */
// //   // ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
// //   // רנדרו רק את החיות שעומדות בתנאים של הפילטרים

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

  // Set the filter values to the respective input elements
  const nameInput = document.querySelector("#name");
  if (nameFilter) {
    nameInput.value = nameFilter;
  }

  const weightInput = document.querySelector("#weight");
  if (weightFilter) {
    weightInput.value = weightFilter;
  }

  const heightInput = document.querySelector("#height");
  if (heightFilter) {
    heightInput.value = heightFilter;
  }

  const colorInput = document.querySelector("#color");
  if (colorFilter) {
    colorInput.value = colorFilter;
  }

  const habitatInputs = document.querySelectorAll("[name='habitat']");
  if (habitatFilter) {
    habitatInputs.forEach(input => {
      if (input.value === habitatFilter) {
        input.checked = true;
      }
    });
  }

  // Render available animals based on the applied filters
  renderAvailableAnimals(); // This line seems redundant here.
}

function renderAvailableAnimals() {
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.innerHTML = ""; // Clear existing content

  const nameFilter = localStorage.getItem("name-filter");
  const weightFilter = localStorage.getItem("weight-filter");
  const heightFilter = localStorage.getItem("height-filter");
  const colorFilter = localStorage.getItem("color-filter");
  const habitatFilter = localStorage.getItem("habitat-filter");

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
 animalPlaceholder.append(...animalCards);

  
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
  wrapper.className = "animal-cards"; // This should be "animal-card", singular
  wrapper.innerHTML = template;
  return wrapper;
};

const renderAnimals = () => {
  const animalCards = animalsForView.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.append(...animalCards);
};