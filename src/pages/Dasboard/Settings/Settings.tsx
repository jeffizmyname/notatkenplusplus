import Newsletter from "./Newsletter";
import EditAccount from "./EditAccount";
import DeleteAccount from "./DeleteAccount";
import Banner from "./Banner";
import EditProfilePic from "./EditProfilePic";

export default function Settings() {


    return (
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-3 m-4">
            {/* <p>zmiana avatara / wysylaj emaile z nowosciami / zmiana hasla / zmiani emaila /  usun konto</p> */}
            <Banner/>
            <EditAccount/>
            <div>
                <Newsletter/>
                <DeleteAccount/>
            </div>
            <EditProfilePic/>
        </div>
    )
}