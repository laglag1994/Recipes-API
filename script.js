const meals = document.getElementById('meals')

fetchRandomMeal()


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
    const idMeal = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772" + id)
}

//نفس اللي قبل
async function fetchMealBySearch(term) {
    const searchMeal = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata" + term)
}


// فتكشن تاخذ متغيرين -الداتا للوجبة + الراندوم للوجبة * 
function addMeal(mealData, random = false) {

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
        <button class="like-btn active" >إعجاب</button>
    </div> 
    `;

    //مو مهم بس كنت بسوي اكتيف للزر وما زبط
    const btn = meal.querySelector('.meal-body .like-btn');
    addEventListener('click', () => {
        btn.classList.toggle('avtive');
    });

    //Add an HTML element
    meals.appendChild(meal);
}

//اخذ الوجبة اللي انعمل لها لايك واحفظها في ستور
    function storeMeals(){

    }

//اخذ الوجبة المحفوظة
    function getStored(){

    }

