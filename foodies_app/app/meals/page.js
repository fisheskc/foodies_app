import { Suspense } from 'react';
import Link from 'next/link'
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
async function Meals() {
  // You can also use await in this component function. This is not something you can normally do in React,
    // but you can do it with server components. You can await the call to get meals data, & we get back our meals here 
    // We therefore use the meals down there where you have the MealsGrid. You pass meals to MealsGrid
    console.log('Fetching meals');
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
// A react functional component
// We want to output a bunch of meals, which will be stored in the database
// <MealsGrid meals={[]}/> is set to an empty array as we have no meals yet
// Server component functions can actually be converted to async functions
// export default async function MealsPage() { - you can use the async keyword, something
// you normally also cannot do on your React components, but you can do that on server components.
// If you had some code that you would use a promise, you could use await here
export default function MealsPage() {
    // Use the fetch function to send a request to the backend.
    // On the backend, we could reach out to that database & get the data from there.
    // In a NextJS application, we actually already have a backend.
    // We have backend & frontend combined. All your components are by default
    // server components that are only executed on the server unless you are using a feature
    // that requires them to be a client component like useEffect.
    // Because we have those server components as a default, we do not need useEffect & we do not 
    // need to send a fetch request to get data.
    // This is a server component that only runs on the server. So reaching out to a database is safe here.
    
  
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favourite recipe and cook it yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share your favourite recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
        <MealsGrid meals={[]} />
      </main>
    </>
  )
     
 
}