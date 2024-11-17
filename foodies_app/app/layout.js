import MainHeader from '@/components/main-header/main-header';
import './globals.css';

// The metadata constant allows you to add a bunch of metadata, which when for example,
// exposed to search engine crawlers or which shows up when you are sharing a link to a page on X or Facebook.
// If you want to add a title & description to every page. If you add this metadata to layout, it will
// automatically be added to all pages that are wrapped by that layout unless a page specifies it's own metadata.
// In that case, the page metadata wins. Any nested layout metadata would also win over that root layout metadata.
// By setting this metadata here, every page will at least have this basic metadata.
// We can set a more specific metadata for sum of the pages. Eg, for the all mealspage
// How can you add metadata to dynamic pages where the title & the description depends on the concrete data that
// has been loaded? 


export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <MainHeader />
        {children}
      </body>
    </html>
  );
}