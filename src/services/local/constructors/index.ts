import axios from "axios";

async function getConstructorById({
    constructorId,
}: {
    constructorId?: string | string[];
}) {
    const url = `/api/constructors/${constructorId}`;
    const { data } = await axios.get(url);
    return data;
}

const constructors = {
    getConstructorById,
};

export default constructors;
