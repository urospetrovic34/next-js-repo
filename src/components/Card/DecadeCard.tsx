export default function DriverCard({
    name,
    background,
}: {
    name: string;
    background: string;
}) {
    return (
        <div
            className="flex min-h-[170px] min-w-max cursor-pointer flex-col items-center justify-center gap-1 rounded bg-120% bg-center bg-no-repeat shadow-md transition-all hover:bg-150% hover:brightness-[0.65]"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="text-3xl font-bold italic text-white">{name}</div>
        </div>
    );
}
