import axios from "src/config/axios";

async function getConstructorsByDriver({
    driverId,
}: {
    driverId?: string | string[];
}) {
    const url = `/drivers/${driverId}/constructors.json`;
    const { data } = await axios.get(url);
    return data;
}

const constructors = {
    getConstructorsByDriver,
};

export default constructors;
