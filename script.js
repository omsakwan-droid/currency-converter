// Exchange Rates (Base Currency: USD)
const exchangeRates = {
    USD: 1,
    INR: 83.2,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 155.4,
    AUD: 1.52,
    CAD: 1.36
};

// DOM Elements
const amountInput = document.getElementById("amount");
const fromCurrencyDropdown = document.getElementById("fromCurrency");
const toCurrencyDropdown = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const resultText = document.getElementById("resultText");

// Currency Conversion Function
function convertCurrency() {
    const amount = Number(amountInput.value);
    const fromCurrency = fromCurrencyDropdown.value;
    const toCurrency = toCurrencyDropdown.value;

    // Empty input
    if (amountInput.value.trim() === "") {
        resultText.textContent = "Please enter an amount.";
        return;
    }

    // Invalid amount
    if (isNaN(amount) || amount <= 0) {
        resultText.textContent = "Please enter a valid positive amount.";
        return;
    }

    // Prevent unrealistic values
    if (amount > 1000000000) {
        resultText.textContent = "Amount is too large.";
        return;
    }

    // Same currency selected
    if (fromCurrency === toCurrency) {
        resultText.textContent =
            `${amount.toFixed(2)} ${fromCurrency} = ${amount.toFixed(2)} ${toCurrency}`;
        return;
    }

    // Convert through USD base rate
    const convertedAmount =
        (amount / exchangeRates[fromCurrency]) *
        exchangeRates[toCurrency];

    // Format numbers nicely
    const formattedOriginal = Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formattedConverted = Number(convertedAmount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    resultText.textContent =
        `${formattedOriginal} ${fromCurrency} = ${formattedConverted} ${toCurrency}`;
}

// Convert Button
convertBtn.addEventListener("click", convertCurrency);

// Swap Button
swapBtn.addEventListener("click", () => {
    const temp = fromCurrencyDropdown.value;

    fromCurrencyDropdown.value = toCurrencyDropdown.value;
    toCurrencyDropdown.value = temp;

    convertCurrency();
});

// Auto convert when amount changes
amountInput.addEventListener("input", convertCurrency);

// Auto convert when currency changes
fromCurrencyDropdown.addEventListener("change", convertCurrency);
toCurrencyDropdown.addEventListener("change", convertCurrency);

// Convert on Enter key
amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        convertCurrency();
    }
});

// Initial conversion on page load
window.addEventListener("load", convertCurrency);