export default function Pagination({
    total,
    offset,
    limit,
}: {
    total: string;
    offset: string;
    limit: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold">{parseInt(offset) + 1}</span> to{" "}
                <span className="font-semibold">
                    {parseInt(offset) + parseInt(limit)}
                </span>{" "}
                of <span className="font-semibold">{total}</span> Entries
            </span>
            <div className="xs:mt-0 mt-2 inline-flex">
                <button
                    disabled={parseInt(offset) === 0}
                    className="rounded-l bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-70 disabled:hover:bg-gray-800"
                >
                    {parseInt(offset) === 0 ? "🛇" : "Prev"}
                </button>
                <button
                    disabled={
                        parseInt(offset) >= parseInt(total) - parseInt(limit)
                    }
                    className="rounded-r border-0 border-l border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
