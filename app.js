const itemName = document.querySelector('#item__name');
const searchButton = document.querySelector('#search__button');

// fetch item
const fetchRecipe = (recipeName) => {
	if (recipeName.length === 1) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${recipeName}`)
			.then((res) => res.json())
			.then((data) => {
				recipeRender(data.meals);
			});
	} else {
		fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeName}`)
			.then((res) => res.json())
			.then((data) => {
				recipeRender(data.meals);
			});
	}
};

// recipe render function
const recipeRender = (recipes) => {
	const recipeItem = recipes
		.map((recipe) => {
			return `
            <div class="card mt-3" style="width: 18rem" onClick="singleItem(${recipe.idMeal})">
                <img src="${recipe.strMealThumb}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${recipe.strMeal}</h5>
                </div>
            </div>
        `;
		})
		.join('');
	document.querySelector('.content__section').innerHTML = recipeItem;
	console.log(recipes);
};

item__name.addEventListener('keyup', (e) => {
	// if (e.keyCode === 13) {
	// 	fetchRecipe(e.target.value);
	// 	console.log('yes');
	// }
	e.keyCode === 13 ? fetchRecipe(e.target.value) : 'soryy';
});
searchButton.addEventListener('click', () => {
	console.log(itemName.value);
	fetchRecipe(itemName.value);
});

// fetch single item
const singleItem = (e) => {
	console.log(e);
};
