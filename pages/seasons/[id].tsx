import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import SeasonsAPI from "src/services/seasons";
import getPaths from "src/util/ssg/getPaths";

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
        paths: getPaths(9),
        fallback: false,
    };
}

export async function getStaticProps(ctx: { params: { id: string } }) {
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
