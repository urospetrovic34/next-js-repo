import axios from "src/config/axios";

async function getSingleDriverResults({
    driverId,
    position,
}: {
    driverId?: string | string[];
    position: string;
}) {
    const url = `/drivers/${driverId}/results/${position}.json?limit=1`;
    const { data } = await axios.get(url);
    return data;
}

async function getSingleRace({
    season,
    race,
}: {
    season?: string | string[];
    race?: string | string[];
}) {
    const url = `/${season}/${race}/results.json`;
    const { data } = await axios.get(url);
    return data;
}

const races = {
    getSingleDriverResults,
    getSingleRace,
};

export default races;
