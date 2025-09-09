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
    <ul id="click">
        <li class="list-none hover:text-white hover:bg-green-500 rounded-md px-3 py-2">All Trees</li>`;

    categories.forEach(cat => {
        html += `<li id="${cat.id}" class="list-none px-3 py-2 hover:bg-green-500 hover:text-white rounded-md cursor-pointer">
                    ${cat.category_name}
                 </li>`;
    });
    html += `</ul>`;
    sidebar.innerHTML = html;
    click.addEventListener("click", (e) => {
            setActiveCategory(index);
            loadCategory(element.id);
        });
}

loadCategory();

// sidebar end
