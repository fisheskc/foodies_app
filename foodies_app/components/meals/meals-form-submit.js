'use client'

import { useFormStatus } from 'react-dom'

export default function MealsFormSubmit() {
    // The status is an object with various properties, & therefore, we can actually use object destructuring here
    // to pull out that one property, the pending property
    // We check if pending is truthy, in which case you want to output the text submitting
    // We want to disable the button if we are submitting. We set the disabled prop to pending, so that we do disable the
    // button if the surrounding form is being submitted & enable it, if that is not the case
    const { pending } = useFormStatus()

    return <button disbled={pending}>
        {pending ? 'Submitting...' : 'Share Meal'}
    </button>
}