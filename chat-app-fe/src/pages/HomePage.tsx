import { useNavigate } from "react-router-dom";

function ChatPage() {

    const navigate = useNavigate();

    const handleLogout = () => {
        // remove token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // redirect to login page
        navigate('/auth')
    }

    return (
        <h1 className="text-1xl underline">
        <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Logout
        </button>
      </h1>
    );
}

export default ChatPage;