import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Upload, Sparkles, Trophy, Award } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const Community: React.FC = () => {
  const { user } = useAuthStore();
  
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'Kaito Tanaka',
      handle: '@kaito_tokyo',
      tier: 'TITAN VIP',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      caption: 'Late night walk with the Air Jordan 1 Game-Worn. Iconic craftsmanship is unreal.',
      likes: 1420,
      comments: 38,
      isLiked: false
    },
    {
      id: '2',
      user: 'Elena Rostova',
      handle: '@elena_berlin',
      tier: 'LEGEND VIP',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000',
      caption: 'Monochrome techwear fit paired with the Air Monolith Retro High.',
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
    <div className="min-h-screen bg-white text-black pt-28 pb-20 px-4 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/10">
        <div>
          <span className="text-xs font-bold tracking-widest text-[#FF5A1F] uppercase">THE SNEAKER ROOM</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black uppercase mt-1 text-black">COMMUNITY GALLERY</h1>
        </div>
        <button className="mt-4 md:mt-0 bg-black text-white px-6 py-3 rounded-full font-bold text-xs hover:bg-[#FF5A1F] transition-colors shadow-md flex items-center gap-2">
          <Upload className="w-4 h-4" /> UPLOAD YOUR LOOK (+50 XP)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Feed */}
        <div className="lg:col-span-8 space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="glass-panel rounded-3xl p-6 border border-black/10 space-y-4 bg-white shadow-sm">
              
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full object-cover border border-black" />
                  <div>
                    <h4 className="font-bold text-sm text-black flex items-center gap-2">
                      {post.user}
                      <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                        {post.tier}
                      </span>
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">{post.handle}</p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden max-h-[500px] bg-gray-100 border border-gray-200">
                <img src={post.image} alt="post" className="w-full h-full object-cover" />
              </div>

              {/* Caption & Actions */}
              <p className="text-xs text-gray-800 leading-relaxed font-medium">{post.caption}</p>

              <div className="flex items-center justify-between pt-3 border-t border-black/10 text-xs text-gray-600">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      post.isLiked ? 'text-red-600' : 'hover:text-black'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </button>

                  <button className="flex items-center gap-1.5 font-bold hover:text-black transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments} Comments
                  </button>
                </div>

                <button className="hover:text-black transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Leaderboard & Challenges */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-black/10 space-y-4 bg-white shadow-sm">
            <h3 className="font-display font-bold text-sm text-black uppercase flex items-center gap-2">
              <Trophy className="w-4 h-4 text-black" /> TOP STYLIST LEADERBOARD
            </h3>

            <div className="space-y-3">
              {[
                { rank: 1, name: 'Kaito T.', xp: '4,850 XP', tier: 'LEGEND' },
                { rank: 2, name: 'Elena R.', xp: '3,920 XP', tier: 'TITAN' },
                { rank: 3, name: user?.name || 'Alex M.', xp: `${user?.xp} XP`, tier: user?.tier }
              ].map((leader) => (
                <div key={leader.rank} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-sm text-black">#{leader.rank}</span>
                    <div>
                      <span className="font-bold text-xs text-black block">{leader.name}</span>
                      <span className="text-[10px] text-gray-500 font-bold">{leader.tier}</span>
                    </div>
                  </div>
                  <span className="font-display text-xs font-bold text-black">{leader.xp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
