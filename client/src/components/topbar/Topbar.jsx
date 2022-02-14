import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT_SUCCESS" });
    navigate("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <NavLink to="/">
          <span className="logo">AmdadulSocial</span>
        </NavLink>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <NavLink to="/messenger">
            <div className="topbarIconItem">
              <Chat style={{ color: "#fff" }} />
            </div>
          </NavLink>

          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="logout" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
        <NavLink to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "/assets/person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </NavLink>
      </div>
    </div>
  );
}
