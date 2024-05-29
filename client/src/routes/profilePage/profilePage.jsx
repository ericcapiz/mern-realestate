import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "../../lib/apiRequest";
import apiRequest from "../../lib/apiRequest";
("./profilePage.scss");

function ProfilePage() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = apiRequest.post("/auth/logout");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              {/* <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
                alt="profile img"
              /> */}
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
