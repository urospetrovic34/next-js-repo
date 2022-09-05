import axios from "src/config/axios";

async function getSingleDriver({ driverId }: { driverId?: string | string[] }) {
    const url = `/drivers/${driverId}.json`;
    const { data } = await axios.get(url);
    return data;
}

async function getDrivers({ offset }: { offset?: string | string[] }) {
    const url = `/drivers.json?offset=${(Number(offset) - 1) * 36}&limit=36`;
    const { data } = await axios.get(url);
    return data;
}

const drivers = {
    getSingleDriver,
    getDrivers,
};

export default drivers;
