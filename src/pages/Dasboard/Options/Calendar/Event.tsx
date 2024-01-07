
interface Props {
    times: number
    title: string | undefined,
    desc: string | undefined
    start: string | undefined
}

export default function Event(props: Props) {
    const size = (times: number): string => {
        return (92 + (100 * --times) + (times * 2)) + "%";
    };

    let converted_value = "2.5rem";

    if(props.start != undefined){
        const minutes =  Number(props.start.split(':').pop());
        if(minutes !== 0) {
            converted_value = (minutes / 59) * 16 + "%"
        } else {
            converted_value = "0.25rem";
        }
    }

    return (
        <div style={{ height: size(props.times), marginTop: converted_value }} className={`flex text-sm flex-col w-full bg-indigo-700 rounded-lg m-1 p-2 overflow-visible`}>
            <p className="text-indigo-200">{props.start}</p>
            <p className="text-indigo-400 font-bold">{props.title}</p>
            <p className="text-indigo-200">{props.desc}</p>
        </div>
    );
}