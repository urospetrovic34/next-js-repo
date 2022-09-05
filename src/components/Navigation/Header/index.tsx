import { useState } from "react";

export default function Header() {
    const [dropbar, setDropbar] = useState(false);

    const showSidebar = () => setDropbar((dropbar) => !dropbar);

    return (
        <nav className="bg-black px-1 text-white">
            <div className="container mx-auto flex flex-wrap items-center justify-between py-3 md:py-5">
                <a href="#" className="cursor-pointer text-3xl">
                    Placeholder
                </a>
                <button onClick={showSidebar} className="md:hidden">
                    <span>{!dropbar ? "Open" : "Close"}</span>
                </button>
                <div
                    className={`${
                        !dropbar && "hidden"
                    } w-full transition md:block md:w-auto`}
                >
                    <ul className="mt-3 flex flex-col gap-2 md:mt-0 md:flex-row md:gap-8">
                        <li>
                            <a href="#" className="cursor-pointer text-lg">
                                Link 1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="cursor-pointer text-lg">
                                Link 2
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
