'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import classes from './image-picker.module.css'

export default function ImagePicker({label, name}) {
    // You can then connect to an HTML element. We can use that ref & set it as a value for the ref prop
    // We need to useState hook to turn this component into a client component, this is done with the 'use client'
    // We have a set setPickedImage state updating function
    const [pickedImage, setPickedImage] = useState()
    const imageInput = useRef()
    // A label with a configurable text, which is expected to be received via props
    // & then use that here for outputting that label text.
    // We add the htmlFor prop, to connect the label to some input with a name of image or with an ID of image
    // We add the accept prop to control which files are accepted, so no other files can be uploaded
    // With help of that picker, we can assign this function as a value 
    // We can make this image picker more configurable by accepting that name as a prop 
    //   classes.input - will make sure that the input itself is hidden.
    // You render your own button for the onclick prop
    // Should be of type button, which is important, so that it will not
    // submit the surrounding form.
     // If you would not set the type submit & it would submit the surrounding form
     // Which you do not want to happen here, & you want the button to do is click this input.
     // "We leverage this page, but don't show it because it is not nice"
     // We need to add clicks on this button & then forward them, so to say, to this input
     // We can handle clicks to this button by adding a function here to our image picker, like handlePickClick
    function handlePickClick() {
        // imageInput now allows us to use this ref to trigger the click method, because that then gives us access
        // to the actual connected element & object. We trigger the input on the imageInput which is connected to this ref
        imageInput.current.click()
    }
    // This is triggered whenever this input has a new value, image input or whenever the change event on that input is emitted.
    // We set handle image change as a value
    // In handleImageChange we automatically get an event object, for those event handling functions in React
    // We can use this event object to get hold of that picked image. We access the first file here
    // This file property will exist, because the target of this event is this input, & this file input object, under the hood
    // will have such a files property - <input className={classes.input} type="file"
    // That will be an array of all the files that have been picked, but it will be one file that can be picked. 
    // You could allow the user to pick multiple files by adding the multiple prop here to this file input.
    function handleImageChange(event) {
        // We just access the first file.
        const file = event.target.files[0];
        // It is possible the user actually did not pick a file for some reason, so we check if the file is undefined & if we have no file
        // In this scenario, you should also "setPickedImage(null)", to make sure that the preview is reset
        if(!file) {
            setPickedImage(null);
            return
        }
        // If we make it past this if check, we want to know some file has been selected.
        // In order to show it as a preview, you now want to convert it into a so-called data URL, which is simply a value that can be used
        // as an input for an image element, so that can be used as a source for an image element. We can generate such a data URL with the help of a
        // class built into JS, the FileReader(). We can read our file, and we can simply call file reader read as data URL. We pass that file to that method.
        // This method does not actually return anything, does not read the file & it does not take a callback.
        // Instead, we get hold of that data URL that is being generated by assigning a value to the onload property
        // We store a function as a value in onload, & this function will then be triggered by the file reader, this data URL method
        // We then will not get the generated URL as an input. Instead we can access it by accessing fileReader.result & that will then be that generated URL
        // This is what we want to store in the state. We set the picked image to the result of accessing fileReader.result. We can then use this pickedImage
        // state to show a preview. In the div with the classname of preview, you want to check, if we don't have a picked image &
        // we output a paragraph where we say "no image yet". We add that fill prop, because we do not know the dimensions of that image in advance
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }
    
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>
                {label}
            </label>
            <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt ="the image selected by the user" fill />}
            </div>
            <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>
                    Pick an image
                </button>
            </div>
        </div>
   ) 
}