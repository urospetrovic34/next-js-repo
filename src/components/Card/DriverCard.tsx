export default function DriverCard({
    name,
    surname,
    date,
    nation,
    number,
}: {
    name: string;
    surname: string;
    date: string;
    nation: string;
    number?: string;
}) {
    return (
        <div className="flex min-w-max cursor-pointer flex-col justify-between gap-1 rounded bg-gray-100 px-3 py-2 shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-lg font-bold">
                    {name} {surname}
                </p>
                <p className="font-bold">{number && "#" + number}</p>
            </div>
            <div className="flex justify-between">
                <p>{date}</p>
                <p>{nation}</p>
            </div>
        </div>
    );
}
