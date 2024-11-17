import MealItem from './meal-item'
import classes from './meals-grid.module.css'
// We output a bunch of meal items in a grid
// We get the meals that should be output here as a prop
// We forward all those meal properties from that meal we have to the MealItem
// We use the ... syntax to pull out all the properties of that meal object & spread them 
// as key-value pairs, so as props in the end, onto this MealItem
// The meals we have in this meals array eventually will have all those properties that are expected as props here.
export default function MealsGrid({meals}) {
    // We output an unordered list & map through all meals, so that for every meal, we can output a list of them
    // Every list item needs a key, & the key can be meal.id, because every meal with have an id. Mealsgrid is output in the page.js file, in the meals folder, in the app folder
    // Inside of that list item, we output the meal item details.
    return (
        <ul className={classes.meals}>
           {meals.map(meal => <li key={meal.id}>
                <MealItem {...meal}/>
           </li>)} 
        </ul>
    )
}