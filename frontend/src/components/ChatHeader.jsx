import { X } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, isTyping, typingUserId } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  const isUserOnline = onlineUsers.includes(selectedUser._id);

  const isSelectedUserTyping =
    isTyping && typingUserId === selectedUser._id;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />

              {isUserOnline && (
                <span
                  className="
                    absolute bottom-0 right-0
                    size-3
                    rounded-full
                    bg-green-500
                    ring-2 ring-base-100
                  "
                />
              )}
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold">
              {selectedUser.fullName}
            </h3>

            <p
              className={`text-sm transition-all duration-200 ${
                isSelectedUserTyping
                  ? "text-green-500 font-medium"
                  : "text-base-content/70"
              }`}
            >
              {isSelectedUserTyping
                ? "Typing..."
                : isUserOnline
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;