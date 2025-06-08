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
document.addEventListener('DOMContentLoaded', function() {
    const topicsContainer = document.getElementById('topics');
    topicsContainer.addEventListener('change', function(e) {
        const checked = topicsContainer.querySelectorAll('input[type="checkbox"]:checked');
        if (checked.length > 3) {
            e.target.checked = false;
            alert('You can select up to 3 topics only.');
        }
    });
});
// Search about users and display the result
    // card of each suggested user
customElements.define("suggested-friend",class extends HTMLElement{
    connectedCallback(){
        this.getHTML = 
        `<div class="card shadow-s m-4 p-2" style="width: 400px;">
            <div class="card-body p-3">
                <div class="d-flex align-items-center mb-3">
                    <img src="${this.getAttribute("img")}" alt="User Avatar" class="rounded-circle mr-3" id="template-avatar" width="48" height="48">
                    <div>
                        <h5 class="card-title mb-0" id="template-username">${this.getAttribute("username")}</h5>
                        <small class="text-muted" id="template-gender-country">${this.getAttribute("gender")} • ${this.getAttribute("country")}</small>
                    </div>
                </div>
                <div class="mb-2">
                    <strong>Languages:</strong>
                    <span id="template-langs" class="ml-1">${this.getAttribute("langs")}</span>
                </div>
                <div class="mb-2">
                    <strong>Interested in:</strong>
                    <div id="template-topics" class="mt-1">
                        <span class="badge badge-dark bg-dark text-light mr-1">${this.getAttribute("intr1")}</span>
                        <span class="badge badge-dark bg-dark text-light mr-1">${this.getAttribute("intr2")}</span>
                        <span class="badge badge-dark bg-dark text-light">${this.getAttribute("intr3")}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-end align-items-center mt-3">
                    <a href="${this.getAttribute("contact")}" class="btn btn-outline-success btn-sm" id="template-contact">
                        Contact me
                    </a>
                </div>
            </div>
        </div>`
    }
})