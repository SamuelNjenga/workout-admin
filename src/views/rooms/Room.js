import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useRooms } from "../../contexts/RoomContext";
import { updateRoomData } from "src/services/APIUtils";
import "src/styles/Headers.css";

const Room = ({ match }) => {
  const { rooms } = useRooms();

  const handleChange = (event) => {
    event.persist();
    const target = event.target;
    const value = target.value;
    setItem({ ...item, [event.target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const item1 = { ...item };
    //setSubmitting(true)
    try {
      await updateRoomData(match.params.id, item1);
      //await postContact({ ...item })
      //setSubmitting(false)
      //notify()
      console.log("Hitted", item1);
    } catch (err) {
      console.log(err);
      //setSubmitting(false)
    }
  };

  const room = rooms.find((room) => room.id.toString() === match.params.id);

  const [item, setItem] = useState(room);
  const roomDetails = room
    ? Object.entries(room)
    : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader className="form__modal--text">
            Room id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit}>
              <table className="table table-striped table-hover">
                <tbody>
                  {roomDetails.map(([key, value], index) => {
                    return (
                      <tr key={index.toString()}>
                        <td>{`${key}:`}</td>
                        <td>
                          <input
                            defaultValue={value}
                            name={key}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <CButton type="submit" color="primary">
                Edit
              </CButton>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Room;
