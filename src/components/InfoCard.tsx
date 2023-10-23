import { toUpperCaseStr } from "../utility/helper";

interface Props {
    heading: string;
    data: number | string;
    unit?: string;
}

export const InfoCard = ({ heading, data, unit }: Props) => {
    return (
        <article className="info-card">
            <h3>{toUpperCaseStr(heading)}</h3>
            <p>
                {data} {unit}
            </p>
        </article>
    );
};
