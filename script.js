const meals=document.getElementById('meals')

fetchRandomMeal()

async function fetchRandomMeal(){
const randomResp = await fetch ("https://www.themealdb.com/api/json/v1/1/random.php");
const randomMeal = await randomResp.json();
const randomResult=randomMeal.meals[0]

addMeal(randomResult,true);

}


async function fetchMealById(id){
    const idMeal=await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"+ id)
}

async function fetchMealBySearch(term){
    const searchMeal =await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"+ term)
}

function addMeal(mealData, random=false){
    const meal= document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML=`  
    <div class="meal-head">
        ${random ?`<sapn class="random">وصفة اليوم</sapn>`: ''}

        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" height="350" width="350">
    </div>

    <div class="meal-body">
        <h3>${mealData.strMeal}/h3>
        <button class="like-btn active" >إعجاب</button>
    </div> 
    `

}