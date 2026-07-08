import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  //////////////////////////////////////////////////////
  // Store
  //////////////////////////////////////////////////////

  const { selectedUser } = useChatStore();

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <main className="min-h-screen bg-base-200 pt-20 px-4 pb-4">
      <div className="mx-auto h-[calc(100vh-6rem)] max-w-7xl">
        {/* Chat Layout */}
        <section className="flex h-full overflow-hidden rounded-2xl bg-base-100 shadow-xl border border-base-300">

          {/* Sidebar */}
          <Sidebar />

          {/* Chat Area */}
          <div className="flex flex-1 overflow-hidden">
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <NoChatSelected />
            )}
          </div>

        </section>
      </div>
    </main>
  );
};

export default HomePage;