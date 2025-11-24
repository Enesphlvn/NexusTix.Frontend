import TicketValidator from "../../../components/Admin/Ticket/TicketValidator";

const AdminCheckInPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <TicketValidator />
    </div>
  );
};

export default AdminCheckInPage;
