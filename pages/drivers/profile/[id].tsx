import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";

import DriversAPI from "src/services/drivers";
import { IDrivers } from "src/types/API/driverInterface";
import ConstructorsAPI from "src/services/constructors";
import { IData } from "src/types/API/mrDataInterface";

export default function Driver() {
    const { query } = useRouter();
    const { data: driver } = useQuery<IData>(["driver", query.id], () =>
        DriversAPI.getSingleDriver({ driverId: query.id })
    );
    const { data: constructor } = useQuery<IData>(
        ["driver-constructors", query.id],
        () =>
            ConstructorsAPI.getConstructorsByDriver({
                driverId: query.id,
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

export async function getStaticPaths() {
    const data = await DriversAPI.getAllDrivers();

    const paths = data.MRData.DriverTable.Drivers.map((val: IDrivers) => {
        return {
            params: {
                id: `${val.driverId}`,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(ctx: { params: { id: "string" } }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<IData>(["driver", ctx.params.id], () =>
        DriversAPI.getSingleDriver({ driverId: ctx.params.id })
    );

    await queryClient.prefetchQuery<IData>(
        ["driver-constructors", ctx.params.id],
        () =>
            ConstructorsAPI.getConstructorsByDriver({
                driverId: ctx.params.id,
            })
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
