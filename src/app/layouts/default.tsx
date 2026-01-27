import { Footer } from "@/src/widgets/layouts";
import { Navbar } from "@/src/widgets/page-navbar";

export const DefaultLayout = ({
    children
} : {
    children : React.ReactNode
}) => {
    return (
        <div className="flex flex-col h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
}