function renderAvailableAnimals() {
  // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
  // וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
  // במידה ואין פילטרים מסומנים, הציגו את כל החיות
}



function visitAnimal(animalName) {
  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
}

function setFilter(filterKey, filterValue) {

let FilterAnimals;

if(filterKey === 'isPredator' || filterKey === 'habitat' || filterKey === 'color') {
  FilterAnimals = animalsForView.filter(animal => animal[filterKey] === filterValue);
} else if (filterKey === 'weight' || filterKey === 'height') {
  FilterAnimals = animalsForView.filter(animal => animal[filterKey] > filterValue);
} else {
  console.log('invalid filter key');
  return ;
}

  /**
   * ממשו את הלוגיקה של השמת פילטר
   * הפילטרים הקיימים הם
   * isPredator: true | false
   * habitat: "land" | "sea"
   * weight: value > user selected weight
   * height: value > user selected height
   * color: dropdown of all available colors
   */
  // ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
  // רנדרו רק את החיות שעומדות בתנאים של הפילטרים


  localStorage.setItem('filters', JSON.stringify({ filterKey, filterValue }));

  renderAvailableAnimals(FilterAnimals);
}

window.onload = function() {
  generateDataset();
}

let animalsForView = [...animals]; 

// const getAnimalTemplate = (animal) => {
//   return `
//     <div class="card"> 
//     <div class= "animal-image">
//     <img src ="images/${animal.name}.jpg" alt="${animal.name}" />
//     </div>
//       <div class="card-body">
//         <p class="card-text">${animal.name}</p>
//         <p class="card-text">Weight: ${animal.weight}</p>
//         <p class="card-text">Height: ${animal.height}</p>
//         <p class="card-text">Color: ${animal.color}</p>
//         <p class="card-text">Habitat: ${animal.habitat}</p>
//         <p class="card-text">Is Predator: ${animal.isPredator ? "Yes" : "No"}</p>
//       </div>
//     </div>`;
// };

const getAnimalTemplate = (animal) => {
  return `
    <div class="card"> 
      <img class="animal-image" img src = "images/${animal.name}.jpg" alt="${animal.name}"</>
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
  wrapper.className = "animal-card";
  wrapper.innerHTML = template;
  return wrapper;
};

const renderAnimals = () => {
  const animalCards = animalsForView.map(getAnimalHTMLCard);
  const animalPlaceholder = document.getElementById("animal-cards");
  animalPlaceholder.append(...animalCards);
};

document.addEventListener("DOMContentLoaded", () => {
  renderAnimals();
});
