import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Image from "next/image";

import ConstructorsLocalAPI from "src/services/local/constructors";
import loader from "src/util/image/loader";

export default function Constructor() {
    const { query } = useRouter();
    const { data } = useQuery(["driver", query.id], () =>
        ConstructorsLocalAPI.getConstructorById({ constructorId: query.id })
    );

    return (
        <div className="h-auto w-full max-w-[80px]">
            <Image
                loader={() => loader(data?.imageUrl)}
                src={data?.imageUrl}
                alt="Team Logo"
                width="100%"
                height="100%"
                layout="responsive"
                objectFit="contain"
            />
        </div>
    );
}
