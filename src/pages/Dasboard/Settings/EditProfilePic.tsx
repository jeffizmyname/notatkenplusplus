import { Button, Card } from "@nextui-org/react";
import axios from 'axios';
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { getId } from "../../../utils/userData";

export default function EditProfilePic() {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        try {
            const id = getId()
            const formData = new FormData();
            formData.append('file', file as Blob);
            formData.append('userId', String(id));

            await axios.post('http://192.168.100.245:3001/settings/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            window.location.reload();
            console.log('Profile picture updated successfully');
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    };

    return (
        <Card className="flex items-center justify-center p-2 md:h-[100%] lg:h-[60%]">
            <div>
                <div {...getRootProps()} style={{ cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    {file ? (
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Profile"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="bg-zinc-600 rounded-lg px-[20%] py-[10%] m-2">Przeciągnij tutaj swoje nowe profilowe lub kliknij aby wybrac plik</div>
                    )}
                </div>
                {file && (
                    <Button onClick={handleUpload} style={{ marginTop: '10px' }} size="lg" color="primary">
                        Upload
                    </Button>
                )}
            </div>
        </Card>
    )
}