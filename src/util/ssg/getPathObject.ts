export default function getPathObject(id: number) {
    return { params: { id: id.toString() } };
}
