import "./App.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formdata, setformdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    event: "",
  });
  const navigate = useNavigate();

  const events = [
    { id: 1, name: "Friday , 2 P.M." },
    { id: 2, name: "Satuarday , 11 A.M." },
    { id: 3, name: "Satuarday , 5:30 P.M." },
    { id: 4, name: "Sunday , 12:00 P.M." },
    { id: 5, name: "Sunday , 4:00 P.M." },
  ];

  const [error, seterror] = useState({});

  const checkForm = () => {
    let validate = true;
    const { fullname, email, phone, event } = formdata;
    let formerrors = {};

    if (!fullname.trim()) {
      formerrors.fullname = "Full Name is required";
      validate = false;
    }
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !pattern.test(email)) {
      formerrors.email = "Email is Not correct";
      validate = false;
    }
    if (!phone.trim() || isNaN(phone) || phone.length < 10) {
      formerrors.phone = "Enter valid phone number";
      validate = false;
    }
    if (!event) {
      formerrors.event = "Select event";
      validate = false;
    }
    seterror(formerrors);
    return validate;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (checkForm()) {
      // alert("valid");
      console.log(formdata);
      const csrfCookie = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("csrftoken="));
      const csrfToken = csrfCookie ? csrfCookie.split("=")[1] : "";

      axios
        .post("http://localhost:8000/event/register/", formdata, {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        })
        .then((response) => {
          console.log("form data sended to the server", response.data);
          navigate("/success", { state: { data: response.data } });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <StyledForm onSubmit={submitForm} className="form">
      <h1>Event Registration Form</h1>
      <div className="formdata">
        <StyledLabel for="name">Full Name</StyledLabel>
        <StyledInput
          type="text"
          id="name"
          value={formdata.fullname}
          placeholder="Enter FullName"
          name="name"
          onChange={(e) =>
            setformdata({ ...formdata, fullname: e.target.value })
          }
        ></StyledInput>
        {error.fullname && <ErrorText>{error.fullname}</ErrorText>}
      </div>
      <div className="formdata">
        <StyledLabel for="email">Email</StyledLabel>
        <StyledInput
          type="email"
          id="email"
          value={formdata.email}
          placeholder="Enter email"
          name="email"
          onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
        ></StyledInput>
        {error.email && <ErrorText>{error.email}</ErrorText>}
      </div>
      <div className="formdata">
        <StyledLabel for="phoneno">phone</StyledLabel>
        <StyledInput
          type="text"
          id="phoneno"
          maxlength="10"
          value={formdata.phone}
          placeholder="Enter Mobile no."
          name="phone"
          onChange={(e) => setformdata({ ...formdata, phone: e.target.value })}
        ></StyledInput>
        {error.phone && <ErrorText>{error.phone}</ErrorText>}
      </div>
      <div className="formdata">
        <StyledLabel htmlFor="event">Select Event:</StyledLabel>
        <StyledSelect
          id="event"
          name="selectedEvent"
          value={formdata.event}
          onChange={(e) => {
            setformdata({ ...formdata, event: e.target.value });
          }}
        >
          <option value="">Select an event</option>
          {events.map((event) => (
            <option key={event.id} value={event.name}>
              {event.name}
            </option>
          ))}
        </StyledSelect>
        {error.event && <ErrorText>{error.event}</ErrorText>}
      </div>

      <StyledButton type="submit">Register</StyledButton>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 300px;
  margin: 5% auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid darkblue;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 15px;
  margin: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

export default Registration;
