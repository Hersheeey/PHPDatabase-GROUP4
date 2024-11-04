// Select all slider elements and the button
const sweetnessSlider = document.getElementById("sweetness");
const bitternessSlider = document.getElementById("bitterness");
const creaminessSlider = document.getElementById("creaminess");
const boldnessSlider = document.getElementById("boldness");
const mildnessSlider = document.getElementById("mildness");
const findCoffeeBtn = document.querySelector(".find-coffee-btn");

// Function to get slider values and recommend a coffee
function recommendCoffee() {
    const sweetness = parseInt(sweetnessSlider.value, 10);
    const bitterness = parseInt(bitternessSlider.value, 10);
    const creaminess = parseInt(creaminessSlider.value, 10);
    const boldness = parseInt(boldnessSlider.value, 10);
    const mildness = parseInt(mildnessSlider.value, 10);

    let recommendation = "Based on your preferences, Caffeine Kick recommends you: ";

    // Update the logic to work with slider values (0, 1, 2, 3) representing 25%, 50%, 75%, 100%
    if (sweetness === 3 && creaminess === 3) {
        recommendation += "<br>a Creamy Latte with Caramel or Vanilla Flavors.";
    } else if (bitterness === 3 && boldness === 3) {
        recommendation += "a Strong Espresso or Dark Roast.";
    } else if (mildness === 3) {
        recommendation += "a Light Roast or Americano for a smooth experience.";
    } else if (sweetness === 3 && mildness <= 1) {
        recommendation += "a Sweet Cold Brew or Fruit-infused Drink.";
    } else if (boldness === 3 && creaminess <= 1) {
        recommendation += "a Bold Black Coffee or Matcha.";
    } else {
        recommendation += "a Balanced blend like a Cappuccino or a Cafe Latte.";
    }

    alert(recommendation);
}


// Event listener for the button click
findCoffeeBtn.addEventListener("click", recommendCoffee);

// JavaScript to handle the reset functionality
document.getElementById('reset-button').addEventListener('click', function() {
    // Reset each slider to the default value
    document.getElementById('sweetness').value = 1; // Default to 50%
    document.getElementById('bitterness').value = 1;
    document.getElementById('creaminess').value = 1;
    document.getElementById('boldness').value = 1;
    document.getElementById('mildness').value = 1;
});

