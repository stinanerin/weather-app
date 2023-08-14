import SkeletonElement from "./SkeletonElement";

// interface SkeletonProps {
//     theme?: string;
// }

// { theme }: SkeletonProps

const SkeletonOverview = () => {
    // const themeClass = theme || "light";

    return (
        <div className="skeleton-overview">
                <SkeletonElement type={"title"} />

                {Array.from({ length: 7 }, (_, index) =>  (
                    <SkeletonElement key={index} type={"card"} >
                        <SkeletonElement type={"title"} />
                        <SkeletonElement type={"text"} />
                    </SkeletonElement>
                ))}
        </div>

    );
};

export default SkeletonOverview;
