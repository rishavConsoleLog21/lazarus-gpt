import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Welcome to Lazarus Chatbot",
        1000,
        "Build with MERN Stack and OpenAI GPT-4",
        1500,
        "SignUp to get started",
        1000,
        "And Start Chatting with me!",
        1000,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "2px 2px 4px #000000",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
