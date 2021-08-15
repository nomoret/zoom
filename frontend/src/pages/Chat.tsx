import ChatRooms from "../components/ChatRooms";
import ChatSideBar from "../components/ChatSideBar";

interface Props {}

function Chat({}: Props) {
  return (
    <div>
      <ChatSideBar />
      <ChatRooms />
    </div>
  );
}

export default Chat;
