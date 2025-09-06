const TOTAL_SPAWNERS: number = 49;
const GRID_DIMENSION: number = 7;

interface SpawnerGridProps {
    renderItem: (key: number, id: number) => React.ReactNode;
}

export function ItemsGrid({ renderItem }: SpawnerGridProps) {
    return (
        <div className="grid grid-cols-7 grid-rows-7 gap-1 max-w-fit">
            {Array.from({length: TOTAL_SPAWNERS}).map((_, index) => {
                const col = index % GRID_DIMENSION;
                const row = Math.floor(index / GRID_DIMENSION);
                const id = (GRID_DIMENSION - 1 - row) * GRID_DIMENSION + col;
                return renderItem(index, id);
            })}
        </div>
    )
}