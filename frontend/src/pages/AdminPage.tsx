import React, { useEffect } from 'react';
import { ShieldCheck, ExternalLink, LayoutDashboard, ArrowRight } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const ADMIN_URL = 'http://localhost:5174';

  useEffect(() => {
    // Automatically attempt redirect after short delay
    const timer = setTimeout(() => {
      window.location.href = ADMIN_URL;
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[80vh] pt-32 pb-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full glass-panel bg-[#FFF7E5] rounded-3xl p-8 border border-[#E8D5B0] shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Shield Icon Badge */}
        <div className="w-20 h-20 mx-auto rounded-full bg-[#D52122]/10 border-2 border-[#D52122]/30 flex items-center justify-center shadow-lg relative">
          <ShieldCheck className="w-10 h-10 text-[#D52122] animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D52122] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D52122]"></span>
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#1A1008] uppercase">
            SOLE Admin Portal
          </h1>
          <p className="text-xs text-[#8C6E50] mt-2 font-medium leading-relaxed">
            Redirecting to the backend administrative control dashboard at <span className="font-mono text-[#D52122] font-bold">{ADMIN_URL}</span>...
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="bg-[#FFF0D0]/60 rounded-2xl p-4 border border-[#E8D5B0] text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1A1008]">
            <LayoutDashboard className="w-4 h-4 text-[#D52122]" />
            Dashboard Capabilities
          </div>
          <ul className="text-[11px] text-[#8C6E50] space-y-1 list-disc list-inside font-medium">
            <li>Manage Products & Sneaker Catalog</li>
            <li>Track Customer Orders & Fulfillment Status</li>
            <li>Monitor Real-time Sales & Analytics</li>
            <li>Configure Drops & Exclusive Inventory</li>
          </ul>
        </div>

        {/* Direct Link Button */}
        <div className="space-y-3 pt-2">
          <a
            href={ADMIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#D52122] hover:bg-[#B8191A] text-[#FFF7E5] text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Open Admin Dashboard
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6E50] hover:text-[#1A1008] transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to Main Storefront
          </a>
        </div>

      </div>
    </div>
  );
};
