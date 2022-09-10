import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";

import RacesAPI from "src/services/races";

export default function Home() {
    const { query } = useRouter();
    const { data } = useQuery(["race", `${query.season}/${query.race}`], () =>
        RacesAPI.getSingleRace({
            season: query.season,
            race: query.race,
        })
    );
    const raceInfo = data?.MRData.RaceTable.Races[0];
    const raceInfoDate = new Date(raceInfo.date);
    const polePosition = raceInfo.Results.filter(
        (val: any) => val.grid === "1"
    );
    const fastestLap = raceInfo.Results.filter(
        (val: any) => val.FastestLap?.rank === "1"
    );
    return (
        <div>
            <div>
                {raceInfo.season} {raceInfo.raceName}
            </div>
            <div>
                <>
                    Date: {raceInfoDate.getDate()}
                    {". "}
                    {raceInfoDate.toLocaleString("default", {
                        month: "long",
                    })}{" "}
                    {raceInfoDate.getFullYear()}
                </>
            </div>
            <div>Round {raceInfo.round}</div>
            <div>
                {raceInfo.Circuit.circuitName}
                {", "}
                {raceInfo.Circuit.Location.locality}
                {", "}
                {raceInfo.Circuit.Location.country}
            </div>
            <div>
                {fastestLap.length !== 0 &&
                    `Fastest Lap: ${fastestLap[0].Driver.givenName.split(
                        "",
                        1
                    )}. ${fastestLap[0].Driver.familyName}`}
            </div>
            <div>
                Pole Position: {polePosition[0].Driver.givenName.split("", 1)}.{" "}
                {polePosition[0].Driver.familyName}
            </div>
            <table className="w-full text-center text-xl text-white">
                <thead className="bg-[#b62021] text-sm uppercase text-white">
                    <tr>
                        <th scope="col" className="py-3">
                            Position
                        </th>
                        <th scope="col" className="py-3">
                            Grid
                        </th>
                        <th scope="col" className="py-3">
                            Driver
                        </th>
                        <th scope="col" className="py-3">
                            Constructor
                        </th>
                        <th scope="col" className="py-3">
                            Laps
                        </th>
                        <th scope="col" className="py-3">
                            Time
                        </th>
                        <th scope="col" className="py-3">
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {raceInfo.Results.map((val: any, id: number) => (
                        <tr
                            className="border-b border-gray-700 bg-[#131313]"
                            key={id}
                        >
                            <td>
                                {val.positionText === "F" ? "-" : val.position}
                            </td>
                            <td>
                                {val.positionText === "F" ||
                                (val.grid === "0" && val.positionText === "W")
                                    ? "-"
                                    : val.grid === "0" &&
                                      val.positionText !== "W"
                                    ? "Pitlane"
                                    : val.grid}
                            </td>
                            <td>
                                {val.Driver.givenName.split("", 1)}
                                {". "}
                                {val.Driver.familyName}
                            </td>
                            <td>{val.Constructor.name}</td>
                            <td>
                                {val.positionText === "R"
                                    ? "DNF"
                                    : val.positionText === "W"
                                    ? "DNS"
                                    : val.positionText === "F"
                                    ? "DNQ"
                                    : val.laps}
                            </td>
                            <td>
                                {val?.Time?.time
                                    ? val?.Time?.time
                                    : val.positionText === "F"
                                    ? ""
                                    : val.status}
                            </td>
                            <td>{val.points !== "0" && val.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export async function getServerSideProps(ctx: {
    query: { season: string; race: string };
}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(
        ["race", `${ctx.query.season}/${ctx.query.race}`],
        () =>
            RacesAPI.getSingleRace({
                season: ctx.query.season,
                race: ctx.query.race,
            })
    );
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}
