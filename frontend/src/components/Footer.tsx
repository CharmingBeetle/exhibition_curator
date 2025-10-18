import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#89A8B2]/20 bg-gradient-to-t from-[#F1F0E8]/95 via-[#E5E1DA]/90 to-transparent backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-12">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-[#1b1c17]">Assemblé</h3>
          </div>

         
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#1b1c17]">Powered by</h4>
            <div className="space-y-2">
              <a 
                href="https://metmuseum.github.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-[#5A6B73] transition hover:text-[#1b1c17] focus:outline-none focus:ring-2 focus:ring-[#89A8B2] focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                Metropolitan Museum API
              </a>
              <a 
                href="https://github.com/harvardartmuseums/api-docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-[#5A6B73] transition hover:text-[#1b1c17] focus:outline-none focus:ring-2 focus:ring-[#89A8B2] focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                Harvard Art Museums API
              </a>
              <a 
                href="https://clerk.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-sm text-[#5A6B73] transition hover:text-[#1b1c17] focus:outline-none focus:ring-2 focus:ring-[#89A8B2] focus:ring-offset-2 focus:ring-offset-transparent rounded"
              >
                Clerk Authentication
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[#1b1c17]">Built with</h4>
            <div className="space-y-1">
              <p className="text-sm text-[#5A6B73]">React 18 + TypeScript</p>
              <p className="text-sm text-[#5A6B73]">Tailwind CSS</p>
              <p className="text-sm text-[#5A6B73]">Vite</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#89A8B2]/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-[#5A6B73]">
              © {new Date().getFullYear()} Assemblé. All rights reserved.
            </p>
            <p className="text-xs text-[#5A6B73]">
              Museum data provided by respective institutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
