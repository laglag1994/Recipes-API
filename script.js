const meals=document.getElementById('meals')

fetchRandomMeal()

async function fetchRandomMeal(){
const randomResp = await fetch ("https://www.themealdb.com/api/json/v1/1/random.php");
const randomMeal = await randomResp.json();
const randomResult=randomMeal.meals[0]

console.log(randomResult);

}


async function fetchMealById(id){
    const idMeal=await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"+ id)
}

async function fetchMealBySearch(term){
    const searchMeal =await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"+ term)
}

