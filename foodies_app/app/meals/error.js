'use client'
// NextJS will pass some props to that component, it will provide an error prop,
// which can contain more details about the error. 
// The actual error message will actually be hidden by NextJS, so that you cannot accidently
// expose any information that should not be exposed to your end users.
// If your error is an object that also contains some error code, you could use that in this
// component to show a more fined tuned error message.
export default function Error() {
    return (
        <main className= "error">
            <h1>An error occurred!</h1>
            <p>Failed to fetch meal data. Please try again later</p>
        </main>
    )
}