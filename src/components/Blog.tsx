import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function Blog({ onSelectPost }: { onSelectPost: (slug: string) => void }) {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-slate-400 text-lg">Savjeti i resursi za poduzetnike koji žele automatizirati poslovanje</p>
        </motion.div>
        <div className="space-y-6">
          {blogPosts.map((post, idx) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => onSelectPost(post.slug)} className="glass border border-slate-700/50 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full"><Tag size={10} />{post.category}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={10} />{post.readTime}</span>
                <span className="text-xs text-slate-500">{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{post.title}</h2>
              <p className="text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">Čitaj više <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
