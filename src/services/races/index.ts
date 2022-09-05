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

const races = {
    getSingleDriverResults,
};

export default races;
