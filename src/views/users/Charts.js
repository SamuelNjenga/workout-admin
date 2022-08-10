import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

import React, { useState } from "react";

import UsersBarChart from "./UsersBarChart";

import "./Charts.css";

const Charts = () => {
  const [modalOne, setModalOne] = useState(false);

  const toggleOne = () => {
    setModalOne(!modalOne);
  };

  return (
    <div>
      <CButton
        onClick={toggleOne}
        color="secondary"
        shape="rounded-pill"
        className="modal__item"
      >
        View User Categories Bar Chart
      </CButton>
      <CModal show={modalOne} onClose={toggleOne} size="lg">
        <CModalHeader closeButton className="btn__modal--text">
          User Categories Bar Chart
        </CModalHeader>
        <CModalBody>
          <UsersBarChart />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleOne}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Charts;
