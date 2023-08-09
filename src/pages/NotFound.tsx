import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>That page cannot be found</p>
            <Link to="/" className="button">
                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                 {" "}To home page
            </Link>
        </div>
    );
};

export default NotFound;
