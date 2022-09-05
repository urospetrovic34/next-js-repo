import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";

import DriversAPI from "src/services/drivers";
import ConstructorsAPI from "src/services/constructors";
import { IData } from "src/types/API/mrDataInterface";

export default function Driver() {
    const { query } = useRouter();
    const { data: driver } = useQuery<IData>(["driver", query.driverId], () =>
        DriversAPI.getSingleDriver({ driverId: query.driverId })
    );
    const { data: constructor } = useQuery<IData>(
        ["driver-constructors", query.driverId],
        () =>
            ConstructorsAPI.getConstructorsByDriver({
                driverId: query.driverId,
            }),
        { enabled: !!driver }
    );

    return (
        <>
            <div>{driver?.MRData.DriverTable?.Drivers[0].givenName}</div>
            <div>{driver?.MRData.DriverTable?.Drivers[0].familyName}</div>
            <div>
                {constructor?.MRData.ConstructorTable?.Constructors[0].name}
            </div>
        </>
    );
}

export async function getServerSideProps(ctx: {
    query: { driverId: "string" };
}) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<IData>(["driver", ctx.query.driverId], () =>
        DriversAPI.getSingleDriver({ driverId: ctx.query.driverId })
    );

    await queryClient.prefetchQuery<IData>(
        ["driver-constructors", ctx.query.driverId],
        () =>
            ConstructorsAPI.getConstructorsByDriver({
                driverId: ctx.query.driverId,
            })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
