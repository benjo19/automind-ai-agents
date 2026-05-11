import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

function parseLine(line: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > last) parts.push(line.slice(last, match.index));
    if (match[1]) parts.push(<strong key={match.index} className="text-white">{match[1]}</strong>);
    if (match[2]) parts.push(<a key={match.index} href={match[3]} className="text-indigo-400 hover:text-indigo-300 underline">{match[2]}</a>);
    last = match.index + match[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts.length ? parts : [line];
}

function renderMarkdown(text: string): React.ReactNode[] {
  return text.trim().split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith('- ')) return <li key={i} className="text-slate-300 ml-4 mb-1 list-disc">{parseLine(line.slice(2))}</li>;
    if (line === '') return <div key={i} className="mb-2" />;
    return <p key={i} className="text-slate-300 leading-relaxed mb-3">{parseLine(line)}</p>;
  });
}

export default function BlogPost({ slug, onBack }: { slug: string; onBack: () => void }) {
  const post = blogPosts.find(p => p.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!post) return null;
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Natrag na blog
        </motion.button>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full"><Tag size={10} />{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={10} />{post.readTime}</span>
            <span className="text-xs text-slate-500">{post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
          <div className="glass border border-slate-700/50 rounded-2xl p-6 sm:p-8">{renderMarkdown(post.content)}</div>
          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/40 to-pink-900/40 border border-indigo-500/30 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-2">Zainteresiran za AutoMind?</h3>
            <p className="text-slate-400 mb-4">Besplatna demonstracija — pokazujemo ti kako bi AI agent radio za tvoj biznis.</p>
            <a href="/#contact" onClick={onBack} className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all">Zatraži demo</a>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
