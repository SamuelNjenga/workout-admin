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
  CModalBody,
  CModalHeader,
  CModal,
} from "@coreui/react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

import { useEquipments } from "../../contexts/EquipmentContext";
import {
  postEquipment,
  diactivateEquipmentData,
  activateEquipmentData,
} from "src/services/APIUtils";

import "src/styles/Headers.css";

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

const successNotification = () =>
  toast.success("Equipment registered successfully.");
const diactivateNotification = (equipmentId) =>
  toast.success(`Equipment ${equipmentId} has been diactivated successfully.`);
const activateNotification = (equipmentId) =>
  toast.success(`Equipment ${equipmentId} has been activated successfully.`);

const Equipments = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [modalThree, setModalThree] = useState(false);
  const [equipmentId, setEquipmentId] = useState(null);
  const [item, setItem] = useState({
    title: "",
    picture: "",
  });

  const history = useHistory();
  const { equipments, isLoading, count, page, setPage } = useEquipments();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  //const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/equipments?page=${newPage}`);
  };

  const toggleOne = () => {
    setModalOne(!modalOne);
  };

  const toggleTwo = () => {
    setModalTwo(!modalTwo);
  };

  const toggleThree = () => {
    setModalThree(!modalThree);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    setItem({ ...item, [event.target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setSubmitting(true)
    const item1 = { ...item };
    try {
      await postEquipment(item1);
      //setSubmitting(false)
      //notify()
      successNotification();
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };

  const handleChangeTwo = (event) => {
    event.persist();
    const target = event.target;
    const value = target.value;
    setEquipmentId(value);
  };

  const handleSubmitTwo = async (event) => {
    event.preventDefault();
    //setSubmitting(true)
    try {
      await diactivateEquipmentData({ equipmentId });
      //setSubmitting(false)
      diactivateNotification(equipmentId);
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };

  const handleChangeThree = (event) => {
    event.persist();
    const target = event.target;
    const value = target.value;
    setEquipmentId(value);
  };

  const handleSubmitThree = async (event) => {
    event.preventDefault();
    //setSubmitting(true)
    try {
      await activateEquipmentData({ equipmentId });
      //setSubmitting(false)
      activateNotification(equipmentId);
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader className="list__title">Equipment List</CCardHeader>
          <CCardBody>
            <Toaster />
            <CDataTable
              items={equipments}
              fields={[
                {
                  key: "id",
                  _classes: "font-weight-bold",
                  label: "ID",
                },
                { key: "title", label: "Equipment Title" },
                { key: "available", label: "Is Available" },
                { key: "picture", label: "Equipment Picture" },
                { key: "createdAt", label: "Registration Date" },
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/equipments/${item.id}`)}
              scopedSlots={{
                title: (item) => (
                  <td>
                    <CBadge color={getBadge(item.title)}>{item.title}</CBadge>
                  </td>
                ),
                createdAt: (item) => (
                  <td>
                    <CBadge color="secondary">
                      {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
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
        <CButton onClick={toggleOne} className="mr-1" color="primary">
          Register Equipment
        </CButton>
        <CButton onClick={toggleTwo} className="mr-1" color="secondary">
          Diactivate Equipment
        </CButton>
        <CButton
          onClick={toggleThree}
          className="mr-1"
          color="primary"
          variant="outline"
        >
          Activate Equipment
        </CButton>
        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Register Equipment</CModalHeader>
          <form onSubmit={handleSubmit}>
            <CModalBody>
              <CLabel htmlFor="name">Equipment Title</CLabel>
              <CInput
                id="title"
                placeholder="Enter the Equipment Title"
                required
                name="title"
                onChange={handleChange}
                value={item.title}
              />
              <CLabel htmlFor="picture">Equipment Picture</CLabel>
              <CInput
                id="picture"
                placeholder="Enter the picture string"
                required
                name="picture"
                onChange={handleChange}
                value={item.picture}
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
          <CModalHeader closeButton>Diactivate</CModalHeader>
          <form onSubmit={handleSubmitTwo}>
            <CModalBody>
              <CLabel htmlFor="id">Equipment ID</CLabel>
              <CInput
                id="id"
                placeholder="Enter the equipment ID"
                required
                name="id"
                onChange={handleChangeTwo}
                value={equipmentId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">
                Confirm
              </CButton>{" "}
              <CButton color="secondary" onClick={toggleTwo}>
                Cancel
              </CButton>
            </CModalFooter>
          </form>
        </CModal>

        <CModal show={modalThree} onClose={toggleThree}>
          <CModalHeader closeButton>Diactivate</CModalHeader>
          <form onSubmit={handleSubmitThree}>
            <CModalBody>
              <CLabel htmlFor="id">Equipment ID</CLabel>
              <CInput
                id="id"
                placeholder="Enter the equipment ID"
                required
                name="id"
                onChange={handleChangeThree}
                value={equipmentId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">
                Confirm
              </CButton>{" "}
              <CButton color="secondary" onClick={toggleThree}>
                Cancel
              </CButton>
            </CModalFooter>
          </form>
        </CModal>
      </CCol>
    </CRow>
  );
};

export default Equipments;
