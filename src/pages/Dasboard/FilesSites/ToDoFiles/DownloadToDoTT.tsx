import { Tooltip } from "@nextui-org/react";
import { CgSoftwareDownload } from "react-icons/cg";
import { HandleDownload } from "../../../../utils/saveLoad";
interface Props {
    id: number
}

export default function DownloadToDoTT(props: Props) {

    const handleDownload = () => {
        HandleDownload(props.id)
    }

    return (
        <Tooltip content="Pobierz">
            <span onClick={handleDownload} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CgSoftwareDownload />
            </span>
        </Tooltip>
    )
}