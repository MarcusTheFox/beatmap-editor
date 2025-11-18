import { LayoutWithLights } from "@/src/app/layouts";

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LayoutWithLights>
            <div className="container mx-auto max-w-7xl py-16 px-6 grow">
                <section className="flex flex-col items-center justify-center gap-4">
                    {children}
                </section>
            </div>
        </LayoutWithLights>
    );
}
