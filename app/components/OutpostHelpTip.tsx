"use client";

import React, { useState } from "react";

export function OutpostHelpTip() {
  const [showTip, setShowTip] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTip(!showTip)}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        className="text-lg leading-none hover:scale-110 transition-transform"
        aria-label="What is an outpost?"
      >
        ☄️
      </button>
      
      {showTip && (
        <>
          {/* Backdrop for mobile tap outside to close */}
          <div 
            className="fixed inset-0 z-40 sm:hidden" 
            onClick={() => setShowTip(false)}
          />
          
          {/* Tooltip bubble */}
          <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <p className="text-xs text-gray-900 dark:text-gray-100 leading-relaxed">
              Outposts are third-party locations selling your inventory on your behalf—essentially, 
              these are your consignment partners. You supply the items, they make the sale, 
              and you get paid minus their cut.
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45" />
          </div>
        </>
      )}
    </div>
  );
}