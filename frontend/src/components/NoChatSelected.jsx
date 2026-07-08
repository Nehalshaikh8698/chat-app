import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <section className="flex flex-1 items-center justify-center bg-base-100/50 px-6 py-12">
      <div className="max-w-md text-center">

        {/* Animated Icon */}
        <div className="mb-8 flex justify-center">

          <div className="relative">

            {/* Background Glow */}
            <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl"></div>

            {/* Icon Box */}
            <div
              className="
                relative flex size-20 items-center justify-center
                rounded-3xl
                bg-primary/10
                animate-pulse
              "
            >
              <MessageSquare className="size-10 text-primary" />
            </div>

            {/* Decorative Icon */}
            <Sparkles className="absolute -right-2 -top-2 size-5 text-warning animate-bounce" />

          </div>

        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3">
          Welcome to Chatty
        </h2>

        {/* Description */}
        <p className="leading-7 text-base-content/60">
          Select a conversation from the sidebar to start chatting with your
          friends in real time.
        </p>

        {/* Tips */}
        <div className="mt-8 rounded-xl border border-base-300 bg-base-200 p-5">

          <h3 className="font-semibold mb-3">
            Quick Tips
          </h3>

          <ul className="space-y-2 text-sm text-base-content/70">
            <li>💬 Select a contact to start chatting.</li>
            <li>📷 Share images instantly.</li>
            <li>🟢 See who's online in real time.</li>
            <li>⚡ Fast and secure messaging.</li>
          </ul>

        </div>

      </div>
    </section>
  );
};

export default NoChatSelected;