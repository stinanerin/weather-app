
import './skeleton.scss';
import { ReactNode } from 'react'; 

interface SkeletonProps {
    type: string;
    // Add children prop of type ReactNode
    children?: ReactNode;
}

const SkeletonElement = ({ type, children }: SkeletonProps) => {
    const classes = `skeleton shimmer skeleton-${type}`;

    return <div className={classes}>{children}</div>;
};

export default SkeletonElement;
