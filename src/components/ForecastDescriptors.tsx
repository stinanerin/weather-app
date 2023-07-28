interface Props {
    showAdditionalHeadings: boolean;
}

const ForecastDescriptors = ({ showAdditionalHeadings }: Props) => {
    return (
        <div className="forecast-descriptors">
            {showAdditionalHeadings && (
                <>
                    <div>
                        <p>Wind</p>
                        <p>(m/s)</p>
                    </div>
                    <div>
                        <p>Rain</p>
                        <p>(mm)</p>
                    </div>
                </>
            )}
            <p>Weather</p>
            <div>
                <p>Temperatures</p>
                {!showAdditionalHeadings && <p>Max / Min</p>}
            </div>
        </div>
    );
};

export default ForecastDescriptors;
