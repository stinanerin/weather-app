import SkeletonElement from "./SkeletonElement";


interface Props {
    limit: number;
}

const HourlyForecastListSkeleton = ({ limit } : Props) => {

    return (
        <div className="skeleton-hourly-overview">
            <div>
                <SkeletonElement type={"large-title"} />
                <SkeletonElement type={"large-title"} />
            </div>
            <SkeletonElement type={"title"} />

            {Array.from({ length: limit }, (_, index) => (
                <SkeletonElement key={index} type={"small-card"}>
                    <SkeletonElement type={"title"} />
                    <SkeletonElement type={"text"} />
                </SkeletonElement>
            ))
            }
        </div>
    );
};

export default HourlyForecastListSkeleton;
