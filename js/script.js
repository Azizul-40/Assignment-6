let price = 0;
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
        displaycatebar(data.categories); 
    })
}

const displaycatebar = (categories) => {
    const sidebar = document.getElementById("left");

    // HTML assemble 
    let html = `<h2 class="text-2xl font-bold text-black">Categories</h2>
    <ul id="category-list">
        <li id="all" class="list-none hover:text-white hover:bg-green-500 rounded-md px-3 py-2 cursor-pointer active-category">All Trees</li>`;

    categories.forEach(cat => {
        html += `<li id="cat-${cat.id}" class="category-item list-none px-3 py-2 m-3 hover:bg-green-500 hover:text-white rounded-md cursor-pointer">
                    ${cat.category_name}
                 </li>`;
    });
    html += `</ul>`;
    sidebar.innerHTML = html;
    
    // Adding event listeners to category items
    document.getElementById('all').addEventListener('click', () => {
        setActiveCategory('all');
        loadPlants();
    });
    
    categories.forEach(cat => {
        document.getElementById(`cat-${cat.id}`).addEventListener('click', () => {
            setActiveCategory(`cat-${cat.id}`);
            loadPlantsByCategory(cat.id);
        });
    });
}

const setActiveCategory = (id) => {
    // Removing active class from all categories
    document.querySelectorAll('.category-item, #all').forEach(item => {
        item.classList.remove('active-category', 'bg-green-500', 'text-white');
    });
    
    // Adding active class to  the selected category
    const selectedCategory = document.getElementById(id);
    selectedCategory.classList.add('active-category', 'bg-green-500', 'text-white');
}

const loadPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
        displayPlants(data.plants);
    })
}

const loadPlantsByCategory = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
        displayPlants(data.plants);
    })
}

const displayPlants = (plants) => {
    const productGrid = document.getElementById("product-grid");
    
    let html = '';
    
    plants.forEach(plant => {
        html += `
        <div class="card bg-white rounded-lg shadow-md overflow-hidden max-h-fit">
            <figure class="h-48">
                <img 
                    alt="${plant.name}" 
                    src="${plant.image}"
                    class="w-full h-full object-cover"
                /> 
            </figure>
            <h2 class="mt-4 font-semibold text-lg text-slate-900 px-6 cursor-pointer">
                ${plant.name}
            </h2>
            <p class="mt-1 text-slate-600 text-sm leading-relaxed px-6">
                ${plant.description}               
            </p>
            <div class="mt-3 flex items-center justify-between px-6">
                <span class="bg-[#d4f4d7] text-[#2a8a4a] rounded-full px-4 py-1 text-sm font-medium select-none">
                    ${plant.category}
                </span>
                <span class="font-bold text-lg text-slate-900 flex items-center">
                    ৳${plant.price}
                </span>
            </div>
            <button onclick="addToCard(${plant.id}, '${plant.name}', ${plant.price})" class="add-to-card-btn m-6 bg-[#1f6f3d] text-white text-lg font-normal rounded-full py-3 hover:bg-[#1a5c31] transition-colors" type="button">
                Add to Cart
            </button>
        </div>
        `;
    });
    
    productGrid.innerHTML = html;
}

const addToCard = (id, name, price) => {
    const showCardSec = document.getElementById("add-to-card");
    const totalPriceElement = document.getElementById("total-price");
    
    // Create a new cart item
    const newDiv = document.createElement('div');
    newDiv.className = 'flex justify-between items-center bg-green-100 p-2 rounded mb-2';
    newDiv.id = `cart-item-${id}`;
    newDiv.innerHTML = `
        <span>${name}</span>
        <span onclick="removeFromCard('cart-item-${id}', ${price})" class="cursor-pointer text-red-500 hover:text-red-700">❌</span>
        <span>৳${price}</span>   
    `;
    
    // Add to cart
    showCardSec.appendChild(newDiv);
    
    // Update total price
    const currentTotal = parseFloat(totalPriceElement.innerText.replace('৳', '')) || 0;
    const newTotal = currentTotal + price;
    totalPriceElement.innerText = `৳${newTotal}`;
}

const removeFromCard = (itemId, price) => {
    const itemToRemove = document.getElementById(itemId);
    const totalPriceElement = document.getElementById("total-price");
    
    if (itemToRemove) {
        // Remove the item from the cart
        itemToRemove.remove();
        
        // Update total price by subtracting the removed item's price
        const currentTotal = parseFloat(totalPriceElement.innerText.replace('৳', '')) || 0;
        const newTotal = currentTotal - price;
        totalPriceElement.innerText = `৳${newTotal}`;
    }
}

// Initialize the page
loadCategory();
loadPlants(); // Load all plants by default