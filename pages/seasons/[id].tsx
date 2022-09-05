import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import SeasonsAPI from "src/services/seasons";

export default function Seasons() {
    const { query } = useRouter();
    const { data } = useQuery(["seasons", query.id], () =>
        SeasonsAPI.getSeasonsByDecade({ offset: query.id })
    );
    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl font-bold italic">
                {data.MRData.SeasonTable.Seasons[0].season + "s"}
            </div>
            <div>
                <Link href={`/seasons/${Number(query.id) + 1}`}>
                    <a>
                        <button>NEXT</button>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: "1" } },
            { params: { id: "2" } },
            { params: { id: "3" } },
            { params: { id: "4" } },
            { params: { id: "5" } },
            { params: { id: "6" } },
            { params: { id: "7" } },
            { params: { id: "8" } },
        ],
        fallback: false,
    };
}

export async function getStaticProps(ctx: { params: { id: "string" } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["seasons", ctx.params.id], () =>
        SeasonsAPI.getSeasonsByDecade({ offset: ctx.params.id })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
