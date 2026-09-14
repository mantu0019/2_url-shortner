  

import React, { useEffect, useState } from "react";
import useUrl from "../hooks/useUrl";

const Home = () => {
  const {
    isLoading,
    urlData,
    error,
    urlCreateByUser,
    getAnalyticsUserByUser,
    analyticsData,
  } = useUrl();

  const [url, setUrl] = useState("");
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("linkly-dark-mode") === "true";
  });

  const [copied, setCopied] = useState(false);

  // Save theme
  useEffect(() => {
    localStorage.setItem("linkly-dark-mode", darkMode);
  }, [darkMode]);

  // Create short URL
  const formHandle = async (e) => {
    e.preventDefault();

    if (!url.trim()) return;

    try {
      await urlCreateByUser({
        url: url,
      });

      setCopied(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Get analytics
  const analyticsHandle = async () => {
    const shortId = urlData?.shortUrl?.shortId;

    if (!shortId) return;

    try {
      setAnalyticsLoading(true);

      await getAnalyticsUserByUser({
        shortId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // Copy short URL
  const copyHandle = async () => {
    const shortId = urlData?.shortUrl?.shortId;

    if (!shortId) return;

    const shortUrl =  `${import.meta.env.VITE_API_URL}/api/url/${shortId}`;

    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.log("Copy failed:", error);
    }
  };

  const shortId = urlData?.shortUrl?.shortId;

  const shortUrl = shortId
    ? `${import.meta.env.VITE_API_URL}/api/url/${shortId}`
    : "";

  const clickCount = analyticsData?.totalClicks ?? 0;

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-[#181313] text-[#fffdf1]" : "bg-[#faf8f2] text-[#403030]"
      }`}
    >
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-[120px] ${
            darkMode ? "bg-[#8c6262]/10" : "bg-[#403030]/8"
          }`}
        />

        <div
          className={`absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-[120px] ${
            darkMode ? "bg-[#c39b8b]/8" : "bg-[#d9a88f]/15"
          }`}
        />
      </div>

      {/* ================= HEADER ================= */}

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className={`relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl shadow-lg ${
              darkMode ? "bg-[#fffdf1] text-[#403030]" : "bg-[#403030] text-[#fffdf1]"
            }`}
          >
            <span className="text-xl font-black">↗</span>

            <div className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-[#f5d8c9]/40 blur-md" />
          </div>

          <div>
            <h1
              className={`text-lg font-black tracking-tight ${
                darkMode ? "text-[#fffdf1]" : "text-[#403030]"
              }`}
            >
              Linkly
            </h1>

            <p
              className={`text-[11px] font-medium ${
                darkMode ? "text-[#a99494]" : "text-[#887777]"
              }`}
            >
              Smart URL Shortener
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark mode"
          className={`group flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
            darkMode
              ? "border-[#5b4545] bg-[#292020] text-[#fffdf1]"
              : "border-[#e2d9d4] bg-white text-[#403030]"
          }`}
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-180 ${
              darkMode ? "bg-[#403030]" : "bg-[#f7f0eb]"
            }`}
          >
            {darkMode ? "☀" : "☾"}
          </span>

          <span className="hidden sm:block">
            {darkMode ? "Light" : "Dark"}
          </span>
        </button>
      </header>

      {/* ================= MAIN ================= */}

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
        {/* ================= HERO ================= */}

        <section className="mx-auto max-w-4xl pt-16 text-center sm:pt-20 lg:pt-24">
          {/* Badge */}
          <div
            className={`mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-sm ${
              darkMode
                ? "border-[#584444] bg-[#241c1c] text-[#d8c5c5]"
                : "border-[#e6ddd8] bg-white text-[#6e5c5c]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>

            Fast & Simple URL Management
          </div>

          {/* Heading */}
          <h2
            className={`mt-7 text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl ${
              darkMode ? "text-[#fffdf1]" : "text-[#403030]"
            }`}
          >
            Long links.
            <br />

            <span
              className={
                darkMode ? "text-[#bda4a4]" : "text-[#9a8585]"
              }
            >
              Shorter future.
            </span>
          </h2>

          {/* Description */}
          <p
            className={`mx-auto mt-7 max-w-2xl text-sm leading-7 sm:text-base ${
              darkMode ? "text-[#aa9898]" : "text-[#756666]"
            }`}
          >
            Create clean, memorable short links in seconds and keep track
            of every click with simple, powerful analytics.
          </p>
        </section>

        {/* ================= SHORTENER ================= */}

        <section className="mx-auto mt-12 max-w-4xl sm:mt-14">
          <div
            className={`rounded-[30px] border p-2 shadow-[0_25px_80px_rgba(64,48,48,0.12)] transition-all duration-500 ${
              darkMode
                ? "border-[#493838] bg-[#211a1a]/90 shadow-black/30"
                : "border-[#e7ded9] bg-white/80"
            }`}
          >
            <form
              onSubmit={formHandle}
              className={`rounded-[24px] p-5 sm:p-7 ${
                darkMode ? "bg-[#282020]" : "bg-[#fffdf8]"
              }`}
            >
              {/* Form Header */}
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p
                    className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                      darkMode ? "text-[#927c7c]" : "text-[#9b8989]"
                    }`}
                  >
                    Create link
                  </p>

                  <h3
                    className={`mt-1 text-base font-bold ${
                      darkMode ? "text-[#fffdf1]" : "text-[#403030]"
                    }`}
                  >
                    Paste your long URL
                  </h3>
                </div>

                <span
                  className={`hidden rounded-full px-3 py-1.5 text-[11px] font-semibold sm:block ${
                    darkMode
                      ? "bg-[#332727] text-[#a99393]"
                      : "bg-[#f6f0eb] text-[#8b7979]"
                  }`}
                >
                  🔒 HTTPS supported
                </span>
              </div>

              {/* Input */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <div
                  className={`group flex min-w-0 flex-1 items-center rounded-2xl border px-4 transition-all duration-300 ${
                    darkMode
                      ? "border-[#4e3b3b] bg-[#1d1717] focus-within:border-[#806060]"
                      : "border-[#e2d9d4] bg-white focus-within:border-[#a98d8d]"
                  }`}
                >
                  <span
                    className={`mr-3 text-lg transition-transform duration-300 group-focus-within:scale-110 ${
                      darkMode ? "text-[#987f7f]" : "text-[#927e7e]"
                    }`}
                  >
                    🔗
                  </span>

                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/your-long-url"
                    className={`w-full bg-transparent py-4 text-sm outline-none ${
                      darkMode
                        ? "text-[#fffdf1] placeholder:text-[#6f5d5d]"
                        : "text-[#403030] placeholder:text-[#a99b9b]"
                    }`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-sm font-bold shadow-lg transition-all duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${
                    darkMode
                      ? "bg-[#fffdf1] text-[#403030] hover:bg-[#f5e9df] hover:shadow-[#000]/30"
                      : "bg-[#403030] text-[#fffdf1] hover:bg-[#514040] hover:shadow-[#403030]/25"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span
                        className={`h-4 w-4 animate-spin rounded-full border-2 ${
                          darkMode
                            ? "border-[#403030] border-t-transparent"
                            : "border-[#fffdf1] border-t-transparent"
                        }`}
                      />

                      Creating
                    </>
                  ) : (
                    <>
                      Shorten URL

                      <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* ================= RESULT ================= */}

        {shortId && (
          <section className="mx-auto mt-7 max-w-4xl">
            <div
              className={`overflow-hidden rounded-[30px] border shadow-xl ${
                darkMode
                  ? "border-[#493838] bg-[#241c1c]"
                  : "border-[#e7ded9] bg-white"
              }`}
            >
              {/* Result top */}
              <div
                className={`flex items-center justify-between border-b px-6 py-5 sm:px-7 ${
                  darkMode ? "border-[#3d3030]" : "border-[#eee7e3]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
                    ✓
                  </div>

                  <div>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                        darkMode ? "text-[#907979]" : "text-[#9a8888]"
                      }`}
                    >
                      Success
                    </p>

                    <h3
                      className={`mt-0.5 text-sm font-bold sm:text-base ${
                        darkMode ? "text-[#fffdf1]" : "text-[#403030]"
                      }`}
                    >
                      Your short link is ready
                    </h3>
                  </div>
                </div>

                <span
                  className={`hidden text-xs font-medium sm:block ${
                    darkMode ? "text-[#756363]" : "text-[#a09292]"
                  }`}
                >
                  Ready to share
                </span>
              </div>

              {/* Result body */}
              <div className="p-5 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* Short URL */}
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`group flex min-w-0 flex-1 items-center rounded-2xl border px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 ${
                      darkMode
                        ? "border-[#493838] bg-[#1b1616] text-[#e7dada] hover:border-[#665050]"
                        : "border-[#e5ddd8] bg-[#fffdf8] text-[#403030] hover:border-[#cdbfba]"
                    }`}
                  >
                    <span
                      className={`mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        darkMode ? "bg-[#332727]" : "bg-[#f3ece7]"
                      }`}
                    >
                      ↗
                    </span>

                    <span className="min-w-0 flex-1 break-all text-sm font-semibold">
                      {shortUrl}
                    </span>

                    <span className="ml-3 text-lg opacity-40 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>

                  {/* Copy */}
                  <button
                    type="button"
                    onClick={copyHandle}
                    className={`rounded-2xl px-6 py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] ${
                      copied
                        ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                        : darkMode
                        ? "bg-[#fffdf1] text-[#403030] hover:bg-[#f5e9df]"
                        : "bg-[#403030] text-[#fffdf1] hover:bg-[#514040]"
                    }`}
                  >
                    {copied ? "✓ Copied" : "Copy link"}
                  </button>
                </div>

                {/* Analytics button */}
                <button
                  type="button"
                  onClick={analyticsHandle}
                  disabled={analyticsLoading}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border py-4 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${
                    darkMode
                      ? "border-[#4c3a3a] bg-[#332727] text-[#fffdf1] hover:bg-[#3d2e2e]"
                      : "border-[#ded5d0] bg-[#f8f3ee] text-[#403030] hover:bg-[#f1e9e3]"
                  }`}
                >
                  {analyticsLoading ? (
                    <>
                      <span
                        className={`h-4 w-4 animate-spin rounded-full border-2 ${
                          darkMode
                            ? "border-[#fffdf1] border-t-transparent"
                            : "border-[#403030] border-t-transparent"
                        }`}
                      />

                      Fetching analytics...
                    </>
                  ) : (
                    <>
                      <span>◉</span>
                      Check Analytics
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ================= ANALYTICS ================= */}

        {analyticsData && (
          <section className="mx-auto mt-7 max-w-4xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Clicks */}
              <div
                className={`group relative overflow-hidden rounded-[30px] border p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? "border-[#493838] bg-[#241c1c]"
                    : "border-[#e7ded9] bg-white"
                }`}
              >
                {/* Decorative circle */}
                <div
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-125 ${
                    darkMode ? "bg-[#a77f7f]/10" : "bg-[#d9b9aa]/20"
                  }`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                          darkMode ? "text-[#927c7c]" : "text-[#9a8888]"
                        }`}
                      >
                        Analytics
                      </p>

                      <h3
                        className={`mt-2 text-sm font-semibold ${
                          darkMode ? "text-[#c2aeae]" : "text-[#756565]"
                        }`}
                      >
                        Total Clicks
                      </h3>
                    </div>

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${
                        darkMode
                          ? "bg-[#332727] text-[#d2baba]"
                          : "bg-[#f5eee9] text-[#705d5d]"
                      }`}
                    >
                      📊
                    </div>
                  </div>

                  <div className="mt-8 flex items-end gap-3">
                    <span
                      className={`text-6xl font-black tracking-tight ${
                        darkMode ? "text-[#fffdf1]" : "text-[#403030]"
                      }`}
                    >
                      {clickCount}
                    </span>

                    <span
                      className={`mb-2 text-xs font-medium ${
                        darkMode ? "text-[#806c6c]" : "text-[#9a8989]"
                      }`}
                    >
                      visits
                    </span>
                  </div>

                  <div
                    className={`mt-5 h-1 overflow-hidden rounded-full ${
                      darkMode ? "bg-[#382b2b]" : "bg-[#eee5df]"
                    }`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        darkMode ? "bg-[#b38e8e]" : "bg-[#806c6c]"
                      }`}
                      style={{
                        width: clickCount > 0 ? "100%" : "8%",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div
                className={`rounded-[30px] border p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  darkMode
                    ? "border-[#493838] bg-[#241c1c]"
                    : "border-[#e7ded9] bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                        darkMode ? "text-[#927c7c]" : "text-[#9a8888]"
                      }`}
                    >
                      Link details
                    </p>

                    <h3
                      className={`mt-2 text-sm font-semibold ${
                        darkMode ? "text-[#c2aeae]" : "text-[#756565]"
                      }`}
                    >
                      Link Status
                    </h3>
                  </div>

                  <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-[11px] font-bold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>

                <div
                  className={`mt-8 rounded-2xl border p-4 ${
                    darkMode
                      ? "border-[#3f3030] bg-[#1b1616]"
                      : "border-[#ebe3de] bg-[#faf7f3]"
                  }`}
                >
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      darkMode ? "text-[#756363]" : "text-[#a09292]"
                    }`}
                  >
                    Short ID
                  </p>

                  <p
                    className={`mt-2 break-all text-base font-bold ${
                      darkMode ? "text-[#fffdf1]" : "text-[#403030]"
                    }`}
                  >
                    /{shortId}
                  </p>
                </div>

                <p
                  className={`mt-4 text-xs leading-5 ${
                    darkMode ? "text-[#806c6c]" : "text-[#998989]"
                  }`}
                >
                  Your short link is active and ready to share with anyone.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ================= FOOTER ================= */}

        <footer className="mt-16 text-center">
          <div
            className={`mx-auto mb-5 h-px max-w-xs ${
              darkMode ? "bg-[#332727]" : "bg-[#e8dfda]"
            }`}
          />

          <p
            className={`text-[11px] font-medium tracking-wider ${
              darkMode ? "text-[#655555]" : "text-[#a39595]"
            }`}
          >
            SHORTEN • SHARE • TRACK
          </p>

          <p
            className={`mt-2 text-[10px] ${
              darkMode ? "text-[#514444]" : "text-[#b0a3a3]"
            }`}
          >
            Built with simplicity in mind.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;


