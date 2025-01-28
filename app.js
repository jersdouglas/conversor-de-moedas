document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');

    const apiKey = '2cd3ecd55ea1610d09fe8782';
    const apiURL = `https://v6.exchangerate-api.com/v6/2cd3ecd55ea1610d09fe8782/latest/USD`;

    // Fetch currency options and populate dropdowns
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                fromCurrency.appendChild(option.cloneNode(true));
                toCurrency.appendChild(option);
            });
        });

    // Convert currency
    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`)
            .then(response => response.json())
            .then(data => {
                resultDiv.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
            });
    });
});
