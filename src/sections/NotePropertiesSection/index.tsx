import { ReactNode } from "react";
import { CardTitle } from "@/components/CardTitle";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function NotePropertiesSection({ children } : { children: ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Note Properties</CardTitle>
            </CardHeader>
            <CardBody className="pt-0">
                {children}
            </CardBody>
        </Card>
    )
}