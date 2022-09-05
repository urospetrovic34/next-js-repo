import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";

import DriversAPI from "src/services/drivers";
import { IDrivers } from "src/types/API/driverInterface";
import { IData } from "src/types/API/mrDataInterface";
import DriverCard from "src/components/Card/DriverCard";
import Pagination from "src/components/Pagination";

export default function Drivers() {
    const { query, push } = useRouter();
    const { data } = useQuery<IData>("drivers", () =>
        DriversAPI.getDrivers({ offset: query.offset ?? "" })
    );

    const increaseOffset = () => {
        if (!query.offset) {
            query.offset = String(36);
        } else {
            query.offset = String(Number(query.offset) + 36);
        }
        push(`/drivers?offset=${query.offset}`);
    };

    const decreaseOffset = () => {
        if (query.offset) {
            query.offset = String(Number(query.offset) - 36);
        }
        push(`/drivers?offset=${query.offset}`);
    };

    return (
        <>
            <div className="grid grid-rows-6 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.MRData.DriverTable?.Drivers.map(
                    (val: IDrivers, id: number) => (
                        <Link
                            href={`/drivers/${val.driverId}`}
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
                    rightClick={increaseOffset}
                    leftClick={decreaseOffset}
                />
            </div>
        </>
    );
}

export async function getServerSideProps(ctx: { query: { offset: "string" } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<IData>("drivers", () =>
        DriversAPI.getDrivers({ offset: ctx.query.offset ?? "" })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
