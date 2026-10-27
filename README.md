# Akan Name Generator

A web app that tells you your Akan name, based on the day of the week you were born and your gender.

Akan names come from Ghanaian culture, where children are named after the day of the week they were born. Enter your day, month and year of birth and choose your gender, and the app calculates your day of birth and shows your Akan name.


## Live Site

https://njenga77.github.io/Akan-name-Generator/

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Njenga77/Akan-name-Generator.git
```

2. Open the project folder:

```bash
cd Akan-name-Generator
```

3. Open `index.html` in any web browser. No installation or build step is needed.


## Technologies Used

- **HTML5**: page structure and the input form
- **CSS3**: custom properties (variables), flexbox, grid, pseudo-elements, gradients and keyframe animations
- **JavaScript (ES6)**: input validation, the day-of-week calculation, arrays and DOM manipulation
- **Google Fonts**: Poppins and Montserrat
- **Git and GitHub**: version control
- **GitHub Pages**: hosting

## How It Works

1. The user enters their day, month and year of birth, and chooses a gender.
2. The input is validated. An alert appears if a field is empty, the month is not between 1 and 12, the year is outside 1900 to the current year, or the day does not exist in that month (leap years are handled).
3. The day of the week is calculated with this formula:

```
d = (((CC / 4) - 2 x CC - 1) + ((5 x YY) / 4) + ((26 x (MM + 1)) / 10) + DD) mod 7
```

Where CC is the first two digits of the year, YY is the last two digits, MM is the month and DD is the day. For January and February, the month is treated as month 13 or 14 of the previous year. The result, from 0 (Sunday) to 6 (Saturday), is used as the position in arrays of Akan names.

4. The matching Akan name is shown on a result card.

## Akan Names

| Day       | Male Name | Female Name |
|-----------|-----------|-------------|
| Sunday    | Kwasi     | Akosua      |
| Monday    | Kwadwo    | Adwoa       |
| Tuesday   | Kwabena   | Abenaa      |
| Wednesday | Kwaku     | Akua        |
| Thursday  | Yaw       | Yaa         |
| Friday    | Kofi      | Afua        |
| Saturday  | Kwame     | Ama         |