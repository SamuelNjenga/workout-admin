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
  CModal,
  CModalHeader,
  CModalBody,
  CLabel,
  CInput,
  CModalFooter,
} from "@coreui/react";
import toast, { Toaster } from "react-hot-toast";

import { useUsers } from "src/contexts/UserContext";
import { postUserRegistration } from "src/services/APIUtils";
import Charts from "./Charts";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const successNotification = () =>
  toast.success("User has been registered successfully.");
const errorNotification = (error) => toast.error(`${error}`);

const Users = () => {
  const history = useHistory();
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);

  const [item, setItem] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    gender: "",
    roleId: "",
  });
  const { users, isLoading, count, page, setPage } = useUsers();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  //const [page, setPage] = useState(currentPage)

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  const toggleOne = () => {
    setModalOne(!modalOne);
  };

  const toggleTwo = () => {
    setModalTwo(!modalTwo);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [page]);

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
      await postUserRegistration(item1);
      //setSubmitting(false)
      successNotification();
    } catch (err) {
      errorNotification(err.response.data.message);
      //setSubmitting(false)
    }
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <Toaster />
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CDataTable
              items={users}
              fields={[
                { key: "id", _classes: "font-weight-bold" },
                { key: "firstName", _classes: "font-weight-bold" },
                "lastName",
                "email",
                { key: "roleId", _classes: "font-weight-bold" },
              ]}
              hover
              striped
              sorter
              pagination
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                phoneNumber: (item) => (
                  <td>
                    <CBadge color={getBadge("Active")}>
                      {item.phoneNumber}
                    </CBadge>
                  </td>
                ),
              }}
            />
            {/* <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={5}
              doubleArrows={false}
              align='center'
            /> */}
          </CCardBody>
        </CCard>
        <CButton
          onClick={toggleOne}
          className="mr-2"
          color="primary"
          shape="rounded-pill"
        >
          Register User
        </CButton>
        <CButton onClick={toggleTwo} color="secondary" shape="rounded-pill">
          View User Visuals
        </CButton>
        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Register the user</CModalHeader>
          <form onSubmit={handleSubmitOne}>
            <CModalBody>
              <CLabel htmlFor="firstName">First Name</CLabel>
              <CInput
                id="firstName"
                placeholder="Enter the first Name"
                required
                name="firstName"
                onChange={handleChangeOne}
                value={item.firstName}
              />
              <CLabel htmlFor="lastName">Last Name</CLabel>
              <CInput
                id="lastName"
                placeholder="Enter the last Name"
                required
                name="lastName"
                onChange={handleChangeOne}
                value={item.lastName}
              />
              <CLabel htmlFor="email">Email</CLabel>
              <CInput
                id="email"
                placeholder="Enter the email address"
                required
                name="email"
                onChange={handleChangeOne}
                value={item.email}
              />
              <CLabel htmlFor="phoneNumber">Phone Number</CLabel>
              <CInput
                id="phoneNumber"
                placeholder="Enter the phoneNumber"
                required
                name="phoneNumber"
                onChange={handleChangeOne}
                value={item.phoneNumber}
              />
              <CLabel htmlFor="password">Password</CLabel>
              <CInput
                id="password"
                placeholder="Enter the password"
                required
                name="password"
                onChange={handleChangeOne}
                value={item.password}
              />
              <CLabel htmlFor="gender">Gender</CLabel>
              <CInput
                id="gender"
                placeholder="Enter the gender"
                required
                name="gender"
                onChange={handleChangeOne}
                value={item.gender}
              />
              <CLabel htmlFor="roleId">Role Id</CLabel>
              <CInput
                id="roleId"
                placeholder="Enter the role Id"
                required
                name="roleId"
                onChange={handleChangeOne}
                value={item.roleId}
              />
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">
                Confirm
              </CButton>{" "}
              <CButton color="secondary" onClick={toggleOne}>
                Close
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

export default Users;
