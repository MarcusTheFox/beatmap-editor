const TOTAL_SPAWNERS: number = 49;

interface SpawnerGridProps {
    renderItem: (key: number, id: number) => React.ReactNode;
}

export function ItemsGrid({ renderItem }: SpawnerGridProps) {
    return (
        <div className="grid grid-cols-7 grid-rows-7 gap-1 max-w-fit">
            {Array.from({length: TOTAL_SPAWNERS}).map((_, id) => renderItem(id, id))}
        </div>
    )
}