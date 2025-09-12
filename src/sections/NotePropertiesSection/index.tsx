import { ReactNode } from "react";
import { CardTitle } from "@/components/CardTitle";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";

export function NotePropertiesSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Note Properties</CardTitle>
            </CardHeader>
            <CardBody className="pt-0 grid grid-cols-2 gap-4">
                <Input type="number" readOnly value={"1"} label="Spawner ID" labelPlacement="outside-top"/>
                <Input type="number" readOnly value={"1"} label="Beat" labelPlacement="outside-top"/>
                <Input type="number" defaultValue={"1500"} min={0} label="Power" labelPlacement="outside-top"/>
            </CardBody>
        </Card>
    )
}