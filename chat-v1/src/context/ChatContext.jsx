import { createContext, useContext } from "react";
import { UserAuth } from "./AuthContext";
import { useReducer } from "react";
import { useState } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const { user } = UserAuth();
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId:user?.uid > action.payload?.uid 
                    ? user?.uid + action.payload?.uid 
                    : action.payload?.uid + user?.uid
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)
    
    // Sidebar State & Method
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    }

    // Alert Feature Not Available Message
    const handleAlert = () => {
        alert("Feature coming soon!")
    }

    return (
        <ChatContext.Provider value={{data:state, dispatch, nav, handleNav, handleAlert}}>
            {children}
        </ChatContext.Provider>
    )
}

export const UserChat = () => {
    return useContext(ChatContext);
};