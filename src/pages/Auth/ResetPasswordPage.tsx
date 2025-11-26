import ResetPasswordForm from "../../components/Auth/ResetPassword/ResetPasswordForm";
import { useResetPassword } from "../../hooks/Auth/useResetPassword";

const ResetPasswordPage = () => {
  const logic = useResetPassword();
  return <ResetPasswordForm {...logic} />;
};

export default ResetPasswordPage;
