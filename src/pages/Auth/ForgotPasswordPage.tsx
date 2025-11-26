import ForgotPasswordForm from "../../components/Auth/ForgotPassword/ForgotPasswordForm";
import { useForgotPassword } from "../../hooks/Auth/useForgotPassword";

const ForgotPasswordPage = () => {
  const logic = useForgotPassword();
  return <ForgotPasswordForm {...logic} />;
};

export default ForgotPasswordPage;
