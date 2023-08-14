import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {

    const { pathname } = useLocation();
    // console.log("pathname", pathname)

    useEffect(() => {
        window.scrollTo(0,0);
        // run this whenever the url pathname changes
    }, [pathname])

    return null
}

export default ScrollToTop