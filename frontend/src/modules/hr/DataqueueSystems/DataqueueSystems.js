import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import "./DataqueueSystems.css";
import SideBar from "../sidebar/sidebar";
import axios from "../../../axios";

const CognitiveSolution = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    axios
      .get("hr/all/overviews/", headers)
      .then((res) => {
        console.log(res.data);
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* <SideBar /> */}
      <div className="cognitive">
        <Card className="card cognitive__card">

 <Row
            className="cognitive__row3"
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Col
              xs="12"
              md="6"
              style={{ textAlign: "center" }}
              className="cognitive_row2_col1"
            >
            <h2>STUDENTS</h2>
            <div>
              <svg height="100" width="100">
                <svg height="100" width="100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="black"
                    stroke-width="3"
                    fill="#0093DD"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke="black"
                  stroke-width="3"
                  fill="white"
                />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div>
              <h3>{info.students}</h3>
            </div>
            <div>
              <h3>TOTAL</h3>
            </div>
            </Col>
            <Col xs="12" md="6" style={{ textAlign: "center" }}>
           <h2>COLLEGES</h2>
            <div>
              <svg height="100" width="100">
                <svg height="100" width="100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="black"
                    stroke-width="3"
                    fill="#0093DD"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke="black"
                  stroke-width="3"
                  fill="white"
                />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div>
              <h3>{info.colleges}</h3>
            </div>
            <div>
              <h3>TOTAL</h3>
            </div>
            </Col>
          </Row>


          <Row
            className="cognitive__row3"
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Col
              xs="12"
              md="6"
              style={{ textAlign: "center" }}
              className="cognitive_row2_col1"
            >
            <h2>PROJECTS</h2>
            <div>
              <svg height="100" width="100">
                <svg height="100" width="100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="black"
                    stroke-width="3"
                    fill="#0093DD"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke="black"
                  stroke-width="3"
                  fill="white"
                />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div>
              <h3>{info.projects}</h3>
            </div>
            <div>
              <h3>TOTAL</h3>
            </div>
            </Col>
            <Col xs="12" md="6" style={{ textAlign: "center" }}>
           <h2>COMPANIES</h2>
            <div>
              <svg height="100" width="100">
                <svg height="100" width="100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="black"
                    stroke-width="3"
                    fill="#0093DD"
                  />
                  Sorry, your browser does not support inline SVG.
                </svg>
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke="black"
                  stroke-width="3"
                  fill="white"
                />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
            <div>
              <h3>{info.companys}</h3>
            </div>
            <div>
              <h3>TOTAL</h3>
            </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default CognitiveSolution;
