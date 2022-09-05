export default function ButtonOne({ text }: { text?: string }) {
    return <button className="btn btn-red">{text ? text : "Button"}</button>;
}
