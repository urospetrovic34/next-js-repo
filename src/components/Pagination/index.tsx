import Link from "next/link";

export default function Pagination({
    total,
    offset,
    limit,
    previousPage,
    nextPage,
}: {
    total: number;
    offset: number;
    limit: number;
    previousPage: string;
    nextPage: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold">{offset + 1}</span> to{" "}
                <span className="font-semibold">
                    {offset + limit > total ? `${total}` : `${offset + limit}`}
                </span>{" "}
                of <span className="font-semibold">{total}</span> Entries
            </span>
            <div className="xs:mt-0 mt-2 inline-flex">
                <Link href={previousPage} passHref>
                    <a>
                        <button
                            disabled={offset === 0}
                            className="pagination-btn rounded-l border-r"
                        >
                            {offset === 0 ? "🛇" : "Prev"}
                        </button>
                    </a>
                </Link>
                <Link href={nextPage} passHref>
                    <a>
                        <button
                            disabled={offset >= total - limit}
                            className="pagination-btn rounded-r border-l"
                        >
                            {offset >= total - limit ? "🛇" : "Next"}
                        </button>
                    </a>
                </Link>
            </div>
        </div>
    );
}
