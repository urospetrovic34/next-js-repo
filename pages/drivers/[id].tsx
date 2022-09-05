import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import DriversAPI from "src/services/drivers";
import { IDrivers } from "src/types/API/driverInterface";
import { IData } from "src/types/API/mrDataInterface";
import DriverCard from "src/components/Card/DriverCard";
import Pagination from "src/components/Pagination";

export default function Drivers() {
    const { query } = useRouter();
    const { data } = useQuery<IData>(["drivers", query.id], () =>
        DriversAPI.getDrivers({ offset: query.id })
    );

    return (
        <>
            <div className="grid grid-rows-6 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.MRData.DriverTable?.Drivers.map(
                    (val: IDrivers, id: number) => (
                        <Link
                            href={`/drivers/profile/${val.driverId}`}
                            key={id}
                            passHref
                        >
                            <a>
                                <DriverCard
                                    name={val.givenName}
                                    surname={val.familyName}
                                    date={val.dateOfBirth}
                                    nation={val.nationality}
                                    number={val.permanentNumber}
                                />
                            </a>
                        </Link>
                    )
                )}
            </div>
            <div className="mt-8">
                <Pagination
                    total={Number(data?.MRData.total)}
                    offset={Number(data?.MRData.offset)}
                    limit={Number(data?.MRData.limit)}
                    previousPage={`/drivers/${Number(query.id) - 1}`}
                    nextPage={`/drivers/${Number(query.id) + 1}`}
                />
            </div>
        </>
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
            { params: { id: "9" } },
            { params: { id: "10" } },
            { params: { id: "11" } },
            { params: { id: "12" } },
            { params: { id: "13" } },
            { params: { id: "14" } },
            { params: { id: "15" } },
            { params: { id: "16" } },
            { params: { id: "17" } },
            { params: { id: "18" } },
            { params: { id: "19" } },
            { params: { id: "20" } },
            { params: { id: "21" } },
            { params: { id: "22" } },
            { params: { id: "23" } },
            { params: { id: "24" } },
        ],
        fallback: false,
    };
}

export async function getStaticProps(ctx: { params: { id: "string" } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<IData>(["drivers", ctx.params.id], () =>
        DriversAPI.getDrivers({ offset: ctx.params.id })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
