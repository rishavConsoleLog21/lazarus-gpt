import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessages: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessages]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats");
      toast.dismiss();
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { autoClose: 2000 });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed");
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      getUserChats()
        .then((data) => {
          toast.loading("Loading Chat History");
          toast.dismiss();
          setChatMessages([...data.chats]);
          toast.success("Chat History Loaded Successfully", {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error("Error Loading Chat History", { autoClose: 2000 });
          console.error(error);
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 5,
        gap: 5,
        flexDirection: { md: "row", xs: "none", sm: "none" },
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "flex", sm: "flex" },
          flex: 0.2,
          flexDirection: "column",
          gap: 2,
          height: "100%",
          width: "100%",
          ml: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            shadow: 5,
            p: 2,
            mt: 2,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {/* {auth?.user?.name.split(" ")[1][0]} */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "sans-serif" }}>
            Lazarus Assistant is here to help you.
          </Typography>
          <Typography
            sx={{ mx: "auto", fontFamily: "sans-serif", my: "auto", p: "auto" }}
          >
            Feel free to ask anything!
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          gap: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          Lazarus GPT-4
        </Typography>
        <Box
          sx={{
            width: "90%",
            height: "50vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
            gap: 2,
            p: 2,
            bgcolor: "rgb(17,29,39)",
            boxShadow: 5,
            color: "white",
            textAlign: "left",
            textsize: "20px",
          }}
        >
          {chatMessages.map((chat, index) => (
            // @ts-ignore
            <ChatItem key={index} role={chat.role} content={chat.content} />
          ))}
        </Box>
        <div
          style={{
            width: "93%",
            borderRadius: 3,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me anything..."
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
