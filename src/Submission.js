import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";


function Submission() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetch = async () => {
     axios.get("http://localhost:8081/")
       .then((res) => {
          setInfo(res.data);
       })
       .catch((err) => {
         console.error(err);
       });
    }
    fetch();
  }, [])
  console.log(info);
  return (
    <div className="submission">
      <h1>Submission View</h1>
      <Link to="/">
        <button
          className="btn btn-primary"
          style={{ marginTop: "10px", width: "200px" }}
        >
          <i class="fa-solid fa-plus"></i> Submit New
        </button>
      </Link>
      <div className="row tables">
        <div className="col-1 table-name">Time</div>
        <div className="col-2 table-name">Username</div>
        <div className="col-2 table-lang">Language</div>
        <div className="col-5 table-code">Code</div>
        <div className="col-2 table-in">StdIn</div>
      </div>
      {info
        .slice()
        .reverse()
        .map((data) => (
          <div key={data.id} className="row table-data">
            <div className="col-1 table-name-view">{data.time}</div>
            <div className="col-2 table-name-view">{data.username}</div>
            <div className="col-2 table-lang-view">{data.language}</div>
            <div className="col-5 table-code-view">
              <div className="col-12">
                {data.code.length >= 96
                  ? `${data.code.substring(0, 96)} ...`
                  : data.code}
              </div>
            </div>
            <div className="col-2 table-in-view">{data.stdin}</div>
          </div>
        ))}
    </div>
  );
}
export default Submission;