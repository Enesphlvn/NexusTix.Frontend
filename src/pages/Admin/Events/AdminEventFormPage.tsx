import { useParams } from "react-router-dom";
import AdminEventForm from "../../../components/Admin/Event/AdminEventForm";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useEventForm } from "../../../hooks/Event/useEventForm";
import { useEventTypes } from "../../../hooks/EventType/useEventTypes";
import { useVenues } from "../../../hooks/Venue/useVenues";
import { useArtists } from "../../../hooks/Artist/useArtists";

const AdminEventFormPage = () => {
  const { id } = useParams<{ id: string }>();

  const formLogic = useEventForm(id);
  const { venues, loading: venuesLoading } = useVenues();
  const { eventTypes, loading: typesLoading } = useEventTypes();
  const { artists, loading: artistsLoading } = useArtists();

  if (
    formLogic.initialLoading ||
    venuesLoading ||
    typesLoading ||
    artistsLoading
  ) {
    return <LoadingSpinner />;
  }

  return (
    <AdminEventForm
      {...formLogic}
      venues={venues}
      eventTypes={eventTypes}
      artists={artists}
    />
  );
};

export default AdminEventFormPage;
