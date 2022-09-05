import axios from "src/config/axios";

async function getSingleDriver({ driverId }: { driverId?: string | string[] }) {
    const url = `/drivers/${driverId}.json`;
    const { data } = await axios.get(url);
    return data;
}

async function getDrivers({
    offset = "0",
    limit = "0",
}: {
    offset?: string | string[];
    limit?: string;
}) {
    const url = `/drivers.json?offset=${
        (Number(offset) - 1) * 36
    }&limit=${limit}`;
    const { data } = await axios.get(url);
    return data;
}

async function getAllDrivers() {
    const url = `/drivers.json?limit=1000`;
    const { data } = await axios.get(url);
    return data;
}

const drivers = {
    getSingleDriver,
    getDrivers,
    getAllDrivers,
};

export default drivers;
