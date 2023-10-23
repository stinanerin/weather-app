import { InfoCard } from "./InfoCard";

interface MoreInfo {
    uv: { data: number; unit: string };
    pressure: { data: number; unit: string };
    visibility: { data: number; unit: string };
    humidity: { data: number; unit: string };
    sunrise: { data: string; unit: string };
    sunset: { data: string; unit: string };
}

export const MoreInfoWrapper = ({ moreInfo }: { moreInfo: MoreInfo }) => {
    const infoKeys = Object.keys(moreInfo);

    return (
        <>
            <h2 className="heading">Other info</h2>
            <div className="more-info-wrapper">
                {infoKeys.map((key, index) => (
                    <InfoCard
                        key={key + index}
                        heading={key}
                        data={moreInfo[key as keyof MoreInfo].data}
                        unit={moreInfo[key as keyof MoreInfo].unit}
                    />
                ))}
            </div>
        </>
    );
};
