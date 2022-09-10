import map from "lodash/map";

import decades from "src/json/decades";

function getDecadePathObject(decade: any) {
    return { params: { id: decade.decadeId } };
}

export default function getDecadePaths() {
    return map(decades, getDecadePathObject);
}
