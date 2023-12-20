import { Card, CardFooter, Image, Modal, ModalContent, ModalHeader, ModalBody,  useDisclosure, ModalFooter, Button } from "@nextui-org/react";

type Props = {
    type: string
}


export default function CardElement(props: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const CardType = props.type
    return (
        <>
            <Card 
            isFooterBlurred
            isPressable 
            onPress={onOpen}
            className="w-[200px] h-[200px]">

                {
                CardType !== "new" ? 
                <>
                <Image
                alt="preview test"
                src="https://picsum.photos/200"
                width={200}>
                </Image>
                
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    Nazwa Czy cosa takiego
                </CardFooter> 
                </>: 
                <Button className="w-[200px] h-[200px]">New</Button>}

            </Card>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">X name</ModalHeader>
                    <ModalBody>
                        <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                        </p>
                        <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" variant="light" onPress={onClose}>
                        Share
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Open
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}