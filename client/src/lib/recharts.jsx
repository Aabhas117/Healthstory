import React from 'react';

export const ResponsiveContainer = ({ children, width = "100%", height = 300 }) => {
  return (
    <div style={{ width, height, position: 'relative' }} className="w-full h-full">
      {children}
    </div>
  );
};

export const BarChart = ({ data = [], children, margin = { top: 20, right: 20, bottom: 20, left: 20 } }) => {
  if (!data || data.length === 0) return null;
  
  // Extract max value for scaling
  const dataKeys = [];
  React.Children.forEach(children, (child) => {
    if (child && child.type === Bar) {
      dataKeys.push(child.props.dataKey);
    }
  });

  let maxVal = 10;
  data.forEach(item => {
    dataKeys.forEach(key => {
      if (item[key] > maxVal) maxVal = item[key];
    });
  });

  return (
    <div className="w-full h-full flex flex-col justify-between py-2">
      <div className="flex-1 flex items-end justify-between gap-3 px-4 pt-6 border-b border-slate-700/60 pb-2">
        {data.map((item, idx) => {
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full flex items-end justify-center gap-1 h-44">
                {dataKeys.map(key => {
                  const val = item[key] || 0;
                  const heightPct = Math.max(8, Math.round((val / maxVal) * 100));
                  const isRedFlag = key.toLowerCase().includes('red') || key.toLowerCase().includes('alert');
                  return (
                    <div 
                      key={key} 
                      style={{ height: `${heightPct}%` }}
                      className={`w-full max-w-[28px] rounded-t transition-all duration-300 relative ${
                        isRedFlag ? 'bg-rose-500 hover:bg-rose-400' : 'bg-teal-500 hover:bg-teal-400'
                      }`}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-0.5 rounded border border-slate-600 whitespace-nowrap z-10 font-semibold shadow-lg">
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="text-xs text-slate-400 font-medium truncate max-w-[60px]">{item.name || item.time || item.day || `P${idx+1}`}</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-6 pt-3 text-xs text-slate-400">
        {dataKeys.map(key => (
          <div key={key} className="flex items-center gap-1.5 capitalize">
            <span className={`w-3 h-3 rounded-sm ${key.toLowerCase().includes('red') ? 'bg-rose-500' : 'bg-teal-500'}`}></span>
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Bar = () => null;
export const Line = () => null;
export const Pie = () => null;
export const Cell = () => null;
export const XAxis = () => null;
export const YAxis = () => null;
export const Tooltip = () => null;
export const CartesianGrid = () => null;
export const Legend = () => null;

export const LineChart = BarChart;
export const PieChart = BarChart;
