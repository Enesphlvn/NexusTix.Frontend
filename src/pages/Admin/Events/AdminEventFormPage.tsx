import { useParams } from "react-router-dom";
import AdminEventForm from "../../../components/Admin/Event/AdminEventForm";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useEventForm } from "../../../hooks/Event/useEventForm";
import { useEventTypes } from "../../../hooks/EventType/useEventTypes";
import { useVenues } from "../../../hooks/Venue/useVenues";

const AdminEventFormPage = () => {
  const { id } = useParams<{ id: string }>();

  const formLogic = useEventForm(id);
  const { venues, loading: venuesLoading } = useVenues();
  const { eventTypes, loading: typesLoading } = useEventTypes();

  if (formLogic.initialLoading || venuesLoading || typesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AdminEventForm {...formLogic} venues={venues} eventTypes={eventTypes} />
  );
};

export default AdminEventFormPage;
