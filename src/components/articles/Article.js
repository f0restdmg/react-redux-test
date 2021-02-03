import React from "react";

const Article = ({ article }) => {
  return (
    <div className="col-sm-12 col-md-4 mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {article.title.length > 20
              ? article.title.substr(0, 20) + "..."
              : article.title}
          </h5>
          <p className="card-text">
            {article.body.length > 100
              ? article.body.substr(0, 100) + "..."
              : article.body}
          </p>
          <div className="btn-group">
            <button className="btn btn-outline-dark">View detail</button>
            <button className="btn btn-outline-dark">Edit article</button>
            <button className="btn btn-outline-dark">Delete article</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
