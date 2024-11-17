import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';
// This component expects a bunch of props & outputs them in a structured way
// It has a link, that takes us to a specifc mealDetailspage. The path is constructed dynamically - {`/meals/${slug}`}
// with a dynamically injected segment, that will be different for every meal, because we have that dynamic mealDetailspage.
// The meal-item page which expects a dynamic value - [mealSlug] folder name, for that path segment, so that we can visit
// that details page for different meals. Where we constructed the path - {`/meals/${slug}`}, it is this dynamic slug which will be different
// for every meal, that will be used as a concrete value for this placeholder. Dynamic link that will lead us to different mealDetailpages.
// The image component - Image src={image} alt={title} fill />, because the images we are outputting here, will now not be imported manually
// from the assets folder. Instead we will be working with meals, that are stored in the database & their images
// are stored in the public folder. These are the same images that are in the assets folder.
// Users will be able to upload their own images & share their own meals. The image component needs to know the underlying width & height of the image
// that is being output. The width & height of the image you are trying to render. It is able to detect this 
// automatically on how you are using the image component as we did in the header, on the image, that we imported from the 
// local filesystem, as we do with the logo.
// NextJS is able to look up the width & height. For the meal items, we load them dynamically from a database. In the DB, we will have a path to 
// some image, & NextJS will not be able to resolve the width & height of such an image, of such a dynamically loaded & resolved image. The information
// is not available at build time, as it is the case for all imported images, but only at runtime. This is why we added this special fill prop
// - <Image src={image} alt={title} fill />. You can use the fill prop instead of setting a width & height whenever you have an image where you do not know the dimensions in advance.
// We are dealing with images shared by the user & we do not know those dimensions.
// Fill is an alternative for this type of scenario. This then tells NextJS that it should fill the available space with that image
// by it's parent components. MealsItem is output in the meals-grid component
export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}