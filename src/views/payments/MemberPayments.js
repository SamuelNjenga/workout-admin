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
  CModal,
  CModalHeader,
  CModalBody,
  CLabel,
  CInput,
} from "@coreui/react";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import toast, { Toaster } from "react-hot-toast";

import { usePayments } from "../../contexts/PaymentContext";
import { postPayment, getSearchedMemberPayments } from "src/services/APIUtils";
import Charts from "./Charts";

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
  toast.success("Member Payment has been registered successfully.");

const MemberPayments = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [modalThree, setModalThree] = useState(false);
  const [item, setItem] = useState({
    memberId: "",
    amount: "",
  });

  const [search, setSearch] = useState({
    memberId: "",
  });

  const fields = [
    { key: "id", _style: { width: "40%" } },
    { key: "memberId", _style: { width: "20%" } },
    { key: "amount", _style: { width: "20%" } },
    // {
    //   key: 'amount',
    //   label: '',
    //   _style: { width: '1%' },
    //   sorter: false,
    //   filter: false
    // }
  ];

  const history = useHistory();
  const [searchedPayments, setSearchedPayments] = useState([]);
  const [fromATime, onChangeFromATime] = useState(new Date());
  const [toATime, onChangeToATime] = useState(new Date());
  const [fromBTime, onChangeFromBTime] = useState(new Date());
  const [toBTime, onChangeToBTime] = useState(new Date());

  const { payments, isLoading, count, page, setPage } = usePayments();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  //const [page, setPage] = useState(currentPage)

  // const fetchMemberPayments = async () => {
  //   const response = await getSearchedMemberPayments({
  //     memberId: search.memberId,
  //     fromTime: search.from,
  //     toTime: search.to
  //   })
  //   setSearchedPayments(response.data)
  // }

  // useEffect(() => {
  //   fetchMemberPayments()
  // }, [])

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/memberPayments?page=${newPage}`);
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

  const handleChangeOne = (event) => {
    const target = event.target;
    const value = target.value;
    setItem({ ...item, [event.target.name]: value });
  };

  const handleSubmitOne = async (event) => {
    event.preventDefault();
    //setSubmitting(true)
    // const item1 = { ...item }
    try {
      await postPayment({
        from: fromBTime,
        amount: item.amount,
        to: toBTime,
        memberId: item.memberId,
      });
      //setSubmitting(false)
      successNotification();
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };

  const handleChangeTwo = (event) => {
    const target = event.target;
    const value = target.value;
    setSearch({ ...search, [event.target.name]: value });
  };

  const handleSubmitTwo = async (event) => {
    event.preventDefault();
    //setSubmitting(true)
    // const search1 = { ...search }
    try {
      const response = await getSearchedMemberPayments({
        fromTime: fromATime,
        toTime: toATime,
        memberId: search.memberId,
      });
      setSearchedPayments(response.data);
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
          <CCardHeader className="list__title">Member Payments</CCardHeader>
          <CCardBody>
            <Toaster />
            <CDataTable
              items={payments}
              fields={[
                { key: "memberId", _classes: "font-weight-bold" },
                "amount",
                { key: "from", label: "From Date" },
                { key: "to", label: "Renew Date" },
              ]}
              hover
              striped
              sorter
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/memberPayments/${item.id}`)}
              scopedSlots={{
                MemberRegistration: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.MemberRegistration.status}
                    </CBadge>
                  </td>
                ),
                to: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {moment(item.to).format("MMMM Do YYYY, h:mm:ss a")}
                    </CBadge>
                  </td>
                ),
                from: (item) => (
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {moment(item.from).format("MMMM Do YYYY, h:mm:ss a")}
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
        {/* <CButton onClick={toggleOne} className="mr-1">
          Register Payment
        </CButton>
        <CButton onClick={toggleTwo} className="mr-1">
          Search Member Payment Details
        </CButton> */}

        <CButton
          onClick={toggleOne}
          className="mr-2"
          color="primary"
          shape="rounded-pill"
        >
          Register Payment
        </CButton>
        <CButton
          onClick={toggleTwo}
          color="secondary"
          shape="rounded-pill"
          className="mr-2"
        >
          Search Member Payment
        </CButton>
        <CButton
          onClick={toggleThree}
          color="primary"
          variant="outline"
          shape="rounded-pill"
          className="mr-2"
        >
          View Payment Visuals
        </CButton>
        <CModal show={modalOne} onClose={toggleOne}>
          <CModalHeader closeButton>Register Payment</CModalHeader>
          <form onSubmit={handleSubmitOne}>
            <CModalBody>
              <CLabel htmlFor="memberId">Member ID</CLabel>
              <CInput
                id="memberId"
                placeholder="Enter the member ID"
                required
                name="memberId"
                onChange={handleChangeOne}
                value={item.memberId}
              />
              <CLabel htmlFor="amount">Amount(KSH)</CLabel>
              <CInput
                id="amount"
                placeholder="Enter the amount"
                required
                name="amount"
                onChange={handleChangeOne}
                value={item.amount}
              />
              <CLabel htmlFor="fromTime">From</CLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="fromTime"
                  name="fromTime"
                  // label="From Time"
                  onChange={onChangeFromBTime}
                  value={fromBTime}
                />
                <CLabel htmlFor="toTime">To </CLabel>
                <DatePicker
                  id="toTime"
                  name="toTime"
                  // label="To Time"
                  onChange={onChangeToBTime}
                  value={toBTime}
                />
              </MuiPickersUtilsProvider>
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
          <CModalHeader closeButton>Search Payment Details</CModalHeader>
          <form onSubmit={handleSubmitTwo}>
            <CModalBody>
              <CLabel htmlFor="memberId">Member ID</CLabel>
              <CInput
                id="memberId"
                placeholder="Enter the member ID"
                required
                name="memberId"
                onChange={handleChangeTwo}
                value={search.memberId}
              />
              <CLabel htmlFor="fromTime">From</CLabel>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  id="fromTime"
                  name="fromTime"
                  // label="From Time"
                  onChange={onChangeFromATime}
                  value={fromATime}
                />
                <CLabel htmlFor="toTime">To </CLabel>
                <DatePicker
                  id="toTime"
                  name="toTime"
                  // label="To Time"
                  onChange={onChangeToATime}
                  value={toATime}
                />
              </MuiPickersUtilsProvider>

              {/* <CLabel htmlFor='fromTime'>From</CLabel>
              <CInput
                id='fromTime'
                placeholder='Enter the from time'
                required
                name='fromTime'
                onChange={handleChangeTwo}
                value={search.fromTime}
              />
              <CLabel htmlFor='toTime'>To</CLabel>
              <CInput
                id='toTime'
                placeholder='Enter the to time'
                required
                name='toTime'
                onChange={handleChangeTwo}
                value={search.toTime}
              /> */}
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" type="submit">
                Search
              </CButton>{" "}
              <CButton color="secondary" onClick={toggleTwo}>
                Close
              </CButton>
            </CModalFooter>
          </form>
          <CDataTable
            items={searchedPayments}
            fields={fields}
            columnFilter
            // tableFilter
            footer
            // itemsPerPageSelect
            hover
            sorter
            scopedSlots={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
            }}
          />
        </CModal>
        <CModal show={modalThree} onClose={toggleThree}>
          <CModalHeader closeButton className="btn__modal--text">
            Member Payments Amount Line Chart
          </CModalHeader>
          <CModalBody>
            <Charts />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={toggleThree}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  );
};

export default MemberPayments;
