//Akan name data
//This is the array of names with corresponding gender and day of the week
//0 = Sunday, 1 = Monday ... 6 = Saturday
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

//===Page elements ===
//Storing variables to the HTML elements
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const genderSelect = document.getElementById("gender");
const generateButton = document.getElementById("generate");
const bornOn = document.getElementById("bornOn");
const akanNameDisplay = document.getElementById("akanName");
const formSection = document.getElementById("formSection");
const resultCard = document.getElementById("resultCard");
const resetButton = document.getElementById("reset");

//=== Validation helpers===

// Returns true for a leap year. A leap year is divisible by 4 or if it is a century year divisible by 400
function isLeapYear(year) {
    return(year % 4 === 0 && year % 100 !== 0)|| year % 400 === 0;
}

// Returns how many days a month has, so a date like 31 February is rejected
function getDaysInMonth(month, year) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2 && isLeapYear(year)) {
        return 29;
    }

    // Array positions start at 0, so January (month 1) is position 0.
    return daysInMonth [month - 1]; 
}

// Checks the user's input. Shows an alert and returns false at the first problem found, or returns true if everything is valid.
function validateInput(day, month, year, gender) {
    if (day === "" || month === "" || year === "" || gender === "") {
        alert("Please fill in all the fields");
        return false;
    }

    // Values read from input boxes are text, so convert them to numbers.
    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(dayNum) || !Number.isInteger(monthNum) || !Number.isInteger(yearNum)) {
        alert("Day, month and year should be whole numbers");
        return false;
    }

    if (monthNum < 1 || monthNum > 12) {
        alert("Month must be between 1 and 12.");
        return false;
    }
    
    if (yearNum < 1900 || yearNum > currentYear) {
        alert(`Year must be between 1900 and ${currentYear}.`);
        return false;
    }

    // The day is checked last because it depends on a valid month and year.
    if (dayNum < 1 || dayNum > getDaysInMonth(monthNum, yearNum)) {
        alert ("That day does not exist in the month you entered.");
        return false;
    }

    return true;
}

// ==== Calculation ====

// Finds the day of the week using the formula from the assignment brief.
// Returns a number from 0 (Sunday) to 6 (Saturday).
function calculateDayOfWeek (day, month, year) {
// The formula counts January and February as months 13 and 14 of the previous year
    if (month < 3) {
        month = month + 12;
        year = year - 1;
    }

    const cc = Math.floor(year / 100); // first two digits of the year
    const yy = year % 100;             // last two digits of the year

    // Math.floor rounds down, because the formula uses whole-number division.
    const d = (Math.floor(cc / 4) - 2 * cc - 1
        + Math.floor((5 * yy) / 4)
        + Math.floor( (26 * (month + 1)) / 10 )
        + day) % 7;
    
    // In JavaScript, % can give a negative result, so add 7 and take the remainder again to land between 0 and 6.
    return (d + 7) % 7;
}

// Picks the Akan name for a day number, using the male or female list.
function getAkanName (dayNumber, gender) {
    if (gender === "male") {
        return maleNames[dayNumber];
    }
    return femaleNames[dayNumber];
}

// ===== Showing the result =====

// Fills in the result card, slides the form out to the left, then slides the card in.
function showResult (dayNumber, akanName) {
    bornOn.textContent = `You were born on a ${dayNames[dayNumber]}`;
    akanNameDisplay.textContent = akanName;

    formSection.classList.remove("slide-in");
    formSection.classList.add("slide-out");

    // Wait 500 ms, the same length as the slide-out animation in styles.css, so the form is not hidden before its animation finishes.
    setTimeout(function () {
        formSection.classList.add("hidden");
        formSection.classList.remove("slide-out");

        resultCard.classList.remove("hidden");
        resultCard.classList.add("slide-in");
    }, 500);
}

// ===== Events =====

// When "Generate Name" is clicked: read the input, validate it, calculate the day, find the name and show it.
generateButton.addEventListener ("click", function () {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;
    const gender = genderSelect.value;

    if (!validateInput(day, month, year, gender)) {
        return; // stop here if the input is invalid
    }

    const dayNumber = calculateDayOfWeek (Number(day), Number(month), Number(year) );
    const akanName = getAkanName (dayNumber, gender);
    showResult(dayNumber, akanName);
});

// When "Try Again" is clicked: clear every field and bring the form back.
resetButton.addEventListener("click", function () {
    dayInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    genderSelect.value = "";

    resultCard.classList.add("hidden");
    resultCard.classList.remove("slide-in");

    formSection.classList.add("slide-in");
    formSection.classList.remove("hidden");
});
