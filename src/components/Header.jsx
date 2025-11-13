import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <Link to="/">
        <h1>Northcoder News</h1>
      </Link>
      <div className="user-info">
        <h2>{user.username}</h2>
        <img
          src={user.avatar_url}
          alt={`${user.username}'s account`}
          height="50px"
          width="50px"
          object-fit="contain"
        />
      </div>
    </header>
  );
};

export default Header;
