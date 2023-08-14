
import SkeletonElement from "./SkeletonElement";

// interface SkeletonProps {
//     theme?: string;
// }
// { theme }: SkeletonProps
 

const CurrentDisplaySkeleton = () => {
        // const themeClass = theme || "light";
        /* <div className={`skeleton-wrapper skeleton-${themeClass}`}> */

  return (
    <>
    <SkeletonElement type={"current-weather-display"}>
        <SkeletonElement type={"title"} />                
        <SkeletonElement type={"text"} />                
        <SkeletonElement type={"text"} />                
    </SkeletonElement>
</>
    ); 
}

export default CurrentDisplaySkeleton