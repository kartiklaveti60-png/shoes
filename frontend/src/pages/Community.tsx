import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Upload, Sparkles, Trophy, Award } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Community: React.FC = () => {
  const { user } = useAuthStore();
  
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'Smart Kicks',
      handle: '@smartkicks_official',
      tier: 'TITAN MEMBER',
      avatar: '/images/smart_kicks_community.jpg',
      image: '/images/smart_kicks_community.jpg',
      caption: 'Surrounded by pure grail heat! My entire personal collection flexing with SOLE.',
      likes: 1420,
      comments: 38,
      isLiked: false
    },
    {
      id: '2',
      user: 'Elena Rostova',
      handle: '@elena_berlin',
      tier: 'LEGEND MEMBER',
      avatar: '/images/elena_rostova_community.jpg',
      image: '/images/elena_rostova_community.jpg',
      caption: 'Cozy stairs vibe with the vibrant classic kicks. Comfort & aesthetic on point.',
      likes: 2890,
      comments: 84,
      isLiked: true
    }
  ]);

  const handleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7E5] text-[#1A1008] pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-[1800px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E8D5B0]">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#D52122] uppercase">THE SNEAKER ROOM</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1 text-[#1A1008]">COMMUNITY GALLERY</h1>
        </div>
        <button className="mt-4 md:mt-0 bg-[#D52122] text-[#FFF7E5] px-6 py-3 rounded-full font-bold text-xs hover:bg-[#B01A1B] transition-colors shadow-md flex items-center gap-2">
          <Upload className="w-4 h-4" /> UPLOAD YOUR LOOK (+50 XP)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Feed */}
        <div className="lg:col-span-8 space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="glass-panel rounded-3xl p-6 border border-[#E8D5B0] space-y-4 shadow-sm">
              
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border-2 border-[#D52122]/30" />
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1008] flex items-center gap-2">
                      {post.user}
                      <span className="text-[10px] bg-[#D52122] text-[#FFF7E5] px-2 py-0.5 rounded-full font-bold">
                        {post.tier}
                      </span>
                    </h4>
                    <p className="text-xs text-[#8C6E50] font-medium">{post.handle}</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden bg-[#FFF0D0] border border-[#E8D5B0] shadow-md group flex items-center justify-center">
                <img 
                  src={post.image} 
                  alt={post.user} 
                  className="w-full h-auto max-h-[750px] object-cover sm:object-contain transition-transform duration-700 ease-out group-hover:scale-102"
                  loading="eager"
                />
              </div>

              {/* Caption & Actions */}
              <p className="text-xs text-[#1A1008] leading-relaxed font-medium">{post.caption}</p>

              <div className="flex items-center justify-between pt-3 border-t border-[#E8D5B0] text-xs text-[#8C6E50]">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.isLiked ? 'text-[#D52122]' : 'hover:text-[#1A1008]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </button>

                  <button className="flex items-center gap-1.5 font-bold hover:text-[#1A1008] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments} Comments
                  </button>
                </div>

                <button className="hover:text-[#D52122] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Leaderboard & Challenges */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-[#E8D5B0] space-y-4 shadow-sm">
            <h3 className="font-display font-bold text-sm text-[#1A1008] uppercase flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#D52122]" /> TOP STYLIST LEADERBOARD
            </h3>

            <div className="space-y-3">
              {[
                { rank: 1, name: 'Kaito T.', xp: '4,850 XP', tier: 'LEGEND' },
                { rank: 2, name: 'Elena R.', xp: '3,920 XP', tier: 'TITAN' },
                { rank: 3, name: user?.name || 'Alex M.', xp: `${user?.xp} XP`, tier: user?.tier }
              ].map((leader) => (
                <div key={leader.rank} className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF0D0] border border-[#E8D5B0]">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-sm text-[#D52122]">#{leader.rank}</span>
                    <div>
                      <span className="font-bold text-xs text-[#1A1008] block">{leader.name}</span>
                      <span className="text-[10px] text-[#8C6E50] font-bold">{leader.tier}</span>
                    </div>
                  </div>
                  <span className="font-display text-xs font-bold text-[#1A1008]">{leader.xp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
