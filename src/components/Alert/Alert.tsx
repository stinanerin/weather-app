import "./Alert.scss";

interface AlertProps {
    type?: "info" | "success" | "warning" | "danger";
    message: string;
    heading: string;
}

const Alert = ({ type = "info", message, heading }: AlertProps) => {
    const getTypeClass = () => {
        switch (type) {
            case "success":
                return "info-box-success";
            case "warning":
                return "info-box-warning";
            case "danger":
                return "info-box-danger";
            default:
                return "info-box-info";
        }
    };

    return (
        <div className={`info-box ${getTypeClass()}`}>
            <h2>{heading}</h2>
            <p>{message}</p>
        </div>
    );
};

export default Alert;
