import NavBar from "./NavBar"
import Footer from "./Footer"
import Banner from "./Banner"
import Code from "./Code"

export default function Home() {
    return (
        <div className="h-fit">
            <NavBar/>
            <Banner/>
            <Code/>
            {/* <Footer/> */}
        </div>
    )
}
