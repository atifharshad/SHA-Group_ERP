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
      .get("projects/dataqueue_systems/client_projects/overviews/", headers)
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
          <Row
            className="cognitive__row2"
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          >
            <Col
              xs="12"
              md="6"
              style={{ textAlign: "center" }}
              className="cognitive_row2_col1"
            >
              <div>
                <h4>STATUS</h4>
              </div>
              <div className="cognitive_row1_col1_rows">
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.ongoing}</h4>
                  </div>
                  <div>
                    <h4>ONGOING</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
              <h4>{info.completed}</h4>
                  </div>
                  <div>
                    <h4>COMPLETED</h4>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6" style={{ textAlign: "center" }}>
              <div>
                <h4>PAYMENT</h4>
              </div>
              <div className="cognitive_row1_col1_rows">
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
              <h4>{info.paid}</h4>
                  </div>
                  <div>
                    <h4>PAID</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <h4>{info.pending}</h4>
                  </div>
                  <div>
                    <h4>PENDING</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default CognitiveSolution;
