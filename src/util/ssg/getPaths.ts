import range from "lodash/range";
import map from "lodash/map";

import getPathObject from "src/util/ssg/getPathObject";

export default function getPaths(count: number) {
    return map(range(1, count, 1), getPathObject);
}
