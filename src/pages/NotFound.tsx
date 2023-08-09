import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
    return (
        <div className="not-found">
            <p >Oops!</p>
            <h1>That page cannot be found</h1>
            <Link to="/" className="button">
                <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                 {" "}To home page
            </Link>
        </div>
    );
};

export default NotFound;
