// Get HTML elements
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const errorMessage = document.getElementById("errorMessage");
const results = document.getElementById("results");

// Result elements
const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

// Absolute zero constants
const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_F = -459.67;
const ABSOLUTE_ZERO_K = 0;

// Validate input in real time
function validateInput() {
    const value = temperatureInput.value;

    errorMessage.textContent = "";
    results.hidden = true;

    if (temperatureInput.validity.badInput) {
        errorMessage.textContent =
            "Please enter a valid numeric temperature.";

        return false;
    }

    if (value.trim() === "") {
        errorMessage.textContent =
            "Temperature value is required.";

        return false;
    }

    if (!Number.isFinite(Number(value))) {
        errorMessage.textContent =
            "Please enter a valid numeric temperature.";

        return false;
    }

    const temperature = Number(value);
    const unit = unitSelect.value;

    // Check absolute zero
    if (unit === "C" && temperature < ABSOLUTE_ZERO_C) {
        errorMessage.textContent =
            "Temperature cannot be below -273.15°C (absolute zero).";

        return false;
    }

    if (unit === "F" && temperature < ABSOLUTE_ZERO_F) {
        errorMessage.textContent =
            "Temperature cannot be below -459.67°F (absolute zero).";

        return false;
    }

    if (unit === "K" && temperature < ABSOLUTE_ZERO_K) {
        errorMessage.textContent =
            "Kelvin cannot be below 0 K (absolute zero).";

        return false;
    }

    return true;
}

// Real-time validation
temperatureInput.addEventListener("input", validateInput);
unitSelect.addEventListener("change", validateInput);

// Convert temperature when button is clicked
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Validate before conversion
    if (!validateInput()) {
        return;
    }

    const temperature = Number(temperatureInput.value);
    const unit = unitSelect.value;

    let celsius;
    let fahrenheit;
    let kelvin;

    // Convert based on selected input unit
    if (unit === "C") {
        celsius = temperature;
        fahrenheit = (temperature * 9 / 5) + 32;
        kelvin = temperature + 273.15;
    }

    else if (unit === "F") {
        celsius = (temperature - 32) * 5 / 9;
        fahrenheit = temperature;
        kelvin = celsius + 273.15;
    }

    else if (unit === "K") {
        celsius = temperature - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
        kelvin = temperature;
    }

    // Display results to two decimal places
    celsiusResult.textContent =
        celsius.toFixed(2) + " °C";

    fahrenheitResult.textContent =
        fahrenheit.toFixed(2) + " °F";

    kelvinResult.textContent =
        kelvin.toFixed(2) + " K";

    // Show the results section
    results.hidden = false;

    // Clear error message
    errorMessage.textContent = "";
});