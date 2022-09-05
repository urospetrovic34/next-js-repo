import axios from "src/config/axios";

async function getDrivers() {
    const url = "/drivers.json?limit=36";
    const { data } = await axios.get(url);
    return data;
}

const drivers = {
    getDrivers,
};

export default drivers;
