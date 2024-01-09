import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export default function parteon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" {...props} width="256" height="247" viewBox="0 0 256 247"><path fill="#FFFFFF" d="M45.136 0v246.35H0V0zm118.521 0C214.657 0 256 41.343 256 92.343s-41.343 92.343-92.343 92.343s-92.343-41.344-92.343-92.343c0-51 41.344-92.343 92.343-92.343"/></svg>
    )
}