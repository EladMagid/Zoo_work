const form = document.getElementById("create-visitor-form");


    //let visitorNameInput;

    const validateFormInputs = () => {
        let visitorNameInput = document.getElementById("fname").value;
        if (!visitorNameInput) {
            alert("Please type!");
            return false;
        }
            return true;
      };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    

    let visitorNameInput = document.getElementById("fname").value;
    let visitorCoins = 50;
    let visitor = {name:visitorNameInput, coins:visitorCoins };

    if(!validateFormInputs()) {
        return;
    }

    if(!visitorExists()) {
        visitors.push(visitor);
        console.log("Visitor added successfully!");
        const visitorsJSON = JSON.stringify(visitors);
        localStorage.setItem("visitors",visitorsJSON);
        form.reset();
        window.location.href = "./login.html"
    }
    else {
        console.log("Visitor already exists!");
    }

    });

    const visitorExists = () => {
        let visitorNameInput = document.getElementById("fname").value;
        let exists = visitors.some(visitor => visitor.name === visitorNameInput);
        if(exists) {
            alert("Visitor already exists!")
        }
        return exists;
      };



function createNewVisitor(event) {

  // ביטול התנהגות דיפולטיבית של שליחת טופס
  // קראו עוד כאן: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  event.preventDefault();

  /**
  צרו אורח חדש כאן 👇
  ניתן לפצל את הלוגיקה למספר בלתי מוגבל של פונקציות.
  כמו שיותר מפוצל וטהור - פונקציות עם מטרה יחידה ושם משמעותי שמסביר מה הפונקציה עושה ומחזירה
  דוגמא:

  const validateFormInputs = () => {
    בודק האם האינפוטים קיימים ויש בהם ערך
    מחזיר האם תקין או לא (בוליאני)
  }

  const visitorExists = (name) => {
    מקבל שם ומחזיר תשובה האם השם האורח קיים
  }

  const makeVisitor = (name) => {
    מקבל שם, בודק שאין אותו כבר במערך האורחים ומחזיר אובייקט אורח
  }
  **/
}

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
