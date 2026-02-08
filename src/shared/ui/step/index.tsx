export const Step = ({ num, title, description }: { num: string, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-[6px] w-10 h-10 flex items-center justify-center bg-warning text-night font-bold rounded-lg">
            {num}
        </div>
        <div>
            <h3 className="font-bold text-md sm:text-lg">{title}</h3>
            <p className="text-night-800 max-sm:text-sm text-md">{description}</p>
        </div>
    </div>
);