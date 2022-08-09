import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

import React, { useState } from "react";

import RoomsLineChart from "./RoomsLineChart";

import "./Charts.css";
import RoomsBarChart from "./RoomsBarChart";

const Charts = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const toggleOne = () => {
    setModalOne(!modalOne);
  };

  const toggleTwo = () => {
    setModalTwo(!modalTwo);
  };

  return (
    <div>
      <CButton
        onClick={toggleOne}
        color="secondary"
        shape="rounded-pill"
        className="me-md-2 modal__item"
      >
        View Room Size Line Chart
      </CButton>
      <CButton
        onClick={toggleTwo}
        color="secondary"
        shape="rounded-pill"
        className="modal__item"
      >
        View Room Size Bar Chart
      </CButton>
      <CModal show={modalOne} onClose={toggleOne} size="lg">
        <CModalHeader closeButton>Rooms Size Line Chart</CModalHeader>
        <CModalBody>
          <RoomsLineChart />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleOne}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal show={modalTwo} onClose={toggleTwo} size="lg">
        <CModalHeader closeButton>Rooms Size Bar Chart</CModalHeader>
        <CModalBody>
          <RoomsBarChart />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleTwo}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Charts;
