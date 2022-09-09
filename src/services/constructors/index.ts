import axios from "src/config/axios";

async function getSingleConstructor({
    constructorId,
}: {
    constructorId?: string | string[];
}) {
    const url = `/constructors/${constructorId}.json`;
    const { data } = await axios.get(url);
    return data;
}

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
    getSingleConstructor,
    getConstructorsByDriver,
};

export default constructors;
