import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#0a0d12] px-4 py-6 text-[#f4ece8]">
      <div className="mx-auto max-w-[430px] animate-pulse">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#f4d7c7] shadow-[0_0_20px_rgba(244,215,199,0.45)]" />
            <div className="h-5 w-16 rounded-full bg-[#2a2f38]" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-[#1a1f28]" />
            <div className="h-7 w-7 rounded-full bg-[#1a1f28]" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-[#2f2422] p-5 shadow-[0_18px_38px_rgba(0,0,0,0.28)]">
            <div className="mx-auto mb-5 h-10 w-44 rounded-full bg-[#f4e6df]/20" />
            <div className="mx-auto h-11 w-64 rounded-xl bg-[#f4e6df]/15" />
          </div>

          <div className="rounded-[28px] border border-[#f3d9d0]/30 bg-[#f3d8cc] p-5 shadow-[0_16px_30px_rgba(243,216,204,0.18)]">
            <div className="mx-auto mb-5 h-10 w-72 rounded-full bg-[#d8b3a1]/60" />
            <div className="mx-auto h-11 w-52 rounded-xl bg-[#d8b3a1]/50" />
          </div>

          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="h-3 w-3 rounded-full bg-[#eae2dd]/70" />
            <div className="h-3 w-3 rounded-full bg-[#eae2dd]/50" />
            <div className="h-3 w-3 rounded-full bg-[#eae2dd]/50" />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-[20px] border border-white/10 bg-[#1d2127] p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-[#f4d7c7]" />
              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-white/15" />
                <div className="h-2 w-20 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="h-10 w-20 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;