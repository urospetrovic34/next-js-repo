import Link from "next/link";

import decades from "src/json/decades";
import DecadeCard from "src/components/Card/DecadeCard";

export default function Seasons() {
    console.log(decades);
    return (
        <div className="grid gap-2 bg-contain bg-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {decades.map((val: any, id: number) => (
                <Link href={`/seasons/${val.decadeId}`} key={id} passHref>
                    <a>
                        <DecadeCard
                            name={val.decadeId}
                            background={val.backgroundImage}
                        />
                    </a>
                </Link>
            ))}
        </div>
    );
}
