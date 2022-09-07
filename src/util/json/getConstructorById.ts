import find from "lodash/find";

import constructors from "src/json/constructors";

export default function getConstructorById(constructorId?: string | string[]) {
    return find(constructors, (el) => {
        return el.constructorId === constructorId;
    });
}
