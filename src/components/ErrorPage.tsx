import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="section error-page">
      <div>
        <span className="icon">
          <i className="fas fa-bug fa-lg"></i>
        </span>
        <h1 className="is-size-5 ps-inline">
          Not sure this is what you were looking for
        </h1>
        <span className="icon">
          <i className="fas fa-bug fa-lg"></i>
        </span>
      </div>
      <p className="is-size-4">
        Click <Link to="/home">home</Link> to get back to safety
      </p>
      <figure className="image is-square">
        <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3E0cWF4eWRobTd3YmF4ZTZ6cXlncWQzZjc4bHQ1cmN3bmdneXUydiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0Pky6C83SzkzU55a/giphy.gif" />
      </figure>
    </section>
  );
}

export default ErrorPage;
