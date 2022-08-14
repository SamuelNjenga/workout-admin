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

import { useServiceTypes } from "../../contexts/ServiceTypeContext";
import { postServiceType } from "src/services/APIUtils";

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

const ServiceTypes = () => {
  const [modalOne, setModalOne] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
  });

  const history = useHistory();
  const { serviceTypes, isLoading, count, page, setPage } = useServiceTypes();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  //const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/serviceTypes?page=${newPage}`);
  };

  const toggleOne = () => {
    setModalOne(!modalOne);
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
      await postServiceType(item1);
      //setSubmitting(false)
      //notify()
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardHeader className="list__title">Service Types List</CCardHeader>
          <CCardBody>
            <CDataTable
              items={serviceTypes}
              fields={[
                {
                  key: "id",
                  _classes: "font-weight-bold",
                  label: "Service ID",
                },
                { key: "name", label: "Service Name" },
                { key: "description", label: "Service Description" },
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/serviceTypes/${item.id}`)}
              scopedSlots={{
                name: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.name}</CBadge>
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
          Register Service Type
        </CButton>

        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Register Service Type</CModalHeader>
          <form onSubmit={handleSubmit}>
            <CModalBody>
              <CLabel htmlFor="name">Service Name</CLabel>
              <CInput
                id="name"
                placeholder="Enter the Service Name"
                required
                name="name"
                onChange={handleChange}
                value={item.name}
              />
              <CLabel htmlFor="description">Service Description</CLabel>
              <CInput
                id="description"
                placeholder="Enter the Service Description"
                required
                name="description"
                onChange={handleChange}
                value={item.description}
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
      </CCol>
    </CRow>
  );
};

export default ServiceTypes;
