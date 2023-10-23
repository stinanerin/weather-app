interface Props {
    showAdditionalHeadings: boolean;
}

const ForecastDescriptors = ({ showAdditionalHeadings }: Props) => {
    return (
        <div className="forecast-descriptors">
            {showAdditionalHeadings && (
                <>
                    <div className="wind-cell">
                        <p>Wind</p>
                        <p>(m/s)</p>
                    </div>
                </>
            )}
            <div className="rain-cell">
                <p>Rain</p>
                <p>(mm)</p>
            </div>
            <p>Weather</p>
            <div>
                <p>Temperature</p>
                {!showAdditionalHeadings && <p>Max / Min</p>}
            </div>
        </div>
    );
};

export default ForecastDescriptors;
