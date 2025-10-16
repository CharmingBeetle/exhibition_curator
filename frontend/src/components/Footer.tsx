import React from 'react';
import logoWhite from '../assets/logo-white.png';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-black/95 via-[#050a1f]/90 to-transparent backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-12">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">Assemblé</h3>
          </div>

         
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Powered by</h4>
            <div className="space-y-2">
              <a 
                href="https://metmuseum.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                Metropolitan Museum API
              </a>
              <a 
                href="https://github.com/harvardartmuseums/api-docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                Harvard Art Museums API
              </a>
              <a 
                href="https://clerk.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                Clerk Authentication
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Built with</h4>
            <div className="space-y-1">
              <p className="text-sm text-slate-400">React 18 + TypeScript</p>
              <p className="text-sm text-slate-400">Tailwind CSS</p>
              <p className="text-sm text-slate-400">Vite</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Assemblé. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Museum data provided by respective institutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
