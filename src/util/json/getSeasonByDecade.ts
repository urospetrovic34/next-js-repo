import find from "lodash/find";

import decades from "src/json/decades";

export default function getSeasonByDecade(decadeId?: string | string[]) {
    return find(decades, (el) => {
        return el.decadeId === decadeId;
    });
}
