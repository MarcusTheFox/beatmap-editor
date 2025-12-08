"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

export const ComboTable = () => (
    <Table aria-label="Таблица множителей комбо" isStriped>
        <TableHeader>
            <TableColumn>СЕРИЯ ПОПАДАНИЙ</TableColumn>
            <TableColumn>МНОЖИТЕЛЬ</TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow key="1">
                <TableCell>1 - 5</TableCell>
                <TableCell className="font-mono text-default-500">x1</TableCell>
            </TableRow>
            <TableRow key="2">
                <TableCell>6 - 10</TableCell>
                <TableCell className="font-mono text-primary font-bold">x2</TableCell>
            </TableRow>
            <TableRow key="3">
                <TableCell>11 - 15</TableCell>
                <TableCell className="font-mono text-success font-bold">x3</TableCell>
            </TableRow>
            <TableRow key="4">
                <TableCell>16+</TableCell>
                <TableCell className="font-mono text-warning font-bold">x4 (MAX)</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export const RankTable = () => (
    <Table aria-label="Таблица рангов" isStriped>
        <TableHeader>
            <TableColumn>РАНГ</TableColumn>
            <TableColumn>ТОЧНОСТЬ</TableColumn>
            <TableColumn>ОЦЕНКА</TableColumn>
        </TableHeader>
        <TableBody>
            <TableRow key="SS">
                <TableCell className="text-xl font-black text-yellow-400">SS</TableCell>
                <TableCell>100%</TableCell>
                <TableCell className="text-yellow-400 font-semibold">Идеально</TableCell>
            </TableRow>
            <TableRow key="S">
                <TableCell className="text-xl font-bold text-purple-500">S</TableCell>
                <TableCell>95% - 99.9%</TableCell>
                <TableCell className="text-purple-500">Потрясающе</TableCell>
            </TableRow>
            <TableRow key="A">
                <TableCell className="text-xl font-bold text-blue-500">A</TableCell>
                <TableCell>90% - 94.9%</TableCell>
                <TableCell className="text-blue-500">Отлично</TableCell>
            </TableRow>
            <TableRow key="B">
                <TableCell className="text-xl font-bold text-green-500">B</TableCell>
                <TableCell>80% - 89.9%</TableCell>
                <TableCell className="text-green-500">Хорошо</TableCell>
            </TableRow>
            <TableRow key="C">
                <TableCell className="text-xl font-bold text-yellow-500">C</TableCell>
                <TableCell>70% - 79.9%</TableCell>
                <TableCell className="text-yellow-500">Нормально</TableCell>
            </TableRow>
            <TableRow key="D">
                <TableCell className="text-xl font-bold text-orange-500">D</TableCell>
                <TableCell>50% - 69.9%</TableCell>
                <TableCell className="text-orange-500">Плохо</TableCell>
            </TableRow>
            <TableRow key="E">
                <TableCell className="text-xl font-bold text-red-600">E</TableCell>
                <TableCell>&lt; 50%</TableCell>
                <TableCell className="text-red-600">Ужасно</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);