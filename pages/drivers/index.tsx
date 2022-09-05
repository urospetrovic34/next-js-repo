import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";

import DriversAPI from "src/services/drivers";
import IDriverData, { IDrivers } from "src/types/API/driverInterface";
import DriverCard from "src/components/Card/DriverCard";
import Pagination from "src/components/Pagination";

export default function Drivers() {
    const { query, push } = useRouter();
    const { data } = useQuery<IDriverData>("drivers", () =>
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
                {data?.MRData.DriverTable.Drivers.map(
                    (val: IDrivers, id: number) => (
                        <DriverCard
                            key={id}
                            name={val.givenName}
                            surname={val.familyName}
                            date={val.dateOfBirth}
                            nation={val.nationality}
                            number={val.permanentNumber}
                        />
                    )
                )}
            </div>
            <div className="mt-4">
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

    await queryClient.prefetchQuery<IDriverData>("drivers", () =>
        DriversAPI.getDrivers({ offset: ctx.query.offset ?? "" })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
