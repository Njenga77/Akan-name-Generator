const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"]
const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"]

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

function validateInput (day, month, year, gender) {
    if (day === "" || month === "" || year === "" || gender === "") {
        alert ("Please fill in all the fields");
        return false;
    }

    if (Number(day) < 1 || Number(day) > 31) {
        alert ("Day must be between 1 and 31.");
        return false;
    }
    if (Number(month) < 1 || Number(month) > 12) {
        alert ("Month must be between 1 and 12.");
        return false;
    }

    return true;
}

function calculateDayOfWeek (day, month, year) {
// The formula counts January and February as months 13 and 14 of the previous year
    if (month < 3) {
        month = month + 12;
        year = year - 1;
    }

    const cc = Math.floor(year / 100);
    const yy = year % 100;

    d = (Math.floor(cc / 4) - 2 * cc - 1
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

    formSection.classList.add("hidden");
    resultCard.classList.remove("hidden");
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
    formSection.classList.remove("hidden");
})
