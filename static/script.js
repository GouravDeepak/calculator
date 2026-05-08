document.addEventListener('DOMContentLoaded', function () {
    const countryInput = document.getElementById('country');
    const dropdownResults = document.getElementById('countryDropdown');
    const taxRateInput = document.getElementById('tax_rate');
    const salaryForm = document.getElementById('salaryForm');

    // Comprehensive average personal income tax rates (~250 countries)
    const globalTaxRates = {
        "Afghanistan": 10, "Albania": 15, "Algeria": 35, "Andorra": 10, "Angola": 25,
        "Antigua and Barbuda": 25, "Argentina": 35, "Armenia": 20, "Australia": 32.5, "Austria": 42,
        "Azerbaijan": 25, "Bahamas": 0, "Bahrain": 0, "Bangladesh": 25, "Barbados": 28,
        "Belarus": 13, "Belgium": 40, "Belize": 25, "Benin": 40, "Bhutan": 25,
        "Bolivia": 13, "Bosnia and Herzegovina": 10, "Botswana": 25, "Brazil": 27.5, "Brunei": 0,
        "Bulgaria": 10, "Burkina Faso": 30, "Burundi": 35, "Cabo Verde": 35, "Cambodia": 20,
        "Cameroon": 35, "Canada": 33, "Central African Republic": 40, "Chad": 35, "Chile": 35,
        "China": 45, "Colombia": 39, "Comoros": 30, "Congo (Congo-Brazzaville)": 40, "Costa Rica": 25,
        "Croatia": 30, "Cuba": 35, "Cyprus": 35, "Czech Republic": 23, "Denmark": 55,
        "Djibouti": 30, "Dominica": 35, "Dominican Republic": 25, "Ecuador": 35, "Egypt": 22.5,
        "El Salvador": 30, "Equatorial Guinea": 35, "Eritrea": 30, "Estonia": 20, "Eswatini": 33,
        "Ethiopia": 35, "Fiji": 20, "Finland": 51, "France": 45, "Gabon": 35,
        "Gambia": 35, "Georgia": 20, "Germany": 42, "Ghana": 25, "Greece": 44,
        "Grenada": 30, "Guatemala": 7, "Guinea": 40, "Guinea-Bissau": 40, "Guyana": 40,
        "Haiti": 30, "Honduras": 25, "Hungary": 15, "Iceland": 46, "India": 30,
        "Indonesia": 30, "Iran": 35, "Iraq": 15, "Ireland": 40, "Israel": 50,
        "Italy": 43, "Jamaica": 25, "Japan": 45, "Jordan": 30, "Kazakhstan": 10,
        "Kenya": 30, "Kiribati": 35, "Kuwait": 0, "Kyrgyzstan": 10, "Laos": 25,
        "Latvia": 31.4, "Lebanon": 25, "Lesotho": 35, "Liberia": 25, "Libya": 15,
        "Liechtenstein": 24, "Lithuania": 20, "Luxembourg": 42, "Madagascar": 20, "Malawi": 30,
        "Malaysia": 30, "Maldives": 15, "Mali": 40, "Malta": 35, "Marshall Islands": 12,
        "Mauritania": 40, "Mauritius": 15, "Mexico": 35, "Micronesia": 10, "Moldova": 12,
        "Monaco": 0, "Mongolia": 10, "Montenegro": 15, "Morocco": 38, "Mozambique": 32,
        "Myanmar (Burma)": 25, "Namibia": 37, "Nauru": 20, "Nepal": 35, "Netherlands": 49.5,
        "New Zealand": 39, "Nicaragua": 30, "Niger": 35, "Nigeria": 24, "North Korea": 0,
        "North Macedonia": 10, "Norway": 38.2, "Oman": 0, "Pakistan": 35, "Palau": 12,
        "Palestine State": 15, "Panama": 25, "Papua New Guinea": 42, "Paraguay": 10, "Peru": 30,
        "Philippines": 35, "Poland": 32, "Portugal": 48, "Qatar": 0, "Romania": 10,
        "Russia": 13, "Rwanda": 30, "Saint Kitts and Nevis": 0, "Saint Lucia": 30, "Saint Vincent and the Grenadines": 30,
        "Samoa": 27, "San Marino": 35, "Sao Tome and Principe": 20, "Saudi Arabia": 0, "Senegal": 40,
        "Serbia": 10, "Seychelles": 15, "Sierra Leone": 15, "Singapore": 22, "Slovakia": 25,
        "Slovenia": 50, "Solomon Islands": 40, "Somalia": 0, "South Africa": 45, "South Korea": 45,
        "South Sudan": 15, "Spain": 45, "Sri Lanka": 18, "Sudan": 15, "Suriname": 38,
        "Sweden": 52, "Switzerland": 40, "Syria": 22, "Taiwan": 40, "Tajikistan": 12,
        "Tanzania": 30, "Thailand": 35, "Timor-Leste": 10, "Togo": 35, "Tonga": 20,
        "Trinidad and Tobago": 25, "Tunisia": 35, "Turkey": 40, "Turkmenistan": 10, "Tuvalu": 30,
        "Uganda": 40, "Ukraine": 19.5, "United Arab Emirates": 0, "United Kingdom": 40, "United States": 37,
        "Uruguay": 36, "Uzbekistan": 12, "Vanuatu": 0, "Vatican City": 0, "Venezuela": 34,
        "Vietnam": 35, "Yemen": 15, "Zambia": 37.5, "Zimbabwe": 40
    };

    const countries = Object.keys(globalTaxRates).sort();

    function showResults(value) {
        dropdownResults.innerHTML = '';
        const filter = value.toLowerCase();

        if (!filter) {
            dropdownResults.style.display = 'none';
            return;
        }

        const filtered = countries.filter(c => c.toLowerCase().includes(filter));

        if (filtered.length > 0) {
            filtered.forEach(country => {
                const item = document.createElement('div');
                item.classList.add('dropdown-item');
                item.textContent = country;
                item.addEventListener('click', () => selectCountry(country));
                dropdownResults.appendChild(item);
            });
            dropdownResults.style.display = 'block';
        } else {
            dropdownResults.style.display = 'none';
        }
    }

    function selectCountry(country) {
        countryInput.value = country;
        dropdownResults.style.display = 'none';
        updateTaxRate(country);
    }

    function updateTaxRate(country) {
        if (globalTaxRates.hasOwnProperty(country)) {
            taxRateInput.classList.add('loading');

            setTimeout(() => {
                taxRateInput.value = globalTaxRates[country];
                taxRateInput.classList.remove('loading');

                // Visual confirmation
                taxRateInput.style.borderColor = 'var(--accent-success)';
                setTimeout(() => {
                    taxRateInput.style.borderColor = 'var(--card-border)';
                }, 500);
            }, 100);
        }
    }

    // Event Listeners
    countryInput.addEventListener('input', (e) => showResults(e.target.value));

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!countryInput.contains(e.target) && !dropdownResults.contains(e.target)) {
            dropdownResults.style.display = 'none';
        }
    });

    // Handle focus to show results if there's already text
    countryInput.addEventListener('focus', (e) => {
        if (e.target.value) showResults(e.target.value);
    });

    // Handle form clearing
    salaryForm.addEventListener('reset', function () {
        setTimeout(() => {
            taxRateInput.value = '';
            dropdownResults.style.display = 'none';
        }, 10);
    });
});
