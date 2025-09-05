import { Card, CardBody, CardFooter } from "@heroui/card";
import { ReactNode } from "react";

export function SpawnerGridSection({ children } : { children: ReactNode }) {
    return (
        <Card className="col-span-2 p-3 text-sm max-w-fit max-h-fit mx-auto">
            <CardBody className="overflow-visible">
                {children}
            </CardBody>
            <CardFooter className="p-0 justify-center">
                <p><b>Left-click</b> to add/remove a note. <b>Right-click</b> to set custom power.</p>
            </CardFooter>
        </Card>
    )
}