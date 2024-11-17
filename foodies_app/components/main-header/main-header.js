// 'use client'

import Link from 'next/link';
import Image from 'next/image';
import MainHeaderBackground from './main-header-background';
// import  { usePathname } from 'next/navigation'
// import MainHeaderBackground from' @/components/main-header/main-header-background';
// We use the alias (@) to refer to the root directory of the project, this is at symbol
import logoImg from '@/assets/logo.png';
// This is a relative path to this file. The 'main-header.module.css' will be available as a property
// on this imported object
import classes from './main-header.module.css'
// import classes from './nav-link.module.css'
import NavLink from './nav-link';

// We made sure that this main header component is not converted to a client component and is therefore still rendered on the server. Instead only this small part
// of it is rendered on the client. 
export default function MainHeader() {
    // We use the link component provided by NextJS so that we can wrap that around the logo
    // to make it clickable. The logo should actually be the combination of an image and some text.
    // We set the source to a certain image
    // What is important in Next projects, unlike in many other react projects, you cannot just assign it like this - <img src={logoImg.src}
    // You have to access the SRC property, because this imported logo in Next projects will be an object where the path to the image 
    // is then stored under that SRC property.
    // The styles are scoped to this component & cannot effect any other component on the page
    // Should the links be marked as active or not? We take a look at the current path name. The part after the domain.
    // Eg, for this community link, the path is /community. If the path is equal to this path - <Link href="/community">Foodies Community</Link>,
    // this link here should be marked as active. For the mealpage & meals related pages, we know that this link here should be marked as
    // active if we are on /meals or /mealsshare or some other nested page.
    // If the currently active path starts with /meals. We just need to get hold of the currently active path.
    // NextJS gives you a usePathname hook, which you can import from the next navigation.
    // usePathname hook gives you the currently active path, so the path after the domain. With that path available, we can then set this meals link 
    // here to active, if the path which we get from usePathname, if that path starts with /meals, so that this link here is marked as active,
    // no matter if we are on the meals page or some nested page. If that yields true, you add the active CSS class or add undefined as a class or no class at all.
    // We have an error in the browser, because usePathname() also only works in client components. That is a convenient feature of NextJS, it will tell you if you are using
    // a feature that does not work in the server components, in a server component, so that you can then add that use client directive. The fix is to add use client at the top of the header.
    // The error goes away & you see that the active link is highlighted. You want to add use client as far down the component tree as possible, so that you really only turn the components
    // that need to be converted to client components into client components, so that the majority of your components can stay server components & are rendered on the server, so that you do not lose those 
    // server component advantages for most of your components.
    // const path = usePathname()
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={logoImg} alt="A plate with food on it" />
                    NextLevel Food
                </Link>
                <nav className={classes.nav}>
                <ul>
                    <li>
                         <NavLink href="/meals">Browse Meals</NavLink> 
                    </li>
                    <li>
                    <NavLink href="/community">Foodies Community</NavLink> 
                    </li>
                </ul> 
                </nav>
            </header>
        </>
    )
}