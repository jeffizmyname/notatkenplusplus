import { Outlet } from "react-router-dom";
import {useLayoutEffect, useRef, useState} from 'react';

export default function Content() {

    const ref = useRef<any>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        if(ref.current !== null) {
            setWidth(ref.current.offsetWidth);
            setHeight(ref.current.offsetHeight);
        }
    }, []);

    sessionStorage.setItem("paintWH", `{"width": ${width}, "height": ${height}}`)

    //console.log(width + " " + height)

    return(
        <div className="w-full lg:w-[85%] bg-background/50 h-full" ref={ref}>
            <Outlet />
        </div>
    )
}

{/* <p>Today</p>
<div>
    <Card>
        <p>EEEEEE</p>
    </Card>
    <Card>
    <p>EEEEEE</p>
    </Card>
    <Card>
    <p>EEEEEE</p>
    </Card>
</div>
<p>Yesterday</p>
<div>
    <Card>
    <p>EEEEEE</p>
    </Card>
    <Card>
    <p>EEEEEE</p>
    </Card>
    <Card>
    <p>EEEEEE</p>
    </Card>
</div> */}