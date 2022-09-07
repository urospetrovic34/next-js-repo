import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import DriversAPI from "src/services/drivers";
import { IDrivers } from "src/types/API/driverInterface";
import { IData } from "src/types/API/mrDataInterface";
import DriverCard from "src/components/Card/DriverCard";
import Pagination from "src/components/Pagination";
import getPaths from "src/util/ssg/getPaths";

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
                            href={`/drivers/info/${val.driverId}`}
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
                {Number(data?.MRData.total) < 36 ? (
                    <div></div>
                ) : (
                    <Pagination
                        total={Number(data?.MRData.total)}
                        offset={Number(data?.MRData.offset)}
                        limit={Number(data?.MRData.limit)}
                        previousPage={`/drivers/${Number(query.id) - 1}`}
                        nextPage={`/drivers/${Number(query.id) + 1}`}
                    />
                )}
            </div>
        </>
    );
}

export async function getStaticPaths() {
    return {
        paths: getPaths(25),
        fallback: false,
    };
}

export async function getStaticProps(ctx: { params: { id: string } }) {
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
