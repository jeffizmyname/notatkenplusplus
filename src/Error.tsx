import { Card, Link } from "@nextui-org/react";


export default function ErrorPage() {
    return (
        <div className="flex items-center p-20 flex-col">
            <Card isBlurred className="p-8 bg-default/80">
                <p className="text-7xl mb-5 font-medium">Error page not Found :(</p>
                <p className="w-full text-center">Go back to <Link href="/">Home</Link></p>
            </Card>
        </div>
    )
}
