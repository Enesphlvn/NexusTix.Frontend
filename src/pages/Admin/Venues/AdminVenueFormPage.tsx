import AdminVenueForm from "../../../components/Admin/Venue/AdminVenueForm";
import LoadingSpinner from "../../../components/Common/LoadingSpinner";
import { useCities } from "../../../hooks/City/useCities";
import { useDistrictsByCity } from "../../../hooks/District/useDistrictsByCity";
import { useVenueForm } from "../../../hooks/Venue/useVenueForm";

const AdminVenueFormPage = () => {
  const formLogic = useVenueForm();
  const { cities, loading: citiesLoading } = useCities();

  const { districts } = useDistrictsByCity(formLogic.cityId);

  if (formLogic.initialLoading || citiesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AdminVenueForm {...formLogic} cities={cities} districts={districts} />
  );
};

export default AdminVenueFormPage;
