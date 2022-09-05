import axios from "src/config/axios";

async function getDrivers({ offset = "" }: { offset?: string | string[] }) {
    const url = `/drivers.json?limit=36&${offset && `offset=${offset}`}`;
    const { data } = await axios.get(url);
    return data;
}

const drivers = {
    getDrivers,
};

export default drivers;
