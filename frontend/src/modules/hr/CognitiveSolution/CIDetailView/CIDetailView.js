import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../../axios";
import Modal from "../../../../components/Modal/Modal";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";

import "./CIDetailView.css";

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
} from "reactstrap";

const CIDetailView = (props) => {
  const [detail, setDetail] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [frontends, setFrontends] = useState([]);
  const [backends, setBackends] = useState([]);
  const [courses, setCourses] = useState([]);
  const [frontendModal, setFrontendModal] = useState(false);
  const [backendModal, setBackendModal] = useState(false);
  const [collegeModal, setCollegeModal] = useState(false);
  const [internshipModal, setInternshipModal] = useState(false);
  const [batchModal, setBatchModal] = useState(false);
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [college, setCollege] = useState({ name: "", place: "" });
  const [internship, setInternship] = useState({});
  const [internships, setInternships] = useState([]);
  const [batches, setBatches] = useState([]);
  const [batch, setBatch] = useState({});
  const [selectedInternship, setSelectedInternship] = useState({});
  const [errorResponse, setErrorResponse] = useState({});
  const [errorResponseModal, setErrorResponseModal] = useState(false);
  const [successResponse, setSuccessResponse] = useState();
  const [successResponseModal, setSuccessResponseModal] = useState(false);
  const [paidFees, setPaidFees] = useState();

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
      .get("administration/cognitive_solutions/programs/batches/", headers)
      .then((res) => {
        console.log(res.data);
        setBatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/internships/", headers)
      .then((res) => {
        console.log(res.data);
        setInternships(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("administration/cognitive_solutions/programs/colleges/", headers)
      .then((res) => {
        console.log(res.data);
        setColleges(res.data);
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
      .get("administration/cognitive_solutions/programs/courses/", headers)
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `administration/cognitive_solutions/programs/cognitive_internships/${id}`,
        headers
      )
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        axios
      .get(`accounts/all/fees/cognitive_internship_fees/?received_from=${res.data.id}`, headers)
      .then((res) => {
        console.log('fee receipts', res.data);
        // setBatches(res.data);
        const feesPaid = res.data.reduce((sum, obj) => {
          return sum + obj.amount;
        }, 0);
        setPaidFees(feesPaid);
      })
      .catch((err) => {
        console.log(err);
      });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    batches.map((batch) => {
      // alert(JSON.stringify(batch.internship));
    if (batch.id == detail.batch) {
      internships.map(internship => 
        internship.id == batch.internship && setSelectedInternship(internship)  )
    }
  });
}, [detail, batches]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: detail.id,
      register_no: detail.register_no,
      date_of_admission: detail.date_of_admission,
      no_of_months: detail.no_of_months,
      name: detail.name,
      address: detail.address,
      contact_1: detail.contact_1,
      contact_2: detail.contact_2,
      email: detail.email,
      guardian_name: detail.guardian_name,
      guardian_contact: detail.guardian_contact,
      college: detail.college,
      college_place: detail.college_place,
      previous_course: detail.previous_course,
      start_date: detail.start_date,
      end_date: detail.end_date,
      from_time: detail.from_time,
      to_time: detail.to_time,
      frontend: detail.frontend,
      backend: detail.backend,
      actual_fees: detail.actual_fees,
      concession: detail.concession,
      internship: detail.internship,
      batch: detail.batch,
      profile_pic: null,
      // profile_pic: detail.profile_pic
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
      const url =
        `administration/cognitive_solutions/programs/cognitive_internships/${id}/`;
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      var imagefile = document.querySelector('#file');
      if (imagefile.files[0]) {
      formData.set("profile_pic", imagefile.files[0]);
      alert(formData.get('profile_pic'))
      }
      else {
      formData.delete('profile_pic')
      }
      

      axios
        .put(url,formData, headers)
        .then((res) => {
          console.log(res.data);
          setSuccessResponse('Form Submitted Successfully')
          setSuccessResponseModal(true);
          // Re fetch the updated data
          fetchData();
          // setResponse(res.data);
          // setModalOpen(true);
          // resetForm({ values: "" });
        })
        .catch((err) => {
          console.log(err);
          setErrorResponse(err.response.data);
          setErrorResponseModal(true)
          //   setResponse(err)
        });
    },
  });

  const internshipSubmitHandler = (event) => {
    event.preventDefault();
      const token= localStorage.getItem('token')
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = internship
      axios
      .post("administration/cognitive_solutions/programs/internships/",data , headers)
      .then((res) => {
        console.log(res.data);
        internships.push(res.data)
        setInternshipModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const internshipInputHandler = (event) => {
    setInternship({
      ...internship,
      [event.target.name]: 
      event.target.value
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

  const collegeSubmitHandler = (event) => {
    event.preventDefault();
    alert("college " + JSON.stringify(college));
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    const data = college;
    axios
      .post(
        "administration/cognitive_solutions/programs/colleges/",
        data,
        headers
      )
      .then((res) => {
        console.log(res.data);
        colleges.push(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const collegeInputHandler = (event) => {
    setCollege({
      ...college,
      [event.target.name]: event.target.value,
    });
  };

  const internshipChangeHandler = (event) => {
    internships.map(internship => {
      if (internship.id == event.target.value) {
        setSelectedInternship(internship)
      }
    })
  }

  const batchSubmitHandler = (event) => {
    event.preventDefault();
      const token= localStorage.getItem('token')
      const headers = {
        headers: {
          Authorization: ` Token ${token}`,
        },
      };
      const data = batch
      axios
      .post("administration/cognitive_solutions/programs/batches/",data , headers)
      .then((res) => {
        console.log(res.data);
        batches.push(res.data)
        setBatchModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const batchInputHandler = (event) => {
    setBatch({
      ...batch,
      [event.target.name]: 
      event.target.value
    })
  };

  return (
    <div className="DetailView">
       <Modal
        modalOpen={successResponseModal}
        header="Success"
        setModalOpen={setSuccessResponseModal}
      >
        <center><strong>{successResponse}</strong></center>
        {/* {Object.keys(errorResponse).map(key => <div style={{color: 'red'}}>{key} : {errorResponse[key]}</div>)} */}
          {/* <Form onSubmit={frontendSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={frontendInputHandler} />
            </FormGroup>
            <Button type="submit">ADD</Button>
          </Form> */}
      </Modal>
      <Modal
        modalOpen={errorResponseModal}
        header="Error"
        setModalOpen={setErrorResponseModal}
      >
        {/* {response} */}
        {Object.keys(errorResponse).map(key => <div style={{color: 'red'}}><strong>{key} : {errorResponse[key]}</strong></div>)}
          {/* <Form onSubmit={frontendSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={frontendInputHandler} />
            </FormGroup>
            <Button type="submit">ADD</Button>
          </Form> */}
      </Modal>
      <Modal
        modalOpen={batchModal}
        header="Add Batch"
        setModalOpen={setBatchModal}
      >
          <Form onSubmit={batchSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={batchInputHandler} />
            </FormGroup>
            <FormGroup>
                      <Label>Internship Program 
                      <AddBoxRoundedIcon
                        onClick={() =>setInternshipModal(true)}
                      />
                      </Label>
                      <Input
                        type="select"
                        name = "internship"
                        onChange={batchInputHandler}
                        // {...formik.getFieldProps("internship")}
                        // onChange={(e) => {formik.handleChange(e); internshipChangeHandler(e)}}
                      >
                        <option selected></option>
                        {internships.map((internship) => {
                          return  (
                            <option value={internship.id}>
                              {internship.name} {frontends.map(frontend => frontend.id === internship.frontend ? frontend.name : null)} {backends.map(backend => backend.id === internship.backend ? backend.name : null)} {internship.actual_fees}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                    <FormGroup>
              <Label for="">Start Date</Label>
              <Input type="date" name="start_date" onChange={internshipInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">End Date</Label>
              <Input type="date" name="end_date" onChange={internshipInputHandler} />
            </FormGroup>        
            <FormGroup>
              <Label for="">From Time</Label>
              <Input type="time" name="from_time" onChange={batchInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">To Time</Label>
              <Input type="time" name="to_time" onChange={batchInputHandler} />
            </FormGroup>
            {/* <FormGroup>
                      <label>Front End      <AddBoxRoundedIcon
                        onClick={() => {
                          setFrontendModal(true);
                      }}
                      /></label>
                      <Input
                        type="select"
                        name="frontend"
                        // onChange={internshipInputHandler}
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {frontends.map((frontend) => <option value={frontend.id}>{frontend.name}</option>)}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label>Back End 
                      <AddBoxRoundedIcon
                        onClick={() =>setBackendModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        name="backend"
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {backends.map((backend) => <option value={backend.id}>{backend.name}</option>)}
                      </Input>
                    </FormGroup>
            <FormGroup>
              <Label for="">Actual Fees</Label>
              <Input type="number" name="actual_fees" onChange={internshipInputHandler} />
            </FormGroup> */}
            <Button type="submit">ADD</Button>
          </Form>
      </Modal>
            <Modal
        modalOpen={internshipModal}
        header="Add Internship"
        setModalOpen={setInternshipModal}
      >
          <Form onSubmit={internshipSubmitHandler}>
            <FormGroup>
              <Label for="">Name</Label>
              <Input type="text" name="name" onChange={internshipInputHandler} />
            </FormGroup>
            <FormGroup>
              <Label for="">No. of Months</Label>
              <Input type="number" name="no_of_months" onChange={internshipInputHandler} />
            </FormGroup>
            <FormGroup>
                      <label>Front End      <AddBoxRoundedIcon
                        onClick={() => {
                          setFrontendModal(true);
                      }}
                      /></label>
                      <Input
                        type="select"
                        name="frontend"
                        // onChange={internshipInputHandler}
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {frontends.map((frontend) => <option value={frontend.id}>{frontend.name}</option>)}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <label>Back End 
                      <AddBoxRoundedIcon
                        onClick={() =>setBackendModal(true)}
                      />
                      </label>
                      <Input
                        type="select"
                        name="backend"
                        onChange={internshipInputHandler}
                      >
                        <option selected disabled></option>
                        {backends.map((backend) => <option value={backend.id}>{backend.name}</option>)}
                      </Input>
                    </FormGroup>
            <FormGroup>
              <Label for="">Actual Fees</Label>
              <Input type="number" name="actual_fees" onChange={internshipInputHandler} />
            </FormGroup>
            <Button type="submit">ADD</Button>
          </Form>
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
      <Modal
        modalOpen={collegeModal}
        header="Add College"
        setModalOpen={setCollegeModal}
      >
        <Form onSubmit={collegeSubmitHandler}>
          <FormGroup>
            <Label for="">College Name</Label>
            <Input
              type="text"
              name="name"
              value={college.name}
              onChange={collegeInputHandler}
            />
            <Label for="">College Place</Label>
            <Input
              type="text"
              name="place"
              value={college.value}
              onChange={collegeInputHandler}
            />
          </FormGroup>
          <Button type="submit">ADD</Button>
        </Form>
      </Modal>
      <Row>
        <Col md="4">
          <Card className="card-user ">
            <div className="image">
              <img
                alt="..."
                src="https://blogs.sas.com/content/sastraining/files/2015/03/black_background.png"
                width="100%"
                height="50px"
              />
            </div>
            <CardBody>
              <div className="author">
                <a href={detail.profile_pic}>
                <img
                    alt="..."
                    className="avatar border-gray"
                    src={detail.profile_pic}
                    width="100%"
                    style={{ borderRadius: "100px", cursor: 'pointer', marginBottom: '20px' }}
                    height="200px"
                    width="200px"
                  />
                  <h5 className="title">{detail.name}</h5>
                </a>
                <p className="description" style={{ color: "black" }}>
                  Email: {detail.email}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Contact: {detail.contact_1}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Contact2: {detail.contact_2}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Total Fees: {detail.contact_2}
                </p>
                <p className="description" style={{ color: "black" }}>
                  Paid Fees: {paidFees}
                </p>
                {/* <p className="description" style={{ color: "black" }}>
                Internship Program: {internships.map(internship => internship.id === detail.internship ? internship.name : null)}
                </p> */}
              </div>
              {/* <p className="description text-center">
                "I like the way you work it <br />
                No diggity <br />I wanna bag it up"
              </p> */}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Profile Detail</CardTitle>
            </CardHeader>
            <CardBody>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Registration No</label>
                      <Input
                        defaultValue=""
                        disabled
                        placeholder="Register No."
                        type="text"
                        name="registerNo"
                        id="registerNo"
                        {...formik.getFieldProps("register_no")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="6">
                    <FormGroup>
                      <label>Date of Admission</label>
                      <Input
                        disabled
                        type="date"
                        {...formik.getFieldProps("date_of_admission")}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>No of Months</label>
                      <Input
                        placeholder="No of Months"
                        type="number"
                        {...formik.getFieldProps("no_of_months")}
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Student Name</label>
                      <Input
                        defaultValue={detail.name}
                        placeholder="Student Name"
                        type="text"
                        disabled
                        {...formik.getFieldProps("name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Email ID</label>
                      <Input
                        defaultValue=""
                        placeholder="Email ID"
                        type="email"
                        disabled
                        {...formik.getFieldProps("email")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Contact No.</label>
                      <Input
                        defaultValue=""
                        placeholder="Contact No."
                        type="number"
                        disabled
                        {...formik.getFieldProps("contact_1")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Contact No.2</label>
                      <Input
                        defaultValue=""
                        placeholder="Contact No.2"
                        type="number"
                        disabled
                        {...formik.getFieldProps("contact_2")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        defaultValue=""
                        placeholder="Address"
                        type="text"
                        disabled
                        {...formik.getFieldProps("address")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Guardian Name</label>
                      <Input
                        defaultValue=""
                        placeholder="Guardian Name"
                        type="text"
                        disabled
                        {...formik.getFieldProps("guardian_name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Guardian Contact</label>
                      <Input
                        defaultValue=""
                        placeholder="Guardian Contact"
                        type="number"
                        disabled
                        {...formik.getFieldProps("guardian_contact")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>College Name</label>
                      <Input
                        type="select"
                        disabled
                        {...formik.getFieldProps("college")}
                      >
                        {colleges.map((college) => (
                          <option>{college.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>College Place</label>
                      <Input
                        disabled
                        placeholder="College Place"
                        type="text"
                        {...formik.getFieldProps("college_place")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Previous Qualification</label>
                      <Input
                        type="select"
                        disabled
                        {...formik.getFieldProps("previous_course")}
                      >
                        {courses.map((course) => {
                          return detail.previous_course === course.id ? (
                            <option value={course.id} selected>
                              {course.name}
                            </option>
                          ) : (
                            <option value={course.id}>{course.name}</option>
                          );
                        })}
                      </Input>

                    </FormGroup>
                  </Col>

                </Row>
                {/* <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Start Date</label>
                      <Input
                        defaultValue=""
                        placeholder="Start Date"
                        type="date"
                        {...formik.getFieldProps("start_date")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>End Date</label>
                      <Input
                        defaultValue=""
                        placeholder="End Date"
                        type="date"
                        {...formik.getFieldProps("end_date")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>From</label>
                      <Input
                        defaultValue=""
                        placeholder="From Time"
                        type="time"
                        {...formik.getFieldProps("from_time")}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>To</label>
                      <Input
                        defaultValue=""
                        placeholder="To Time"
                        type="time"
                        {...formik.getFieldProps("to_time")}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Front End</label>
                      <AddBoxRoundedIcon
                        onClick={() => setFrontendModal(true)}
                      />
                      <Input
                        type="select"
                        name="frontend"
                        id="frontend"
                        {...formik.getFieldProps("frontend")}
                      >
                        {frontends.map((frontend) => (
                          <option value={frontend.id}>{frontend.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Back End</label>
                      <AddBoxRoundedIcon
                        onClick={() => setBackendModal(true)}
                      />
                      <Input
                        type="select"
                        name="backend"
                        id="backend"
                        {...formik.getFieldProps("backend")}
                      >
                        {backends.map((backend) => (
                          <option>{backend.name}</option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col md="5" className="pr-1">
                  <FormGroup>
                      <label>Internship Program 
                      </label>
                      <Input
                        type="select"
                        disabled
                        {...formik.getFieldProps("internship")}
                        onChange={(e) => {formik.handleChange(e); internshipChangeHandler(e)}}
                      >
                        {internships.map((internship) => {
                          return detail.internship === internship.id ? (
                           <option value={internship.id} selected>
                              {internship.name} 
                            </option>
                          ) : (
                            <option value={internship.id}>
                              {internship.name} 
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="5" className="pl-1 pr-1">
                  <FormGroup>
              <Label for="">Internship Name</Label>
              <Input type="text" value={selectedInternship.name} disabled />
            </FormGroup>

                  </Col>
                  <Col md="2" className="pl-1">
                            <FormGroup>
              <Label for="">Months</Label>
              <Input type="number" value={selectedInternship.no_of_months} disabled />
            </FormGroup>
            </Col>
                  
                </Row>
                <Row>
                  {/* <Col md="2" className="pr-1 ">
                            <FormGroup>
              <Label for="">Months</Label>
              <Input type="number" value={selectedInternship.no_of_months} disabled />
            </FormGroup>
            </Col> */}
            {/* <Col md="5" className="pl-1 pr-1 ">
            <FormGroup>
              <Label for="">Start Date</Label>
              <Input type="date" name="start_date" value={selectedInternship.start_date} disabled />
            </FormGroup>
            </Col>
            <Col md="5" className="pl-1 ">
            <FormGroup>
              <Label for="">End Date</Label>
              <Input type="date" name="end_date" value={selectedInternship.end_date} disabled />
            </FormGroup>
            </Col> */}
            </Row>
            <Row>
            <Col md="4" className="pr-1 ">
            <FormGroup>
              <Label for="">Frontend</Label>
              <Input type="text" disabled name="frontend" value={frontends.map(frontend => {
                if (frontend.id === selectedInternship.frontend ) {
                  return frontend.name;
                }
              })} disabled />
            </FormGroup>
            </Col>
            <Col md="4" className="pr-1 pl-1">
            <FormGroup>
              <Label for="">Backend</Label>
              <Input type="text" disabled name="backend" value={backends.map(backend => {
                if (backend.id == selectedInternship.backend) {
                  return backend.name
                }
              })} disabled />
            </FormGroup>
            </Col>
            <Col md="4" className="pl-1 ">
              <FormGroup>
              <Label for="">Actual Fees</Label>
              <Input type="number" disabled name="actual_fees" value={selectedInternship.actual_fees} disabled />
            </FormGroup>
            </Col>
            </Row>
                <Row>
                <Col className="pr-1" md="6">
                  <FormGroup>
                      <label>Batch
                      </label>
                      <Input
                        type="select"
                        disabled
                        {...formik.getFieldProps("batch")}
                      >
                        {batches.map((batch) =>  {
                          if (batch.internship === selectedInternship.id) { 
                          return detail.batch === batch.id ? (
                            <option value={batch.id} selected>
                              {batch.name} {batch.from_time} {batch.to_time}
                             </option>
                          ) : (
                            <option value={batch.id}>
                              {batch.name} {batch.from_time} {batch.to_time}
                            </option>
                          );
                          }
                        })}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Concession</label>
                      <Input
                        defaultValue=""
                        placeholder="Concession"
                        type="number"
                        disabled
                        {...formik.getFieldProps("concession")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CIDetailView;
