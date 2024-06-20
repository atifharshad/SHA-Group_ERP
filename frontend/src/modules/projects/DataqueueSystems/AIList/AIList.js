import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../../axios";

import "./AIList.css";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form
} from "reactstrap";

const AIList = () => {
  const history = useHistory();

  const [list, setList] = useState([]);
  const [frontends, setFrontends] = useState([]);
  const [backends, setBackends] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const fetchData = () => {
    const url = "projects/dataqueue_systems/client_projects/projects/";
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      },
    };
    axios
    .get("administration/cognitive_solutions/programs/frontends/", headers)
    .then((res) => {
      console.log(res.data);
      const frontend = []
      for(const key in res.data){
        frontend[res.data[key].id] = res.data[key].name 
      }
      setFrontends(frontend);
    })
    .catch((err) => {
      console.log(err);
    });

    axios
    .get("administration/cognitive_solutions/programs/backends/", headers)
    .then((res) => {
      console.log(res.data);
      const backend = []
      for(const key in res.data){
        backend[res.data[key].id] = res.data[key].name 
      }
      setBackends(backend);
    })
    .catch((err) => {
      console.log(err);
    });



  

    axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
   
      // const url = ""
      // axios
      // .get(url, headers)
      // .then((res) => {
      //   console.log(res.data);
      //   setList(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      // }); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchInputHandler = (event) => {
    setSearchItem(event.target.value);
  }

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const url = `projects/dataqueue_systems/client_projects/projects/?search=${searchItem}`;
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: ` Token ${token}`,
      }
    }
     
      axios
      .get(url, headers)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      }); 

  }

  return (
    <>
      <div className="cognitiveList" >
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="table__header">
                <CardTitle tag="h4">Projects</CardTitle>
                <Form onSubmit={searchSubmitHandler} >
              <InputGroup className="no-border search">
                <Input  placeholder="Search..." onChange={searchInputHandler} />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              </Form>
                <Button
                  onClick={() => {
                    history.push("/projects/dataqueueSystems/airegister");
                  }}
                >
                  Add New <i class="fa fa-plus-circle" aria-hidden="true"></i>
                </Button>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>PROJECT NO</th>
                      <th>TITLE</th>
                      <th>NAME</th>
                      <th>CONTACT</th>
                      <th>EMAIL</th>
                      <th>FRONTEND</th>
                      <th>BACKEND</th>
                      <th>STATUS</th>
                      <th>PAID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((listItem) => { 
                      return (
                        <tr
                          className="tableRow"
                          onClick={() => {
                            history.push(`client_projects/${listItem.id}`);
                          }}
                        >
                          {/* <td><img src={listItem.title} height="100px" width="100px"/></td> */}
                          <td>{listItem.project_no}</td>
                          <td>{listItem.title}</td>
                          <td>{listItem.client_name}</td>
                          <td>{listItem.client_contact}</td>
                          <td>{listItem.client_email}</td>
                          <td>{frontends[listItem.frontend]}</td>
                          {/* <td>{frontends.map(frontend => {
                            if(frontend.id == listItem.frontend) {
                              console.log(frontend)
                              return frontend.name;
                            }
                          })}</td> */}
                          <td>{backends[listItem.backend]}</td>
                          {/* <td>{backends.map(backend => {
                            if(backend.id == listItem.backend) {
                              return backend.name;
                            }
                          })}</td> */}
                          <td>{listItem.status == 0 ? 'Ongoing' : 'Completed'}</td>
                          <td>{listItem.is_paid ? 'Paid' : 'Pending'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> 
      </div>
    </>
  );
};

export default AIList;
