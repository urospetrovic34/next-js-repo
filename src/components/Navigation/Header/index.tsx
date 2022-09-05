import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [dropbar, setDropbar] = useState(false);
    const list = ["Drivers", "Constructors", "Circuits"];

    const showSidebar = () => setDropbar((dropbar) => !dropbar);

    return (
        <nav className="bg-black px-1 text-white">
            <div className="container mx-auto flex flex-wrap items-center justify-between py-3 md:py-5">
                <Link href="/">
                    <a className="cursor-pointer text-3xl">Grand Prix Racing</a>
                </Link>
                <button onClick={showSidebar} className="md:hidden">
                    <span>{!dropbar ? "Open" : "Close"}</span>
                </button>
                <div
                    className={`${
                        !dropbar && "hidden"
                    } w-full transition md:block md:w-auto`}
                >
                    <ul className="mt-3 flex flex-col gap-2 md:mt-0 md:flex-row md:gap-8">
                        {list.map((val, id) => (
                            <Link href={`/${val.toLowerCase()}`} key={id}>
                                <li>
                                    <a className="cursor-pointer text-lg">
                                        {val}
                                    </a>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
