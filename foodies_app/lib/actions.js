// What is important is that it has that 'use Server' directive at the top
// When adding it at the top of a file like this, all the functions you might define in that file will be treated
// as Server Actions.
// 
'use server';
import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

// A helper function, where you get some text & where you return the result of this check, so that you return true
// if the text we have is either false, or it is an empty string after trimming it. We use isInvalidText in the if statement
function isInvalidText(text) {
  return !text || text.trim() === '';
}


   // We can add the onSubmit prop & define a function that should be executed when the form is submitted
    // We can then prevent the browser default, & manually collect all the data, and send that data to the backend.
    // We have a fullstack application that has both frontend & backend. Next.js gives us a more powerful & convenient
    // pattern than manually handling the form submission & collecting the data & sending it to the server.
    // We can create a function in the component that holds the form, for example, which we could call shareMeal here.
    // It should no longer just accept that form data. Instead, formData should actually accept two parameters, because useFormState will pass two parameters to 
    // shareMeal when executes it, the form gets submitted. The second parameter will still be that submitted data, but the first parameter will be the previous state
    // So either the initial state that was setup in the shareMealpage component, useFormState that was setup or any other previous responses that might have been 
    // generated, because form data is now the second argument we get, not the first. 
    export async function shareMeal(prevState, formData) {
        // We can then add a special directive in this function & that is the 'use server' directive.
        // 'use client' is added to the top of the file, we make sure that the components created in that file would be client components.
        // 'use server' inside of a function is different, because this creates a so-called Server Action, which is a function that is guaranteed
        // to execute on the server, & only there.
        // So just as components by default are server components which only execute on the server, this is now a function that only executes on the server.
        // But in case functions, you must explicitly state that it belongs to the server by adding this directive inside of them, if you want to create a Server Action.
        // In addition, into a so-called Server Action, you also must add the "async" keyword in front of it.
        // This is now a Server Action
        // What is now the special thing about the Server Action? Why does this feature exist?
        // This feature exists in react, not just in Next.js, but like server components, it does not really work in Vanilla React apps
        // Instead, you need a framework like Next to unlock this feature & use it.
        // This feature then exists, because you can now take such a Server Action & assign this Server Action function as a value for the action prop on a function.
        // <form className={classes.form} action={shareMeal}> - We are setting shareMeal (async function shareMeal()), as a value on that action prop of that form.
        // Normally, the action prop is set to the path to which the request should be sent, is set to the path to which the request should be sent, if you are relying
        // on the browser built-in form handling capabilities - action="/some-path">
        // Instead, we are setting it to an action, to such a Server Action function. This is a pattern that is supported by Next & React that will ensure that when this form is submitted,
        // Next.js will, behind the scenes, create a request & send it to this Next.js server that is serving the website, so that the function shareMeal() gets triggered, & you can handle the form submission
        // but on the server.
        // That function will then execute on the server, not in the client. This function will automatically receive that formData that was submitted. The data that was gathered by the inputs in the form
        // collected in a formData object, using that formData class that is available is JS. We will get such a formData object & we can then use that to handle the submitted data.
        // Eg, we could create a meal by extracting meal data from that formData
        const meal = {
          // This formData object that we are getting will have a get method that allows us to get the value that was entered into a certain input field, & the input field is identified by it's name.
          // If I get the value of the input field with the name 'title', I am getting the value of this input field - <input type="text" id="title" name="title" required />
          // Because this input field has that name, 'title'. So, all that data we are expecting in our database, in the initdb.js, like the image, the summary, the instructions
          // We can also store the summary by getting hold of formData.get 'summary', extracting the data from the input field with the name summary
          // We have to make sure that we pass the appropriate name to our ImagePicker component
          // The next step would be to store that in a database, though the image should actually be stored on the file system & then a path to the image
          // should be stored in a database. The storage of this data is now the next step.
          // What is important to understand is that you can use this Server actions feature to create such a function, that will be triggered when a form is submitted.
          // In order to see this action, we will not store that data yet 
          title: formData.get('title'),
          summary: formData.get('summary'),
          instructions: formData.get('instructions'),
          // We make sure that we can extract that image with the help of the formData.get.
          // That will then be an uploaded file & we will handle the storage of that file.
          image: formData.get('image'),
          creator: formData.get('name'),
          creator_email: formData.get('email')
        };

        // trim removes excess whitespace on the left & right & we can check if that is equal to an empty string,
        // it would mean that it is an invalid value.
        // We could also check if meal.title maybe even does not exist, so if it is false, so if it is not part of
        // the submitted data at all.
        // We check if meal.title is an invalid text & meal.summery is an invalid text etc
        // Check if meal.creator_email exists, but is an invalid email addesss, does not include an @ symbol
        // We check the image, if maybe we do not have an image, so if undefined or if that image has a size that is equal to zero, it is an invalid file
        if(isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || isInvalidText(meal.creator)
          || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || !meal.image.size === 0) {
            // We throw an error where we say invalid input
            // We could return an object which maybe has a message field which holds a value
            // It is just important that it is a serializable object, eg should not include any methods,
            // because those would get lost whilst being sent to the client. But any simple values like strings, nunmbers, nested objects or nested arrays, 
            // those values all work
            // How can we use that response in that share page where we trigger that Sever Action?
            // We can use it with the help of another hook, another hook provided by react dom, the useFormState hook
            return {
              message: 'Invalid input' 
            }
        }

        // You will see some output on the server side in your terminal, in that termianl where you started the development server.
        // There you will see that meal data that was entered & the file.
        // This is how you can handle form submissions with the help of server actions.
        // saveMeal will return a promise & we also add async 
        // With that though, we are making sure to call saveMeal here in the server action, therefore, now we should pass the meal to saveMeal
        //  
        await saveMeal(meal);
        // console.log(meal)
        // This function tells NextJS to revalidate the cache that belongs to a certain route path. Eg: if you know that you want to visit the meals page
        // & that the meals depends on data that changed, you can tell NextJS to revalidate the /meals path. That path would be revalidated.
        // What is important is that, be default, only that path will be revalidated, no nested paths.
        // If we had some nested path there in the meals folder, that also depends on all the meals data, you would need to revalidate that separately.
        // Alternatively, you can pass a second argument to revalidate the path & set this to layout. The default is page, which means that simply this one page
        // for this one path will be revalidated. If you set it to layout, - revalidatePath('/meals', 'layout'), it is the layout that will be revalidated, 
        // which also wraps nested pages, & therefore with this, all nested pages would be revalidated as well.
        // 'revalidated' simply means that NextJS throws away the cache that is associated with those pages. Eg, the cached pages themselves.
        // The dynamic page ([mealSlug]) is not pre-generated anyway in the current setup & the share page does not depend on the mealsData. So we are fine just revalidating
        // '/meals'. If you would want to revalidate all the pages of your entire website, you could, do that by targeting slash & then setting the mode to layout, eg: - revalidatePath('/', 'layout')
        // We rebuild the pages again, they will still be pre-generated again & cached, but now that cache should be revalidated & partially cleared once we added a new meal.
        // npm start to start the development server, & you add another new meal to the form, if you submit that, it takes a bit longer, because it is taking a bit longer, as it loaded all those meals again.
        // We now have an image missing, but the meal is there & that is a good sign. In terminal, we have those Fetching meals logs back, which also now proves that this is working as intended.
        revalidatePath('/meals');
        // redirect will redirect the user to a different page. For that, you have to pass a path to redirect, & that of course should be the path
        // of the page you want to redirect the user to. eg - to /meals
        redirect('/meals');
      }

