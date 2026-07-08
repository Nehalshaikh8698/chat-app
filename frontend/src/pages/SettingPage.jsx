import { Send, Bell, Moon, Palette, Shield } from "lucide-react";

import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How's it going?",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const SettingsPage = () => {
  //////////////////////////////////////////////////////
  // Store
  //////////////////////////////////////////////////////

  const { theme, setTheme } = useThemeStore();

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <main className="min-h-screen bg-base-200 pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-base-content/60 mt-2">
            Customize your chat experience.
          </p>
        </div>

        {/* Theme Section */}
        <section className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">

            <div className="flex items-center gap-2 mb-6">
              <Palette className="size-5 text-primary" />
              <div>
                <h2 className="font-semibold text-lg">
                  Theme
                </h2>

                <p className="text-sm text-base-content/60">
                  Select your preferred application theme.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {THEMES.map((currentTheme) => (
                <button
                  key={currentTheme}
                  onClick={() => setTheme(currentTheme)}
                  className={`rounded-xl p-2 transition-all duration-200 ${
                    theme === currentTheme
                      ? "bg-primary/10 ring-2 ring-primary"
                      : "hover:bg-base-200"
                  }`}
                >
                  {/* Theme Preview */}
                  <div
                    className="h-9 rounded-lg overflow-hidden"
                    data-theme={currentTheme}
                  >
                    <div className="grid grid-cols-4 gap-1 p-1 h-full">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>

                  <p className="text-xs font-medium mt-2 truncate">
                    {currentTheme.charAt(0).toUpperCase() +
                      currentTheme.slice(1)}
                  </p>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Preview */}
        <section className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">

            <h2 className="text-lg font-semibold mb-4">
              Theme Preview
            </h2>

            <div className="rounded-xl border border-base-300 overflow-hidden">

              {/* Chat Header */}
              <div className="bg-base-100 border-b border-base-300 px-4 py-3 flex items-center gap-3">

                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                  J
                </div>

                <div>
                  <h3 className="font-semibold">
                    John Doe
                  </h3>

                  <p className="text-xs text-green-500">
                    Online
                  </p>
                </div>

              </div>

              {/* Messages */}
              <div className="bg-base-200 p-4 min-h-[250px] space-y-4">

                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-xl px-4 py-3 max-w-xs ${
                        message.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-100"
                      }`}
                    >
                      <p>{message.content}</p>

                      <p
                        className={`text-[11px] mt-2 ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/60"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* Input */}
              <div className="border-t border-base-300 bg-base-100 p-4">

                <div className="flex gap-2">

                  <input
                    className="input input-bordered flex-1"
                    value="This is a preview message..."
                    readOnly
                  />

                  <button className="btn btn-primary btn-circle">
                    <Send size={18} />
                  </button>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Upcoming Features */}
        <section className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body">

            <h2 className="text-lg font-semibold mb-5">
              Upcoming Settings
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              {/* Notifications */}
              <div className="border border-base-300 rounded-xl p-5">

                <Bell className="size-8 text-primary mb-3" />

                <h3 className="font-semibold">
                  Notifications
                </h3>

                <p className="text-sm text-base-content/60 mt-2">
                  Manage chat notifications, sounds, and message alerts.
                </p>

                <span className="badge badge-outline mt-4">
                  Coming Soon
                </span>

              </div>

              {/* Appearance */}
              <div className="border border-base-300 rounded-xl p-5">

                <Moon className="size-8 text-primary mb-3" />

                <h3 className="font-semibold">
                  Appearance
                </h3>

                <p className="text-sm text-base-content/60 mt-2">
                  Wallpapers, fonts, chat bubbles, and display preferences.
                </p>

                <span className="badge badge-outline mt-4">
                  Coming Soon
                </span>

              </div>

              {/* Privacy */}
              <div className="border border-base-300 rounded-xl p-5">

                <Shield className="size-8 text-primary mb-3" />

                <h3 className="font-semibold">
                  Privacy
                </h3>

                <p className="text-sm text-base-content/60 mt-2">
                  Last seen, read receipts, blocked users, and account privacy.
                </p>

                <span className="badge badge-outline mt-4">
                  Coming Soon
                </span>

              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
};

export default SettingsPage;