"use client";

import { SendIcon } from "./icons/Icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingIcon } from "./icons/Icons";
import { createChat, streamChatResponse } from "@/geminiServices";

const page = () => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [isModelTyping, setIsModelTyping] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatHistory]);

  useEffect(() => {
    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initApp = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Initialize Gemini Chat
      chatRef.current = createChat();
      setChatHistory([
        { role: "model", text: "I am AURA. How may I assist you?" },
      ]);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to connect to the ChronoStream archive. Please check your connection or API key."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = async (message) => {
    if (!chatRef.current || isModelTyping) return;

    setIsModelTyping(true);
    const updatedHistory = [...chatHistory, { role: "user", text: message }];
    setChatHistory(updatedHistory);

    try {
      const stream = await streamChatResponse(chatRef.current, message);

      let newModelMessage = "";
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: newModelMessage },
      ]);

      for await (const chunk of stream) {
        newModelMessage += chunk.text;
        setChatHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = {
            role: "model",
            text: newModelMessage,
          };
          return newHistory;
        });
      }
    } catch (err) {
      console.error(err);
      const errorMessage = {
        role: "model",
        text: "Error: Signal lost. Unable to process request.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsModelTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() && !isModelTyping) {
      handleSendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="sm:px-6 pb-6 p-2 h-[calc(100vh-80px)] w-full flex flex-col">
      {/* <h2 className="font-pixel text-lg p-4 text-purple-300 bg-black/50 border-b-2 border-purple-500/30 flex-shrink-0">
        A.U.R.A.
      </h2> */}
      <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
        <div className="space-y-4">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm lg:max-w-xl text-sm md:text-base px-4 py-2 rounded-lg font-sans ${
                  msg.role === "user"
                    ? "bg-cyan-800/70 text-white rounded-br-none"
                    : "bg-gray-700/70 text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.role === "model" && !msg.text && isModelTyping ? <LoadingIcon /> : msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form
        onSubmit={handleSend}
        className="flex-shrink-0 p-4 border-t-2 border-purple-500/30 flex items-center space-x-2 bg-black/50"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Query the archive..."
          className="flex-grow bg-purple-900/50 border-2 border-purple-500/80 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 rounded-md px-3 py-2 text-white placeholder-purple-300/70 transition duration-300"
          disabled={isModelTyping}
        />
        <button
          type="submit"
          disabled={isModelTyping || !input.trim()}
          className="p-2 rounded-md transition duration-300 text-white enabled:hover:bg-cyan-500 enabled:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default page;
