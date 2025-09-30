import { useState } from 'react';
import { Users, Shield, RotateCcw, ArrowRight, Eye, Lock } from 'lucide-react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGroup = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 500);
  };

  const handleJoinGroup = () => {
    window.location.href = '/join';
  };

  return (
    <div className="min-h-screen bg-[#0F1118] font-inter">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <header className="flex justify-between items-center p-6 lg:p-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#6B6CF6] rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-[#E4E6EB]">AnonGroups</span>
          </div>
          <button 
            onClick={handleJoinGroup}
            className="px-4 py-2 text-sm font-medium text-[#E4E6EB] border border-[#2E303A] rounded-lg hover:bg-[#20222B] transition-colors"
          >
            Join Group
          </button>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center px-6 lg:px-8 pt-16 pb-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#E4E6EB] mb-6 leading-tight">
              Anonymous Groups with
              <span className="text-[#6B6CF6]"> Rotating IDs</span>
            </h1>
            <p className="text-xl text-[#8B8F9A] mb-12 leading-relaxed">
              Create secure, anonymous discussion groups where every participant gets a rotating issue ID. 
              Complete privacy, zero tracking, instant setup.
            </p>
            
            <button 
              onClick={handleCreateGroup}
              disabled={isLoading}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#6B6CF6] hover:bg-[#5C5DF0] text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Anonymous Group'}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 lg:px-8 pb-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#E4E6EB] text-center mb-16">
              Complete Anonymity by Design
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#13151C] p-8 rounded-2xl border border-[#2E303A]">
                <div className="w-12 h-12 bg-[#6B6CF6]/10 rounded-lg flex items-center justify-center mb-6">
                  <RotateCcw size={24} className="text-[#6B6CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-[#E4E6EB] mb-4">Rotating Issue IDs</h3>
                <p className="text-[#8B8F9A] leading-relaxed">
                  Every participant gets a unique issue ID that automatically rotates on set intervals. 
                  No permanent identifiers, maximum privacy protection.
                </p>
              </div>

              <div className="bg-[#13151C] p-8 rounded-2xl border border-[#2E303A]">
                <div className="w-12 h-12 bg-[#6B6CF6]/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye size={24} className="text-[#6B6CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-[#E4E6EB] mb-4">Zero Tracking</h3>
                <p className="text-[#8B8F9A] leading-relaxed">
                  No user accounts, no personal data collection, no tracking cookies. 
                  Join discussions without leaving any digital footprint.
                </p>
              </div>

              <div className="bg-[#13151C] p-8 rounded-2xl border border-[#2E303A]">
                <div className="w-12 h-12 bg-[#6B6CF6]/10 rounded-lg flex items-center justify-center mb-6">
                  <Users size={24} className="text-[#6B6CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-[#E4E6EB] mb-4">Instant Groups</h3>
                <p className="text-[#8B8F9A] leading-relaxed">
                  Create groups in seconds with shareable invite links. 
                  Perfect for sensitive discussions, feedback sessions, or anonymous collaboration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="px-6 lg:px-8 pb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#E4E6EB] text-center mb-16">
              How It Works
            </h2>
            
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-8 h-8 bg-[#6B6CF6] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#E4E6EB] mb-2">Create or Join</h3>
                  <p className="text-[#8B8F9A]">Start a new anonymous group or join an existing one with an invite link.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-8 h-8 bg-[#6B6CF6] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#E4E6EB] mb-2">Get Anonymous ID</h3>
                  <p className="text-[#8B8F9A]">Receive a randomly generated issue ID that identifies you within the group.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-8 h-8 bg-[#6B6CF6] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#E4E6EB] mb-2">Discuss Safely</h3>
                  <p className="text-[#8B8F9A]">Participate in discussions while your ID rotates automatically for maximum anonymity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 lg:px-8 py-8 border-t border-[#2E303A]">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[#6B6E7A] text-sm">
              Built for privacy. No data collection. No tracking. Anonymous by design.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}