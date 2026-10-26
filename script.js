const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const genderSelect = document.getElementById("gender");
const generateButton = document.getElementById("generate");

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

generateButton.addEventListener ("click", function () {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;
    const gender = genderSelect.value;

    if (!validateInput(day, month, year, gender)) {
        return;
    }

    console.log("Valid input:", day, month, year, gender);
});
