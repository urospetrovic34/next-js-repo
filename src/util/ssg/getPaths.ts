import range from "lodash/range";
import map from "lodash/map";

function getPathObject(id: number) {
    return { params: { id: id.toString() } };
}

export default function getPaths(count: number) {
    return map(range(1, count, 1), getPathObject);
}
