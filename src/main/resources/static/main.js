const pElement = document.getElementById("Random Drink");

document.getElementById('searchRandomForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent form submission
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // convert the response body as JSON
        const data = await response.json();
        const randomDrink = data['drinks'][0]
        pElement.innerHTML = `Random Drink: <strong> ${randomDrink['strDrink']}</strong>.<br>
                                Drink Id: <strong> ${randomDrink['idDrink']}</strong>.<br>
                                `

    } catch (error) {
        console.log(error);
    }
})