// 'use client'- If you had useClient at the top, because somewhere else in the component you might be using some client-only feature,
// you would get an error that you are not allowed to have server actions in a client component file. You were defining client & server-side code in the same file, & the build process that is used.
// That is why for technical reasons, you cannot mix both in the same file, but can absolutely import a sever action from another file & then use it in such a client component
// by NextJS is essenetially not able to separate that in a clean way, & therefore a server-side code could accidentically end up on the client side, which could pose security issues
// You might not want to have your server-side form submission logic in the same file as your JSX code & you might like to separate it.import { useFormState } from 'react-dom'
'use client'
import { useFormState } from 'react-dom';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

// This will tell us the request is on it's way by conditionally updating the button. Show the text submitting when the request is on it's way.
// We can achieve this by using another special hook called useFormStatus
export default function ShareMealPage() {
    // The image picker can be used by the user to attach an image to the form & to upload an image
    // when the form is submitted.
    // This then gives you the status object, which, for example, has pending property, which is true if there is an ongoing request & false otherwise.
    // However, if you add that hook, you will see that you will get an error because this hook requires a client component in order to work.
    // We are updating the client side UI based on any ongoing requests. We add use client to the top of the file. We might not want to turn this entire page
    // into a client component just because we want to conditionally update the submit button.
    // useFormStatus hook - will actually only give us the status of the form, if it is inside of that form for which it should give us the status. 
    // To get the status of that form, we mean inside of some component, that is inside of that form.
    // It would not work here anyway useFormStatus()
    // This hook works a bit like the useState hook that is built into React, because this hook is responsible for managing the state of this page or component, which uses a form 
    // that will be submitted with help of the Server Actions. This is the use case where useFormState can help you, because useFormState needs two arguments.
    // The first argument is the actual Server Action that should be triggered when the form is submitted, in this case shareMeal. 
    // The second argument you pass to useFormState is the initial state of the component, & that means the initial value that should be returned by useFormState before this action
    // has been triggered & yielded a response. So the initial value that should be used if we have not received a response from this action yet, & that could be anything you want,
    // eg: null or an object where you have a message field that holds a value of null. To reassemble the shape of that response, will eventually send back.
    // We send back an object where the message holds a string. Our initial could be the, but null as the value for the message. 
    // The useFormState will give you an array with two elements, because the default useState hook provided by react also gives you two elements.
    // The two elements we get here, we get from useState, because we get the current state, the current response of this page, the component.
    // So the latest response returned by the Server Action in the end or this initial state. If no response has yet been received yet.
    // We get another formAction which we set as a value for this action prop on the form, shareMeal. So instead of setting shareMeal as a value for Action,
    // we are now setting this formAction which we are getting back from useFormState as a value. This must be done so that useFormState can basically step in 
    // & manage that state for this component. That state depends on the execution of that Server Action & it's response. This is why useFormState needs to act, 
    // as a man in the middle etc. We can use the state which will essentially be either the message or any response we get back from shareMeal to output data in
    // this component. In this case, we know that state will therefore either be an object with the message that is a string or it will be an object with a message 
    // that is null. We can use this at the end of this form, right before the submit button, to output an error message.
    // For that, we can check if state.message is truthy (we have a message). In that case we output it there between the paragraph tags
    // We will tweak the shareMeal action, because when passing it as a value to useFormState, it must have a different shape than it did before.
    // We now get an error if we try to load the page, because useFormState, since in the end deals with 
    // updating the client, needs to be executed in a client component & therefore we should add use client in this component file, at the top
    const [state, formAction] = useFormState(shareMeal, { message: null });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
