import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../axios";
import setAuthorizationToken from "../../Authorization";
import { Card } from "reactstrap";
import Modal from '../Modal/Modal';
import { useHistory } from "react-router-dom";

import "./Login.css";
// import AuthContext from "Context/AuthContext";
// import { TrainRounded } from "@material-ui/icons";

const Login = (path) => {
  const history = useHistory();
  const [response, setResponse] = useState("");
  const [main, setMain] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [unauthorized, setunauthorized] = useState(path.unauthorized);
  // const {token, setToken} = useContext(AuthContext);
      let department = path.path.substring(1)
      console.log(path)
      React.useEffect(()=>{
        if (unauthorized) {  
          setResponse("You don't have permission to view " + department + " department.");
          setMain("Unauthorized")
          setModalOpen(true);
        }
     }, [unauthorized])
        // if (unauthorized) {  
        //   setResponse("You don't have permission to view " + department + " department.");
        //   setMain("Unauthorized")
        //   setModalOpen(true);
        // }
      // if (localStorage.getItem("token") !== null) {
      //     setModalOpen(true);
      //     setResponse("You don't have permission to view " + department + " department.");
      //     setMain("Unauthorized")
      // }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(5, "Must be atleast 5 characters or more")
        .max(25, "Must be 25 characters or less")
        .required("Required"),
      //   email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      // history.push(path)
      // alert(JSON.stringify(values, null, 2));
      // const url = 'https://jsonplaceholder.typicode.com/posts';
      // localStorage.setItem("token", "12323dffrfrfrfrffr");
      // history.push(path) 
      
      

      const url = "rest-auth/login/";
      const data = {
        email: values.email,
        password: values.password,
        // email: "rizabhai@gmail.com"
      };
      // console.log(data);
      // const url = 'http://cf9870fa820c.ngrok.io/company/register.php';
      axios
        .post(url, data )
        .then((res) => {
          console.log(res.data);
          const token = res.data.key;
          // setToken(token);
          localStorage.setItem("token", token);
          setAuthorizationToken(token);
          console.log(token);
          const headers = {
            headers: {
              Authorization: ` Token ${token}`,
            },
          };
      axios
        .get("rest-auth/user/", headers)
        .then((res) => {
          localStorage.setItem('userDepartment', res.data.department.toLowerCase())
          if (res.data.is_superuser){
              localStorage.setItem('su', true)
              history.go() 
          }
          else if (department.includes(res.data.department.toLowerCase()) ) {
              history.go() 
          } else {
          // setAuthorizationToken(null);
          // localStorage.removeItem("token");
          setModalOpen(true);
          setResponse("You don't have permission to view " + department + " department.");
          setMain("Unauthorized")
          }
        })
        })
        .catch((err) => {
          // console.log(err)
          setModalOpen(true);
          setResponse("Incorrect username or password.");
          setMain("Login Failed.")
        });
    },
  });
  return (
    <div className="login">
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} button header= {main} children = {response} />
      <form className="login__form" onSubmit={formik.handleSubmit}>
        <div className="login__header">
          <h4>SHA GROUP</h4>
        </div>
        <hr style={{ backgroundColor: "white" }} />
        <label className="label" htmlFor="email">
          <b>Email</b>
        </label>
        <input
          className="input"
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}

        <label className="label" htmlFor="password">
          <b>Password</b>
        </label>
        <input
          className="input"
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button class="button" type="submit">
          <b>Submit</b>
        </button>
      </form>
    </div>
  );
};

export default Login;
