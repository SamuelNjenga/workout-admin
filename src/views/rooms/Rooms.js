import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CModalFooter,
  CLabel,
  CInput,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";

import { useRooms } from "../../contexts/RoomContext";
import { postRoom } from "src/services/APIUtils";

import Charts from "./Charts";
import "./Charts.css";

const getBadge = (status) => {
  switch (status) {
    case status <= new Date():
      return "success";
    case "1":
      return "secondary";
    case "13":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const getStatus = (status) => {
  if (status < new Date()) {
    console.log("Status A", status);
    return "inactive";
  } else if (status >= new Date()) {
    console.log("Status B", status);
    return "active";
  } else {
    console.log("Status C", status);
    return "being processed";
  }
};

const Rooms = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const [item, setItem] = useState({
    memberId: "",
    amount: "",
    from: "",
    to: "",
  });
  const history = useHistory();
  const { rooms, isLoading, count, page, setPage } = useRooms();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  //const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/rooms?page=${newPage}`);
  };

  const toggleOne = () => {
    setModalOne(!modalOne);
  };

  const toggleTwo = () => {
    setModalTwo(!modalTwo);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const handleChangeOne = (event) => {
    const target = event.target;
    const value = target.value;
    setItem({ ...item, [event.target.name]: value });
  };

  const handleSubmitOne = async (event) => {
    event.preventDefault();
    //setSubmitting(true)
    const item1 = { ...item };
    try {
      await postRoom(item1);
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };
  return (
    <CRow>
      <CCol xl={8}>
        <CCard>
          <CCardHeader>Rooms List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={rooms}
              fields={[
                { key: "id", _classes: "font-weight-bold", label: "Room ID" },
                { key: "label", label: "Room Name" },
                { key: "size", label: "Room Size" },
                { key: "available", label: "Is Available" },
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/rooms/${item.id}`)}
              scopedSlots={{
                size: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.size} square metres
                    </CBadge>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
        <CButton
          onClick={toggleOne}
          className="mr-2"
          color="primary"
          shape="rounded-pill"
        >
          Register Room
        </CButton>
        <CButton onClick={toggleTwo} color="secondary" shape="rounded-pill">
          View Room Visuals
        </CButton>
        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Register Room</CModalHeader>
          <form onSubmit={handleSubmitOne}>
            <CModalBody>
              <CLabel htmlFor="label">Room Label</CLabel>
              <CInput
                id="label"
                placeholder="Enter the Room Label"
                required
                name="label"
                onChange={handleChangeOne}
                value={item.label}
              />
              <CLabel htmlFor="size">Room Size</CLabel>
              <CInput
                id="size"
                placeholder="Enter the room size"
                required
                name="size"
                onChange={handleChangeOne}
                value={item.size}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">
                Confirm
              </CButton>{" "}
              <CButton color="secondary" onClick={toggleOne}>
                Cancel
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
        <CModal show={modalTwo} onClose={toggleTwo}>
          <CModalHeader closeButton className="btn__modal--text">
            Rooms Size Line Chart
          </CModalHeader>
          <CModalBody>
            <Charts />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={toggleTwo}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  );
};

export default Rooms;
