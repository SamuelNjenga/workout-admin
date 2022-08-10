import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";

import React, { useState } from "react";

import "./Charts.css";
import MemberPaymentsLineChart from "./MemberPaymentsLineChart";

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
        View Member Payments Line Chart
      </CButton>
      <CModal show={modalOne} onClose={toggleOne} size="lg">
        <CModalHeader closeButton className="btn__modal--text">
          Member Payments Line Chart
        </CModalHeader>
        <CModalBody>
          <MemberPaymentsLineChart />
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
