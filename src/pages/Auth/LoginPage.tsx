import LoginForm from "../../components/Auth/LoginForm";
import { useLogin } from "../../hooks/Auth/useLogin";

const LoginPage = () => {
  const loginLogic = useLogin();

  return <LoginForm {...loginLogic} />;
};

export default LoginPage;
