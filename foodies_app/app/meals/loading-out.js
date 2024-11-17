import classes from './loading.module.css'
// loading applies to all sibling & nested pages & layouts
// loading is a reserved file name. This file will become active if the page next to it
// or any nested page or layout is loading data. In that case, the loading,js content is shown
// as a fallback until the data is there.
export default function MealsLoadingPage() {
    return <p className={classes.loading}>Fetching meals...</p>
}