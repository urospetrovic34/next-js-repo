import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";

import RacesAPI from "src/services/races";
import ButtonGroupRace from "src/components/Button/ButtonGroupRace";

export default function Home() {
    const { query } = useRouter();
    const [active, setActive] = useState("race");
    const { data: race } = useQuery(
        ["race", `${query.season}/${query.race}`],
        () =>
            RacesAPI.getSingleRace({
                season: query.season,
                race: query.race,
            })
    );
    const { data: qual } = useQuery(
        ["qual", `${query.season}/${query.race}`],
        () =>
            RacesAPI.getSingleRaceQualification({
                season: query.season,
                race: query.race,
            })
    );
    const raceInfo = race?.MRData.RaceTable.Races[0];
    const raceInfoDate = new Date(raceInfo.date);
    const polePosition = raceInfo.Results.filter(
        (val: any) => val.grid === "1"
    );
    const fastestLap = raceInfo.Results.filter(
        (val: any) => val.FastestLap?.rank === "1"
    );
    const qualInfo = qual?.MRData.RaceTable.Races[0];
    return (
        <div>
            <div className="text-4xl font-bold">
                {raceInfo.season} {raceInfo.raceName}
            </div>
            <div className="flex justify-between">
                <div>
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
                        {raceInfo.Circuit.Location.country}{" "}
                        {raceInfo.Circuit.Location.country === "Italy" && "????????"}
                    </div>
                </div>
                <div>
                    <div>
                        {fastestLap.length !== 0 &&
                            `Fastest Lap: ${fastestLap[0].Driver.givenName.split(
                                "",
                                1
                            )}. ${fastestLap[0].Driver.familyName} - ${
                                fastestLap[0].FastestLap.Time.time
                            }`}
                    </div>
                    <div>
                        Pole Position:{" "}
                        {polePosition[0].Driver.givenName.split("", 1)}.{" "}
                        {polePosition[0].Driver.familyName}
                    </div>
                </div>
            </div>
            <ButtonGroupRace
                handleClick={(string: string) => setActive(string)}
                active={active}
            />
            {active === "race" ? (
                <table className="w-full text-center text-xl">
                    <thead className="bg-[#b62021] text-sm uppercase text-white">
                        <tr>
                            <th scope="col" className="py-5">
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
                            <tr className="border-b" key={id}>
                                <td className="py-2">
                                    {val.positionText === "F"
                                        ? "-"
                                        : val.position}
                                </td>
                                <td>
                                    {val.positionText === "F" ||
                                    (val.grid === "0" &&
                                        val.positionText === "W")
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
            ) : (
                <table className="w-full text-center text-xl">
                    <thead className="bg-[#b62021] text-sm uppercase text-white">
                        <tr>
                            <th scope="col" className="py-5">
                                Position
                            </th>
                            <th scope="col" className="py-3">
                                Driver
                            </th>
                            <th scope="col" className="py-3">
                                Constructor
                            </th>
                            <th scope="col" className="py-3">
                                Q1
                            </th>
                            <th scope="col" className="py-3">
                                Q2
                            </th>
                            <th scope="col" className="py-3">
                                Q3
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {qualInfo.QualifyingResults.map(
                            (val: any, id: number) => (
                                <tr className="border-b" key={id}>
                                    <td className="py-2">
                                        {val.positionText === "F"
                                            ? "-"
                                            : val.position}
                                    </td>
                                    <td>
                                        {val.Driver.givenName.split("", 1)}
                                        {". "}
                                        {val.Driver.familyName}
                                    </td>
                                    <td>{val.Constructor.name}</td>
                                    <td>{val.Q1}</td>
                                    <td>{val.Q2}</td>
                                    <td>{val.Q3}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            )}
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
    await queryClient.prefetchQuery(
        ["qual", `${ctx.query.season}/${ctx.query.race}`],
        () =>
            RacesAPI.getSingleRaceQualification({
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
