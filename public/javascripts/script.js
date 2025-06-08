// fetch the list of countries
let countries
fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        countries = data.map(country => country.name.common);
        for (let i = 0; i < countries.length; i++) {
                $("#country").append(`<option value="${countries[i].replace(countries[i][0],countries[i][0].toLowerCase())}">${countries[i]}</option>`)
        }
    })
    .catch(error => $("#country").append(`<option>Error fetching countries: ${error}</option>`));

// links :
    // first : https://restcountries.com/v3.1/all
    // second: https://countriesnow.space/api/v0.1/countries/positions

// topics
const topics = [
    "Science","Technology","Engineering",
    "Mathematics","Art","Culture","History",
    "Geography","Philosophy","Politics",
    "Economics","Health","Environment"
]
topics.forEach(e => {
    let lower_e = e.replace(e[0],e[0].toLowerCase())
    $("#topics").append(`
        <div class="custom-control custom-checkbox mr-3">
            <input type="checkbox" class="custom-control-input" name="langs" id="${lower_e}" value="${lower_e}">
            <label class="custom-control-label" for="${lower_e}">
                ${e}
            </label>
        </div>
    `)
});