import { useRegister } from "../../hooks/Auth/useRegister";
import RegisterForm from "../../components/Auth/Register/RegisterForm";

const RegisterPage = () => {
  const registerLogic = useRegister();

  return <RegisterForm {...registerLogic} />;
};

export default RegisterPage;
