import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const SuccessPage = () => {
  const { state } = useLocation();
  const recieved = JSON.stringify(state?.data);
  const info = JSON.parse(recieved);
  const { id, fullname, email, phone, event } = info;

  return (
    <StyledBox>
      <div>
        <h1>Successfully Submitted</h1>
        <TextStyle>Thank you for registering!</TextStyle>
        <ListContainer>
          <ListItem>
            <span>Unique Registration ID:</span>
            <span>{id}</span>
          </ListItem>
          <ListItem>
            <span>Full Name:</span>
            <span>{fullname}</span>
          </ListItem>
          <ListItem>
            <span>Email:</span>
            <span>{email}</span>
          </ListItem>
          <ListItem>
            <span>Phone no:</span>
            <span>{phone}</span>
          </ListItem>
          <ListItem>
            <span>Scheduled Event:</span>
            <span>{event}</span>
          </ListItem>
        </ListContainer>
      </div>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  width: 50%;
  text-align: center;
  margin: 5% auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px green;
`;
const TextStyle = styled.div`

  background-color: lightseagreen;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
  color: #fff;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
`;
const ListContainer = styled.ul`
  /* display: flex; */
  width: 60%;
  justify-content: center;
  margin: 0px auto;
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  /* width: 50%; */
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  padding: 10px 10px;
`;

export default SuccessPage;
