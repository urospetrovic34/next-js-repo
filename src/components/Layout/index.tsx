import { ReactNode } from "react";

import Header from "src/components/Navigation/Header";
import Footer from "src/components/Navigation/Footer";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex flex-1 flex-col px-1 py-4">
                <div className="container mx-auto">{children}</div>
            </div>
            <Footer />
        </div>
    );
}
