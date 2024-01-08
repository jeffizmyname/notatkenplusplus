import axios from 'axios';

export async function getPfp(userId: number | null, setimage: React.Dispatch<React.SetStateAction<string | undefined>>) {
    try {
        const response = await axios.get(`http://192.168.100.245:3001/settings/pfp/${userId}`, {
            responseType: 'arraybuffer',
        });

        const arrayBufferView = new Uint8Array(response.data);
        const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);

        setimage(imageUrl);
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        setimage(undefined);
    }
}

// const ProfilePictureDisplay: React.FC<{ userId: number }> = ({ userId }) => {
//     const [profilePicture, setProfilePicture] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchProfilePicture = async () => {
//             try {
//                 const response = await axios.get(`http://192.168.100.245:3001/settings/pfp/${userId}`, {
//                     responseType: 'arraybuffer',
//                 });

//                 const arrayBufferView = new Uint8Array(response.data);
//                 const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
//                 const imageUrl = URL.createObjectURL(blob);

//                 setProfilePicture(imageUrl);
//             } catch (error) {
//                 console.error('Error fetching profile picture:', error);
//             }
//         };

//         fetchProfilePicture();
//     }, [userId]);

//     return (
//         <div>
//             {profilePicture ? (
//                 <img
//                     src={profilePicture}
//                     alt="Profile"
//                     style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//                 />
//             ) : (
//                 <div>No profile picture available</div>
//             )}
//         </div>
//     );
// };



// export default ProfilePictureDisplay;