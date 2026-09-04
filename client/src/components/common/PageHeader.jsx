import React from "react";

export const PageHeader = ({
  icon: Icon,
  title,
  subtitle,
  badgeText,
  rightContent,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            {badgeText && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                {badgeText}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </div>
  );
};

export default PageHeader;
