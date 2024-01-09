import NavBar from "./NavBar"
import Footer from "./Footer"
import Banner from "./Banner"
import Offer from "./Offer"
import Comunity from "./Comunity"
import Help from "./Help"

export default function Home() {
    return (
        <div className="h-screen overflow-scroll">
            <NavBar/>
            <Banner/>
            <Offer/>
            <Comunity/>
            <Help/>
            <Footer/>
        </div>
    )
}
