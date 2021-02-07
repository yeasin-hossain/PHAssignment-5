const itemName = document.querySelector('#item__name');
const searchButton = document.querySelector('#search__button');

// fetch item
const fetchRecipe = (recipeName) => {
	// filter input empty or not
	if (recipeName.length >= 1) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.meals != null) {
					recipeRender(data.meals);
				} else {
					message(
						`<h4>😢 😢 Sorry <span class="text-danger"> ${recipeName} </span> is not Available! please Try Something else!</h4>`
					);
					spinner('stop');
				}
			});
	} else {
		//  i don't know what's wrong with "spinner" function. it's not working hare. that's why i choice alternative
		document.querySelector('.spinner-border').classList.add('d-none');
		spinner('stop');
		message(`<h4>😢 😢 Your recipe name Please!!!</h4>`);
	}
};

// fetch single item
const singleItem = (e) => {
	// call single item by id
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`)
		.then((res) => res.json())
		.then((data) => {
			singleRecipeRender(data.meals);
		});
};

//All recipe render function
const recipeRender = (recipes) => {
	// map the array and render to dom and "singleItem" function call for render single item
	const recipeItem = recipes
		.map((recipe) => {
			return `
            <div class="card mt-3 cursor-pointer" style="width: 18rem;cursor: pointer;" onClick="singleItem(${recipe.idMeal})">
                <img src="${recipe.strMealThumb}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${recipe.strMeal}</h5>
                </div>
            </div>
        `;
		})
		.join('');
	document.querySelector('.content__section').innerHTML = recipeItem;
	spinner('stop');
};

// single recipe render function
const singleRecipeRender = (recipes) => {
	// in ingredients has null and empty value that's why i filter it using for loop.
	const ingredients = recipes[0];
	const ingredient = [];
	for (let i = 1; i <= 20; i++) {
		if (ingredients[`strIngredient${i}`]) {
			ingredient.push(
				`<li class="list-group-item">✔ ${ingredients[`strMeasure${i}`]} ${
					ingredients[`strIngredient${i}`]
				}</li>`
			);
		}
	}

	const recipeItem = recipes
		.map((recipe) => {
			return `
            <div class="card border-0 p-3" style="width: 80%;">
                <img src="${
									recipe.strMealThumb
								}" class="card-img-top d-block m-auto"style="height:250px; width:250px" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${recipe.strMeal}</h5>
                    <p class="card-text">${recipe.strCategory}</p>
                    <p class="card-text">${recipe.strInstructions}</p>
                </div>
                <ul class="list-group list-group-flush">
                <h6 class="card-text">Ingredients</h6>
                    ${ingredient.join('')}
                </ul>
                <button class="btn btn-info" onClick="modalClose()">Close</button>
            </div>
        `;
		})
		.join('');
	// there is 2 option render single item i'm choice modal option, you can try 2nd option by uncomment "content__section"
	messageModal(recipeItem);
	// document.querySelector('.content__section').innerHTML = recipeItem;
};

// Enter key event
item__name.addEventListener('keyup', (e) => {
	e.keyCode === 13 ? (fetchRecipe(e.target.value), spinner('open')) : 'sorry';
});
// Button event
searchButton.addEventListener('click', () => {
	fetchRecipe(itemName.value);
	spinner('open');
});

// error message
const message = (msg) => {
	const msgDom = document.querySelector('.error__message');
	msgDom.innerHTML = msg;

	displayToggle('.error__message', 'block');
	setTimeout(() => {
		displayToggle('.error__message', 'none');
	}, 3000);
};

// single item  Modal
const messageModal = (e) => {
	const modal = document.querySelector('.message__modal');
	modal.innerHTML = e;
	displayToggle('.message__modal', 'flex');
	displayToggle('.content__section', 'none');
};

// Modal Close
const modalClose = () => {
	displayToggle('.message__modal', 'none');
	displayToggle('.content__section', 'block');
	document.querySelector('.content__section').classList.add('d-flex');
};

// Display Toggle
const displayToggle = (content, type) => {
	const contentName = document.querySelector(content);
	if (type == 'none') {
		contentName.classList.add('d-none');
		contentName.classList.remove('d-block');
		contentName.classList.remove('d-flex');
	} else if (type == 'flex') {
		contentName.classList.add('d-flex');
		contentName.classList.remove('d-none');
	} else {
		contentName.classList.remove('d-none');
		contentName.classList.add('d-block');
	}
};

// spinner
const spinner = (spinType) => {
	if (spinType == 'open') {
		displayToggle('#spinner', 'flex');
	} else {
		displayToggle('#spinner', 'none');
	}
};
