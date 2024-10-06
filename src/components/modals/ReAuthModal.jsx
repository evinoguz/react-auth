import LoginForm from "../LoginForm";
import { reAuth } from "../../firebase";

const ReAuthModal = ({closeModal, data}) => {
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    const result = await reAuth(password);
    closeModal();
  };
  return (
    <div>
      <LoginForm handleSubmit={handleSubmit} noEmail={true} />
    </div>
  );
};

export default ReAuthModal;
