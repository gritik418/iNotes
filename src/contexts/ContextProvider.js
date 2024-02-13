import NoteProvider from "./NoteContext";
import UserProvider from "./UserContext";

const ContextProvider = ({ children }) => {
  return (
    <UserProvider>
      <NoteProvider>{children}</NoteProvider>
    </UserProvider>
  );
};

export default ContextProvider;
