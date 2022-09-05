export default function Pagination({
    total,
    offset,
    limit,
    rightClick,
    leftClick,
}: {
    total: number;
    offset: number;
    limit: number;
    rightClick: () => void;
    leftClick: () => void;
}) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold">{offset + 1}</span> to{" "}
                <span className="font-semibold">{offset + limit}</span> of{" "}
                <span className="font-semibold">{total}</span> Entries
            </span>
            <div className="xs:mt-0 mt-2 inline-flex">
                <button
                    disabled={offset === 0}
                    className="pagination-btn rounded-l border-r"
                    onClick={leftClick}
                >
                    {offset === 0 ? "🛇" : "Prev"}
                </button>
                <button
                    disabled={offset >= total - limit}
                    className="pagination-btn rounded-r border-l"
                    onClick={rightClick}
                >
                    {offset >= total - limit ? "🛇" : "Next"}
                </button>
            </div>
        </div>
    );
}
