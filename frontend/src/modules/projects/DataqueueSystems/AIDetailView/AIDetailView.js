import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

import "./AIDetailView.css";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  FormText,
} from "reactstrap";
import Modal from "../../../../components/Modal/Modal";

const AIDetailView = (props) => {
  const [detail, setDetail] = useState([]);
  const [frontends, setFrontends] = useState([]);
  const [backends, setBackends] = useState([]);
  const [frontendModal, setFrontendModal] = useState(false);
  const [backendModal, setBackendModal] = useState(false);
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);
  const [companys, setCompanys] = useState([]);
  const [company, setCompany] = useState({});


  const fetchData = () => {
    const id = props.match.params.id;
    // const url = `cognitive_solutions/cognitive_internships/1`
    // const url = 'https://jsonplaceholder.typicode.com/posts/1'
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };

    axios
      .get(
        "administration/cognitive_solutions/programs/companys/",
        headers
      )
      .then((res) => {
        console.log(res.data);
        setCompanys(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/frontends/", headers)
      .then((res) => {
        console.log(res.data);
        setFrontends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/backends/", headers)
      .then((res) => {
        console.log(res.data);
        setBackends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `projects/dataqueue_systems/client_projects/projects/${id}/`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: detail.id,
      title: detail.title,
      description: detail.description,
      client_name: detail.client_name,
      client_contact: detail.client_contact,
      client_email: detail.client_email,
      company: detail.company,
      frontend: detail.frontend,
      backend: detail.backend,
      status: detail.status,
      cost: detail.cost,
      concession: detail.concession,
    },
    validationSchema: Yup.object({
      // userName: Yup.string()
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      // password: Yup.string()
      //   .min(8, "Must be atleast 8 characters or more")
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      // firstName: Yup.string()
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      // lastName: Yup.string()
      //   .max(25, "Must be 25 characters or less")
      //   .required("Required"),
      //   email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const id = props.match.params.id;
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      // const url = `administration/cognitive_solutions/programs/academic_internships/${id}/`;
      const url = `projects/dataqueue_systems/client_projects/projects/${id}/`;
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      axios
        .put(url, formData, headers)
        .then((res) => {
          console.log(res.data);
          setSuccessResponse("Form Submitted Successfully");
          setSuccessResponseModal(true);
          fetchData();
          // resetForm({ values: "" });
        })
        .catch((err) => {
          console.log(err.message);
          setErrorResponse(err.message);
          setErrorResponseModal(true);
          // setResponse(err)
        });
    },
  });

  const companySubmitHandler = (event) => {
    event.preventDefault();
      const token= localStorage.getItem('token')
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = company
      axios
      .post("administration/cognitive_solutions/programs/companys/",data , headers)
      .then((res) => {
        console.log(res.data);
        companys.push(res.data)
        setCompanyModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const companyInputHandler = (event) => {
    setCompany({
      ...company,
      [event.target.name]: event.target.value
    })
  };


  const frontendSubmitHandler = (event) => {
    event.preventDefault();
    alert("frontend " + frontend);
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: frontend,
    };
    axios
      .post(
        "administration/cognitive_solutions/programs/frontends/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        frontends.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const frontendInputHandler = (event) => {
    setFrontend(event.target.value);
  };

  const backendSubmitHandler = (event) => {
    event.preventDefault();
    alert("backend " + backend);
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = {
      name: backend,
    };
    axios
      .post(
        "administration/cognitive_solutions/programs/backends/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        backends.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backendInputHandler = (event) => {
    setBackend(event.target.value);
  };


  return (
    <div className="DetailView">
      <Modal
        modalOpen={successResponseModal}
        header="Success"
        setModalOpen={setSuccessResponseModal}
      >
        <center>
          <strong>{successResponse}</strong>
        </center>
      </Modal>
      <Modal
        modalOpen={errorResponseModal}
        header="Error"
        setModalOpen={setErrorResponseModal}
      >
          <div style={{ color: "red" }}>
            <strong>
              {errorResponse}
            </strong>
          </div>
      </Modal>
      <Modal
        modalOpen={frontendModal}
        header="Add Frontend"
        setModalOpen={setFrontendModal}
      >
        <Form onSubmit={frontendSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={frontendInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Modal
        modalOpen={companyModal}
        header="Add Company"
        setModalOpen={setCompanyModal}
      >
          <Form onSubmit={companySubmitHandler}>
            <FormGroup>
              <Label for="">Company Name</Label>
              <Input type="text" name="name"  onChange={companyInputHandler} />
              </FormGroup>
              <FormGroup>
              <Label for="">Company Place</Label>
              <Input type="text" name="place"  onChange={companyInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">Company Website</Label>
              <Input type="text" name="website"  onChange={companyInputHandler} />
            </FormGroup>
            <Button type="submit">ADD</Button>
          </Form>
      </Modal>
      <Modal
        modalOpen={backendModal}
        header="Add Backend"
        setModalOpen={setBackendModal}
      >
        <Form onSubmit={backendSubmitHandler}>
          <FormGroup>
            <Label for="">Name</Label>
            <Input type="text" name="name" onChange={backendInputHandler} />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Row>
        <Col md="12">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Edit Project</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      <label>Project Title</label>
                      <Input
                        defaultValue=""
                        placeholder="Project Title"
                        type="text"
                        name="title"
                        id="title"
                        {...formik.getFieldProps("title")}
                      />
                    </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="px-1" md="12">
                    <FormGroup>
                      <label>Project Description</label>
                      <Input
                        defaultValue=""
                        placeholder="Project Decription"
                        type="textarea"
                        name="description"
                        id="description"
                        {...formik.getFieldProps("description")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Client Name</label>
                      <Input
                        defaultValue=""
                        placeholder="Client Name"
                        type="text"
                        {...formik.getFieldProps("client_name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Client Email</label>
                      <Input
                        defaultValue=""
                        placeholder="Email ID"
                        type="email"
                        {...formik.getFieldProps("client_email")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Client Contact</label>
                      <Input
                        placeholder="Contact No."
                        type="number"
                        {...formik.getFieldProps("client_contact")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Client Company
                      <AddBoxRoundedIcon
                      onClick={() => {
                      setCompanyModal(true);
                      }}
                      /> 
                      </label>
                      <Input
                      type="select"
                      name="company"
                      // onChange={internshipInputHandler}
                      // onChange={projectInputHandler}
                      {...formik.getFieldProps("company")}
                      >
                      {/* <option selected disabled></option> */}
                      {companys.map((company) => {
                        return detail.company === company.id ? (
                            <option value={company.id} selected>
                              {company.name}
                            </option>
                        ):(
                          <option value={company.id}>
                            {company.name}
                          </option>
                        );
                      })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4" className="pr-1 ">
                    <FormGroup>
                      <Label for="">Frontend
                      <AddBoxRoundedIcon
                       onClick={() => {
                       setFrontendModal(true);
                       }}
                      />
                      </Label>
                      <Input
                      type="select"
                      name="frontend"
                      // onChange={internshipInputHandler}
                      {...formik.getFieldProps("frontend")}
                      >
                      {frontends.map((frontend) => {
                        return detail.frontend === frontend.id ? (
                            <option value={frontend.id} selected>
                              {frontend.name}
                            </option>
                        ):(
                          <option value={frontend.id}>
                            {frontend.name}
                          </option>
                        );
                      })}
                    </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4" className="pr-1 pl-1">
                    <FormGroup>
                      <Label for="">Backend
                      <AddBoxRoundedIcon onClick={() => setBackendModal(true)} />
                      </Label>
                      <Input
                      type="select"
                      name="backend"
                      {...formik.getFieldProps("backend")}
                      >
                      {backends.map((backend) => {
                        return detail.backend === backend.id ? (
                            <option value={backend.id} selected>
                              {backend.name}
                            </option>
                        ):(
                          <option value={backend.id}>
                            {backend.name}
                          </option>
                        );
                      })}
                    </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4" className="pr-1 pl-1">
                    <FormGroup>
                      <Label for="">Status</Label>
                      <Input
                        type="select"
                        name="status"
                      {...formik.getFieldProps("status")}
                      >
                         { detail.status == 0 ? (
                          <option value={0} selected>
                              {"Ongoing"}
                          </option>

                         ):(
                          <option value={1} selected>
                              {"Completed"}
                            </option>
                          )
                          }
                         { detail.status == 0 ? (
                          <option value={1}>
                              {"Completed"}
                          </option>

                         ):(
                          <option value={0}>
                              {"Ongoing"}
                            </option>
                          )
                          }
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4" className="pr-1 ">
                    <FormGroup>
                      <Label for="">Cost</Label>
                      <Input
                        type="number"
                        name="cost"
                        {...formik.getFieldProps("cost")}
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Concession</label>
                      <Input
                        defaultValue=""
                        placeholder="Concession"
                        type="number"
                        {...formik.getFieldProps("concession")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Is Paid</label>
                      <Input
                        defaultValue=""
                        placeholder=""
                        type="text"
                        value={detail.is_paid ? "Paid" : "Pending"}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Update Project
                    </Button>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AIDetailView;
