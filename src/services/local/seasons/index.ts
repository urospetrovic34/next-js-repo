import axios from "axios";

async function getSeasonByDecade({
    decadeId,
}: {
    decadeId?: string | string[];
}) {
    const url = `/api/seasons/decades/${decadeId}`;
    const { data } = await axios.get(url);
    return data;
}

const seasons = {
    getSeasonByDecade,
};

export default seasons;
