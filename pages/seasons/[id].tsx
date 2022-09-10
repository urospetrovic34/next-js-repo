import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import SeasonsLocalAPI from "src/services/local/seasons";
import getDecadePaths from "src/util/ssg/getDecadePaths";
import DecadeCard from "src/components/Card/DecadeCard";

export default function Seasons() {
    const { query } = useRouter();
    const { data } = useQuery([["decade", query.id], query.id], () =>
        SeasonsLocalAPI.getSeasonByDecade({ decadeId: query.id })
    );
    return (
        <div className="grid gap-2 bg-contain bg-center md:grid-cols-2 lg:grid-cols-5">
            {data?.seasons.map((val: any, id: number) => (
                <Link href={`/seasons/${val}`} key={id} passHref>
                    <a>
                        <DecadeCard name={val} background={""} />
                    </a>
                </Link>
            ))}
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: getDecadePaths(),
        fallback: false,
    };
}

export async function getStaticProps(ctx: { params: { id: string } }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        [["decade", ctx.params.id], ctx.params.id],
        () => SeasonsLocalAPI.getSeasonByDecade({ decadeId: ctx.params.id })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
