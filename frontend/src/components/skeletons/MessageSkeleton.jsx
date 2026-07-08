const SKELETON_MESSAGES = 8;

const MessageSkeleton = () => {
  //////////////////////////////////////////////////////
  // Skeleton Messages
  //////////////////////////////////////////////////////

  const messages = Array.from({
    length: SKELETON_MESSAGES,
  });

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 animate-pulse">
      {messages.map((_, index) => {
        const isSender = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`chat ${
              isSender ? "chat-end" : "chat-start"
            }`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                <div className="skeleton size-full rounded-full" />
              </div>
            </div>

            {/* Time */}
            <div className="chat-header mb-2">
              <div className="skeleton h-3 w-14 rounded" />
            </div>

            {/* Message Bubble */}
            <div className="chat-bubble bg-transparent p-0 shadow-none">

              {/* Random Bubble Width */}
              <div
                className={`skeleton rounded-2xl ${
                  index % 3 === 0
                    ? "w-44 h-16"
                    : index % 3 === 1
                    ? "w-60 h-20"
                    : "w-32 h-12"
                }`}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;