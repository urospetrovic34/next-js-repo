import axios from "src/config/axios";

async function getSingleDriver({ driverId }: { driverId?: string | string[] }) {
    const url = `/drivers/${driverId}.json`;
    const { data } = await axios.get(url);
    return data;
}

async function getDrivers({ offset = "" }: { offset?: string | string[] }) {
    const url = `/drivers.json?limit=36${offset && `&offset=${offset}`}`;
    const { data } = await axios.get(url);
    return data;
}

const drivers = {
    getSingleDriver,
    getDrivers,
};

export default drivers;