'use client';

import Link from 'next/link';
import  { usePathname } from 'next/navigation'
import classes from './nav-link.module.css'
// We want to make the NavLink configurable. We get the href prop & the children prop for the actual text that is output
// between the link and pass this into the NavLink
// You get an error, unhandled runtime error, referenceError: classes not defined, because in navlink, we are referring to the active class,
// even though this classes object is not available here. To work around the error, we add an import of classes from the nav-link.module.css
export default function NavLink({ href, children}) {
    // We use this href prop when you check whether this is an active link. In order for the path to be available here,
    // we now must usePathname hook, so that we can get hold of the path. We convert this into a client component by adding use client to the top of the file.
    // It is only this the link below that will be rendered on the client side.
    // We add the link class to these links, so that we either have a link & the active class add or just a link.
    // To make this work - ? classes.active : undefined }>, we convert what we have below, to a template literal string - `${classes.active}`
    // into which we can easily inject dynamic values, that will be converted to strings. We have the classes.link & classes.active being set on the link. Otherwise, if the link is not active, we just add classes.link.
    // Otherwise, if the link is not active, we just add classes.link, eg. 
    const path = usePathname()
    return (
       <Link 
        href={href} 
            className={path.startsWith(href) 
            ? `${classes.link} ${classes.active}`
            : classes.link
        }>
        {children}
        </Link> 
    )
}