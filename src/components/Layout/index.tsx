import { ReactNode } from "react";

import Header from "src/components/Navigation/Header";
import Footer from "src/components/Navigation/Footer";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex w-full flex-1 flex-col">{children}</div>
            <Footer />
        </div>
    );
}
