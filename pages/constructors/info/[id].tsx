import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
// import Image from "next/image";

import ConstructorsAPI from "src/services/constructors";
import SeasonsAPI from "src/services/seasons";
import ConstructorsLocalAPI from "src/services/local/constructors";

export default function Constructor() {
    const { query } = useRouter();
    const { data: part1 } = useQuery(["constructor-part-1", query.id], () =>
        ConstructorsAPI.getSingleConstructor({ constructorId: query.id })
    );
    const { data: part2 } = useQuery(["constructor-part-2", query.id], () =>
        SeasonsAPI.getSeasonsByTitlesOfTeam({ constructorId: query.id })
    );
    const seasonsArray = part2?.MRData.SeasonTable.Seasons;
    // const { data: local } = useQuery(["constructor-local", query.id], () =>
    //     ConstructorsLocalAPI.getConstructorById({
    //         constructorId: query.id,
    //     })
    // );
    return (
        <>
            <div className="flex items-center gap-[30px]">
                {/* {imageUrl && (
                    <div className="h-auto w-full max-w-[120px]">
                        <Image
                            src={imageUrl}
                            loader={() => `${imageUrl}`}
                            alt="Team Logo"
                            width="100%"
                            height="100%"
                            layout="responsive"
                            objectFit="contain"
                        />
                    </div>
                )} */}
                <div className="flex flex-col">
                    <div className="text-4xl font-bold">
                        {part1?.MRData.ConstructorTable.Constructors[0]?.name}
                    </div>
                    <div className="text-2xl">
                        {
                            part1?.MRData.ConstructorTable.Constructors[0]
                                ?.nationality
                        }
                    </div>
                    {/* <div>Headquarters: {local?.headquarters}</div> */}
                </div>
            </div>
            <div>
                <div>
                    Titles:{" "}
                    {seasonsArray.map((season: any, id: number) =>
                        seasonsArray.length - 1 === id
                            ? season.season
                            : `${season.season}, `
                    )}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx: { query: { id: string } }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["constructor-part-1", ctx.query.id], () =>
        ConstructorsAPI.getSingleConstructor({ constructorId: ctx.query.id })
    );
    await queryClient.prefetchQuery(["constructor-part-2", ctx.query.id], () =>
        SeasonsAPI.getSeasonsByTitlesOfTeam({ constructorId: ctx.query.id })
    );
    await queryClient.prefetchQuery(["constructor-local", ctx.query.id], () =>
        ConstructorsLocalAPI.getConstructorById({
            constructorId: ctx.query.id,
        })
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
