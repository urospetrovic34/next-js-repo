import axios from "src/config/axios";

async function getSeasonsByDecade({ offset }: { offset?: string | string[] }) {
    const url = `/seasons.json?limit=10&offset=${(Number(offset) - 1) * 10}`;
    const { data } = await axios.get(url);
    return data;
}

const seasons = {
    getSeasonsByDecade,
};

export default seasons;
