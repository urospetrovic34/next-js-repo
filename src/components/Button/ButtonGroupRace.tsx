export default function ButtonGroupRace({
    handleClick,
    active,
}: {
    handleClick: any;
    active: string;
}) {
    return (
        <div>
            <button
                className={`${
                    active === "qual" ? "bg-red-500" : "bg-blue-500"
                } py-2 px-4 text-xl text-white`}
                onClick={() => handleClick("qual")}
            >
                Qualifying
            </button>
            <button
                className={`${
                    active === "race" ? "bg-red-500" : "bg-blue-500"
                } py-2 px-4 text-xl text-white`}
                onClick={() => handleClick("race")}
            >
                Race
            </button>
        </div>
    );
}
