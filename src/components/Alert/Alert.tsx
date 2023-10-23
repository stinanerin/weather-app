import "./alert.scss";

enum AlertType {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
}
interface AlertProps {
    type?: AlertType;
    message: string;
    heading: string;
}

const Alert = ({ type = AlertType.Info, message, heading }: AlertProps) => {
    const getTypeClass = () => {
        switch (type) {
            case AlertType.Success:
                return "info-box-success";
            case AlertType.Warning:
                return "info-box-warning";
            case AlertType.Danger:
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
