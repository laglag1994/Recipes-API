const meals = document.getElementById('meals')
const favContainer = document.getElementById('fav-meals')

const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

fetchRandomMeal();
fetchFavMeal();


//اعرف متغير و ركوست على رابط api باستخدام الفتش
// اعرف متغير ثاني واحط فيه المتغير الاول اللي انحفظت فيه معلومات الفتش واضيفها للجيسون
//اعرف متغير اخير اضيف فيه النتيجة بعد الفتش والجيسون 
// addMeal فنكشن عشان اخذ النتيجة الاخيرة واشتغل عليها 
async function fetchRandomMeal() {
    const randomResp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");

    const randomMeal = await randomResp.json();
    const randomResult = randomMeal.meals[0]

    addMeal(randomResult, true);

}

// نفس اللي قبل
async function fetchMealById(id) {
    const idResp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772" + id);
    const idMeal = await idResp.json();
    const meal = idMeal.meals[0]
    return meal

}

//نفس اللي قبل

async function getMealsBySearch(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}


// فتكشن تاخذ متغيرين -الداتا للوجبة + الراندوم للوجبة * 
function addMeal(mealData, random = false) {
    console.log(mealData)
    //Create div HTML element  
    const meal = document.createElement('div');
    //add 'meal' class to meal element 
    meal.classList.add('meal');


    meal.innerHTML = `  
    <div class="meal-head">
        ${random ? `<sapn class="random">وصفة اليوم</sapn>` : ''}

        <img src="${mealData.strMealThumb}" 
        alt="${mealData.strMeal}" height="350" width="350">
    </div>

    <div class="meal-body">
    <h3>${mealData.strMeal}</h3>
    <button class="fav-btn">
        <i class="fas fa-heart"></i>
    </button>
</div>
`;

    //مو مهم بس كنت بسوي اكتيف للزر وما زبط
    const btn = meal.querySelector('.meal-body .like-btn');
    addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal)
            btn.classList.remove('avtive');
        } else {
            addMealToLS(mealData.idMeal)
            btn.classList.add('active');
        }
         fetchFavMeal();
    });



    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    //Add an HTML element
    meals.appendChild(meal);
}




//اضيف الوجبة للايكات
function addMealToLS(id) {
    const mealIds = getMealFromLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, id]))
}




//احذف الوجبة من اللايكات
function removeMealFromLS(id) {
    const mealIds = getMealFromLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((theId) => theId !== id))
    );
}



//اخذ الوجبة المحفوظة
function getMealFromLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;

}



async function fetchFavMeal() {
    
    favContainer.innerHTML = "";

    const mealIds = getMealFromLS();

    for (let i = 0; i < mealIds.length; i++) {

        const mealId = mealIds[i];
        meals = await fetchMealById(mealId)

        addToFav(meals)
    }
}


function addToFav(mealData) {
    const favMeal = document.createElement('li');


    favMeal.innerHTML = `  
    <li>
         <img
          src="${mealData.strMealThumb}"
           height="80px" width="80px">
           <span>${mealData.strMeal}</span>
    </li>
    <button class="clear"><i class="fas fa-window-close"></i></button>
    `;



    //Add an HTML element
    
    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealFromLS(mealData.idMeal);

        fetchFavMeal();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favContainer.appendChild(favMeal);


}


// function showMealInfo(mealData) {
//     // clean it up
//     mealInfoEl.innerHTML = "";

//     // update the Meal info
//     const mealEl = document.createElement("div");

//     const ingredients = [];

//     // get ingredients and measures
//     for (let i = 1; i <= 20; i++) {


//         if (mealData["strIngredient" + i]) {
//             ingredients.push(
//                 `${mealData["strIngredient" + i]} - ${
//                     mealData["strMeasure" + i]
//                 }`
//             );
//         } else {
//             break;
//         }

//     }
    


//     mealEl.innerHTML = `
//     <h1>${mealData.strMeal}</h1>
//     <img
//         src="${mealData.strMealThumb}"
//         alt="${mealData.strMeal}"
//     />
//     <p>
//     ${mealData.strInstructions}
//     </p>
//     <h3>Ingredients:</h3>
//     <ul>
//         ${ingredients
//             .map(
//                 (ing) => `
//         <li>${ing}</li>
//         `
//             )
//             .join("")}
//     </ul>
// `;

// mealInfoEl.appendChild(meals);



// // show the popup
// mealPopup.classList.remove("hidden");
// }




// searchBtn.addEventListener("click", async () => {
//     // clean container
//     meals.innerHTML = "";

//     const search = searchTerm.value;
//     const meals = await getMealsBySearch(search);

//     if (meals) {
//         meals.forEach((meal) => {
//             addMeal(meal);
//         });
//     }
// });

// popupCloseBtn.addEventListener("click", () => {
//     mealPopup.classList.add("hidden");
// });