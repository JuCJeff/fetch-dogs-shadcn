import { useAuth } from "@/hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleClick}>Logout</button>;
};

export default LogoutButton;
