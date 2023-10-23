import SkeletonElement from "./SkeletonElement";

const MoreInfoSectionSkeleton = () => {
    return (
        <div className="more-info-section">
            <SkeletonElement type={"large-title"} />

            <div className="more-info-grid">
                {Array.from({ length: 6 }, (_, index) => (
                    <SkeletonElement key={index} type={"info-card"}>
                        <SkeletonElement type={"large-title"} />
                        <SkeletonElement type={"title"} />
                    </SkeletonElement>
                ))}
            </div>
        </div>
    );
};

export default MoreInfoSectionSkeleton;
