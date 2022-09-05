import { dehydrate, QueryClient, useQuery } from "react-query";

import DriversAPI from "src/services/drivers";
import IDriverData, { IDrivers } from "src/types/API/driverInterface";
import DriverCard from "src/components/Card/DriverCard";
import Pagination from "src/components/Pagination";

export default function Drivers() {
    const { data } = useQuery<IDriverData>("drivers", DriversAPI.getDrivers);

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
                    total={data?.MRData.total || "0"}
                    offset={data?.MRData.offset || "0"}
                    limit={data?.MRData.limit || "0"}
                />
            </div>
        </>
    );
}

export async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<IDriverData>(
        "drivers",
        DriversAPI.getDrivers
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
