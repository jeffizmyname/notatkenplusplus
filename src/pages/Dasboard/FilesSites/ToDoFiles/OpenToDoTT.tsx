import { Tooltip } from "@nextui-org/react";
import { EyeIcon } from "../../../../assets/icons/EyeIcon";
import { useNavigate } from "react-router-dom";

interface Props {
    id: number
}

export default function OpenToDoTT(props: Props) {
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate(`/dashboard/todo/${props.id}`)
    }
    return (
        <Tooltip content="Otwórz">
            <span onClick={handleOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
            </span>
        </Tooltip>
    )
}