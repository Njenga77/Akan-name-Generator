//This is the array of names with corresponding gender and day of the week
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"]
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"]

//Storing variables from html
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

// To enable leap years and also to indicate Feb not 31 days 
function isLeapYear(year) {
    return(year % 4 === 0 && year % 100 !== 0)|| year % 400 === 0;
}

function getDaysInMonth(month, year) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2 && isLeapYear(year)) {
        return 29;
    }
    return daysInMonth [month - 1]; //Browser counts Jan as 0 so we substract one to make it understand the month
}

//Validating day, month number, year and gender
function validateInput(day, month, year, gender) {
    if (day === "" || month === "" || year === "" || gender === "") {
    alert("Please fill in all the fields");
    return false;
    }

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

    if (dayNum < 1 || dayNum > getDaysInMonth(monthNum, yearNum)) {
        alert ("That day does not exist in the month you entered.");
        return false;
    }

    return true;
}

//The formula
function calculateDayOfWeek (day, month, year) {
// The formula counts January and February as months 13 and 14 of the previous year
    if (month < 3) {
        month = month + 12;
        year = year - 1;
    }

    const cc = Math.floor(year / 100);
    const yy = year % 100;

    const d = (Math.floor(cc / 4) - 2 * cc - 1
        + Math.floor((5 * yy) / 4)
        + Math.floor( (26 * (month + 1)) / 10 )
        + day) % 7;
    
    return (d + 7) % 7;
}

function getAkanName (dayNumber, gender) {
    if (gender === "male") {
        return maleNames[dayNumber];
    }
    return femaleNames[dayNumber];
}

function showResult (dayNumber, akanName) {
    bornOn.textContent = `You were born on a ${dayNames[dayNumber]}`;
    akanNameDisplay.textContent = akanName;

    formSection.classList.remove("slide-in");
    formSection.classList.add("slide-out");

    setTimeout(function () {
        formSection.classList.add("hidden");
        formSection.classList.remove("slide-out");

        resultCard.classList.remove("hidden");
        resultCard.classList.add("slide-in");
    }, 500);
}


generateButton.addEventListener ("click", function () {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;
    const gender = genderSelect.value;

    if (!validateInput(day, month, year, gender)) {
        return;
    }

    const dayNumber = calculateDayOfWeek (Number(day), Number(month), Number(year) );
    const akanName = getAkanName (dayNumber, gender);
    showResult(dayNumber, akanName);
});

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
