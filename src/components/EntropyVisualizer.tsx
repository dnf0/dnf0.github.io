"use client";

import React, { useState } from "react";

export default function EntropyVisualizer() {
  // Probability p for event 1 (ranging from 0.001 to 0.999)
  const [p, setP] = useState<number>(0.5);

  // Compute binary entropy in bits
  const calcEntropy = (prob: number): number => {
    if (prob <= 0 || prob >= 1) return 0;
    const p1 = prob;
    const p2 = 1 - prob;
    return -(p1 * Math.log2(p1) + p2 * Math.log2(p2));
  };

  const currentEntropy = calcEntropy(p);
  const surprise1 = p > 0 ? -Math.log2(p) : 0;
  const surprise2 = 1 - p > 0 ? -Math.log2(1 - p) : 0;

  // Generate SVG path for the entropy curve
  const width = 440;
  const height = 180;
  const padding = 35;

  const points: [number, number][] = [];
  const steps = 100;
  for (let i = 1; i < steps; i++) {
    const xVal = i / steps;
    const yVal = calcEntropy(xVal); // 0 to 1
    const svgX = padding + xVal * (width - 2 * padding);
    const svgY = height - padding - yVal * (height - 2 * padding);
    points.push([svgX, svgY]);
  }

  const pathD = points.reduce((acc, [x, y], idx) => {
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  // Current marker position on SVG
  const currentSvgX = padding + p * (width - 2 * padding);
  const currentSvgY = height - padding - currentEntropy * (height - 2 * padding);

  return (
    <div className="my-8 p-6 rounded-2xl border border-stone-200 bg-stone-50/80 shadow-sm text-stone-900 not-prose">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-semibold">
            Interactive Simulation 1
          </span>
          <h3 className="text-lg font-bold text-stone-800 mt-1">
            The Binary Entropy Curve &amp; "Surprise-O-Meter"
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-500 font-mono block">Entropy H(p)</span>
          <span className="text-2xl font-bold font-mono text-emerald-600">
            {currentEntropy.toFixed(3)} <span className="text-xs text-stone-500">bits</span>
          </span>
        </div>
      </div>

      <p className="text-sm text-stone-600 mb-6">
        Drag the slider below to change the probability <code className="font-mono bg-stone-200/70 px-1 py-0.5 rounded text-stone-800">p₁</code> of flipping Heads vs Tails. Watch how entropy peaks at pure uncertainty (<code className="font-mono">p = 0.5</code>) and drops to zero when the outcome is guaranteed.
      </p>

      {/* Slider Control */}
      <div className="mb-6 bg-white p-4 rounded-xl border border-stone-200">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="prob-slider" className="text-xs font-semibold uppercase tracking-wider text-stone-600">
            Probability of Heads: <span className="font-mono text-stone-900 font-bold text-sm">{(p * 100).toFixed(1)}%</span>
          </label>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
            Probability of Tails: <span className="font-mono text-stone-900 font-bold text-sm">{((1 - p) * 100).toFixed(1)}%</span>
          </span>
        </div>
        <input
          id="prob-slider"
          type="range"
          min="0.01"
          max="0.99"
          step="0.01"
          value={p}
          onChange={(e) => setP(parseFloat(e.target.value))}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />
        <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
          <span>0.0 (Always Tails)</span>
          <span className="font-semibold text-stone-600">0.5 (Fair Coin / Max Uncertainty)</span>
          <span>1.0 (Always Heads)</span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col items-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[480px] h-auto overflow-visible">
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d6d3d1" strokeWidth="1.5" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#d6d3d1" strokeWidth="1.5" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#e7e5e4" strokeDasharray="3 3" />
          <line x1={width / 2} y1={padding} x2={width / 2} y2={height - padding} stroke="#e7e5e4" strokeDasharray="3 3" />

          {/* Curve Area under graph */}
          <path
            d={`${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
            fill="url(#emerald-gradient)"
            opacity="0.15"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Entropy Path */}
          <path d={pathD} fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />

          {/* Axis Labels */}
          <text x={padding} y={height - 12} fontSize="11" fill="#78716c" textAnchor="middle" fontFamily="monospace">0</text>
          <text x={width / 2} y={height - 12} fontSize="11" fill="#78716c" textAnchor="middle" fontFamily="monospace">0.5</text>
          <text x={width - padding} y={height - 12} fontSize="11" fill="#78716c" textAnchor="middle" fontFamily="monospace">1.0</text>
          
          <text x={padding - 10} y={padding + 4} fontSize="11" fill="#78716c" textAnchor="end" fontFamily="monospace">1.0</text>
          <text x={padding - 10} y={height - padding} fontSize="11" fill="#78716c" textAnchor="end" fontFamily="monospace">0.0</text>

          {/* Active point indicator */}
          <circle cx={currentSvgX} cy={currentSvgY} r="6" fill="#059669" stroke="#ffffff" strokeWidth="2.5" className="shadow-md" />
          <line x1={currentSvgX} y1={currentSvgY} x2={currentSvgX} y2={height - padding} stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>

        {/* Dynamic Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-700">🪙 Heads (Outcome 1)</span>
              <span className="font-mono text-stone-500">p₁ = {p.toFixed(2)}</span>
            </div>
            <div className="mt-1 text-xs text-stone-600">
              Surprise: <span className="font-mono font-bold text-stone-900">{surprise1.toFixed(2)} bits</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">log₂(1 / {p.toFixed(2)})</span>
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-700">🪙 Tails (Outcome 2)</span>
              <span className="font-mono text-stone-500">p₂ = {(1 - p).toFixed(2)}</span>
            </div>
            <div className="mt-1 text-xs text-stone-600">
              Surprise: <span className="font-mono font-bold text-stone-900">{surprise2.toFixed(2)} bits</span>
              <span className="text-[11px] text-stone-400 block mt-0.5">log₂(1 / {(1 - p).toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* State intuition callout */}
      <div className="mt-4 p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-600">
        <span className="font-semibold text-stone-800">Key Takeaway: </span>
        {p === 0.5 ? (
          <span>At <code className="font-mono">p = 0.5</code>, both outcomes are equally likely (Uniform). You have zero clues ahead of time, maximizing uncertainty at exactly <strong>1.000 bit</strong>.</span>
        ) : p > 0.8 || p < 0.2 ? (
          <span>As one probability approaches 100%, predictability surges and uncertainty evaporates. Shannon entropy collapses toward <strong>0 bits</strong> because the outcome carries virtually no surprise!</span>
        ) : (
          <span>Asymmetry introduces predictability. Since the outcome is biased, the weighted average number of bits required to encode the result is strictly less than 1 bit.</span>
        )}
      </div>
    </div>
  );
}
