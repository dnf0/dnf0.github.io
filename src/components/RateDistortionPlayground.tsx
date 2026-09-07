'use client';

import React, { useState, useMemo } from 'react';

export default function RateDistortionPlayground() {
  // Compression parameters
  const [lambda, setLambda] = useState<number>(15);
  const [quantBits, setQuantBits] = useState<number>(3); // 1 to 6 bits (K = 2 to 64)
  const [autoOptimize, setAutoOptimize] = useState<boolean>(true);
  const [signalType, setSignalType] = useState<'elevation' | 'spectral' | 'temperature'>('elevation');

  // Generate synthetic signal data (N = 64 samples)
  const N = 64;
  const originalSignal = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
      const t = i / N;
      if (signalType === 'elevation') {
        // Multi-frequency terrain profile
        arr.push(0.5 + 0.3 * Math.sin(2 * Math.PI * t * 2) + 0.15 * Math.sin(2 * Math.PI * t * 7) + 0.05 * Math.cos(2 * Math.PI * t * 15));
      } else if (signalType === 'spectral') {
        // Multispectral band reflection with sharp absorption troughs
        const val = 0.7 * Math.exp(-Math.pow((t - 0.3) / 0.1, 2)) + 0.5 * Math.exp(-Math.pow((t - 0.7) / 0.15, 2)) + 0.15;
        arr.push(Math.min(1.0, Math.max(0.0, val)));
      } else {
        // Temperature gradient with diurnal cycle
        arr.push(0.4 + 0.4 * Math.sin(2 * Math.PI * t - Math.PI / 2) + 0.1 * Math.sin(2 * Math.PI * t * 4));
      }
    }
    return arr;
  }, [signalType]);

  // Compute Pareto curve points and evaluate L = lambda * D + R for each candidate bit-depth
  const candidateConfigs = useMemo(() => {
    const configs = [];
    for (let bits = 1; bits <= 6; bits++) {
      const kCentroids = Math.pow(2, bits);
      const step = 1.0 / kCentroids;
      const binCounts: { [key: number]: number } = {};
      for (let k = 0; k < kCentroids; k++) binCounts[k] = 0;

      const qSignal = originalSignal.map(x => {
        const binIdx = Math.min(kCentroids - 1, Math.max(0, Math.floor(x / step)));
        binCounts[binIdx] = (binCounts[binIdx] || 0) + 1;
        return (binIdx + 0.5) * step;
      });

      let entropy = 0;
      Object.values(binCounts).forEach(c => {
        if (c > 0) {
          const p = c / N;
          entropy -= p * Math.log2(p);
        }
      });

      let sumSqErr = 0;
      for (let i = 0; i < N; i++) {
        const err = originalSignal[i] - qSignal[i];
        sumSqErr += err * err;
      }
      const distortionD = sumSqErr / N;
      const scaledD = distortionD * 200; // scaling factor for numerical balance
      const lossL = lambda * scaledD + entropy;

      configs.push({
        bits,
        kCentroids,
        qSignal,
        rateR: entropy,
        distortionD,
        scaledD,
        lossL
      });
    }
    return configs;
  }, [originalSignal, lambda]);

  // Find the globally optimal configuration that minimizes L = lambda * D + R
  const optimalConfig = useMemo(() => {
    return candidateConfigs.reduce((best, curr) => (curr.lossL < best.lossL ? curr : best), candidateConfigs[0]);
  }, [candidateConfigs]);

  // Active configuration: either auto-optimized by lambda or manually selected
  const activeConfig = useMemo(() => {
    if (autoOptimize) {
      return optimalConfig;
    }
    return candidateConfigs.find(c => c.bits === quantBits) || candidateConfigs[2];
  }, [autoOptimize, optimalConfig, candidateConfigs, quantBits]);

  const activeBits = activeConfig.bits;
  const activeK = activeConfig.kCentroids;
  const activeQuantised = activeConfig.qSignal;
  const activeRate = activeConfig.rateR;
  const activeDistortion = activeConfig.distortionD;
  const activeLoss = activeConfig.lossL;

  // Uncompressed baseline
  const uncompressedBits = 32.0;
  const compressionRatio = (uncompressedBits / Math.max(0.01, activeRate)).toFixed(1);

  return (
    <div className="my-8 rounded-xl border border-slate-700 bg-slate-900/90 p-6 text-slate-100 shadow-2xl backdrop-blur">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-800 pb-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-sky-400">
            Interactive Rate-Distortion & Neural Quantization Lab
          </h3>
          <p className="text-sm text-slate-400">
            Adjust the Lagrange Multiplier <code className="text-amber-400">λ</code> to observe how the optimizer trades off Bitrate <code className="text-cyan-400">R</code> vs Distortion <code className="text-rose-400">D</code>.
          </p>
        </div>

        {/* Signal Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Signal:</span>
          <select
            value={signalType}
            onChange={(e) => setSignalType(e.target.value as any)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 outline-none transition focus:border-sky-500"
          >
            <option value="elevation">Topographic Elevation Profile</option>
            <option value="spectral">Multispectral Band Reflection</option>
            <option value="temperature">Diurnal Climate Sensor Field</option>
          </select>
        </div>
      </div>

      {/* Optimization Mode & Sliders */}
      <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
        {/* Toggle between Auto-Optimizer and Manual */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Optimization Mode:</span>
            <button
              onClick={() => setAutoOptimize(true)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                autoOptimize
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Auto-Optimize for λ (min λD + R)
            </button>
            <button
              onClick={() => setAutoOptimize(false)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                !autoOptimize
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Manual Precision Control
            </button>
          </div>
          <div className="text-xs text-slate-400">
            {autoOptimize ? (
              <span className="text-amber-400 font-medium">
                λ automatically drives optimal precision (K* = {activeK})
              </span>
            ) : (
              <span className="text-sky-400 font-medium">
                Manual precision selected (K = {activeK})
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Lambda Trade-off Slider */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Lagrange Multiplier (λ): <strong className="text-amber-400">{lambda}</strong>
              </span>
              <span className="text-slate-400">
                Target: {lambda <= 5 ? 'High Compression (Rate priority)' : lambda >= 25 ? 'High Fidelity (Distortion priority)' : 'Balanced Codec'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={lambda}
              onChange={(e) => setLambda(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-amber-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500">
              <span>λ = 1 (Tiny files, coarse)</span>
              <span>λ = 15 (Balanced)</span>
              <span>λ = 50 (Pristine, high rate)</span>
            </div>
          </div>

          {/* Quantization Bit Depth Slider */}
          <div className={autoOptimize ? 'opacity-50 pointer-events-none' : ''}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Quantization Precision: <strong className="text-sky-400">{activeBits} bits / sample</strong>
              </span>
              <span className="text-slate-400">
                Codebook Centroids: <strong className="text-cyan-400">K = {activeK}</strong>
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={activeBits}
              onChange={(e) => setQuantBits(Number(e.target.value))}
              disabled={autoOptimize}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-400"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500">
              <span>1 bit (K=2)</span>
              <span>3 bits (K=8)</span>
              <span>6 bits (K=64)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Visualizations Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Signal Reconstruction Waveform */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Signal Reconstruction: Original x vs. Reconstructed x'
            </span>
            <div className="flex gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-400" /> Original x
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Reconstructed x'
              </span>
            </div>
          </div>

          <div className="relative h-44 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 320 140" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="320" y2="20" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1="70" x2="320" y2="70" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1="120" x2="320" y2="120" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.8" />

              {/* Quantization Step Levels */}
              {Array.from({ length: Math.min(activeK, 32) }).map((_, idx) => {
                const yPos = 130 - (idx + 0.5) * (120 / activeK);
                return (
                  <line
                    key={idx}
                    x1="0"
                    y1={yPos}
                    x2="320"
                    y2={yPos}
                    stroke="#F59E0B"
                    strokeOpacity={0.12}
                    strokeWidth="1"
                  />
                );
              })}

              {/* Original Signal Path */}
              <polyline
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.5"
                points={originalSignal.map((val, idx) => `${(idx / (N - 1)) * 320},${130 - val * 120}`).join(' ')}
              />

              {/* Quantized Reconstruction Path (Staircase) */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2.2"
                strokeDasharray={activeBits < 4 ? "4 2" : "none"}
                points={activeQuantised.map((val, idx) => `${(idx / (N - 1)) * 320},${130 - val * 120}`).join(' ')}
              />
            </svg>
          </div>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            {autoOptimize ? (
              <span>
                At <span className="text-amber-400">λ = {lambda}</span>, optimizer selects <span className="text-emerald-400">{activeBits}-bit precision ({activeK} centroids)</span> to minimize <span className="text-slate-200">λD + R</span>.
              </span>
            ) : (
              <span>
                Signal quantised to <span className="text-emerald-400">{activeK} centroids</span>.
              </span>
            )}
          </p>
        </div>

        {/* Rate-Distortion Optimization Curve with Dynamic Tangent Slope */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Pareto Frontier & Lagrangian Tangent Line
            </span>
            <span className="text-xs font-semibold text-amber-400">
              Tangent Slope: m = −{(1 / Math.max(0.1, lambda)).toFixed(3)}
            </span>
          </div>

          <div className="relative h-44 w-full">
            <svg className="h-full w-full" viewBox="0 0 300 140">
              <defs>
                <clipPath id="rd-plot-area">
                  <rect x="30" y="15" width="265" height="105" />
                </clipPath>
              </defs>

              {/* Axes */}
              <line x1="30" y1="120" x2="290" y2="120" stroke="#475569" strokeWidth="1.2" />
              <line x1="30" y1="15" x2="30" y2="120" stroke="#475569" strokeWidth="1.2" />

              {/* Axis Labels */}
              <text x="290" y="132" fill="#94A3B8" fontSize="9" textAnchor="end">Rate R (bits/sample) →</text>
              <text x="35" y="12" fill="#94A3B8" fontSize="9">Distortion D (MSE) ↑</text>

              <g clipPath="url(#rd-plot-area)">
                {/* Theoretical Pareto Curve (Continuous, bounded within py >= 18) */}
                {(() => {
                  const curvePts: string[] = [];
                  // Start at r=0.92 where py ~ 18 (top of Y axis)
                  for (let r = 0.92; r <= 5.5; r += 0.05) {
                    const d = 0.8 / Math.pow(r, 1.4) + 0.02;
                    const px = 35 + ((r - 0.5) / 5.0) * 240;
                    const py = Math.max(18, Math.min(120, 120 - (d / 0.9) * 100));
                    curvePts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
                  }
                  return (
                    <polyline
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="2.5"
                      points={curvePts.join(' ')}
                    />
                  );
                })()}

                {/* Plot candidate discrete codec configurations */}
                {candidateConfigs.map((cfg) => {
                  const px = 35 + ((Math.max(0.5, Math.min(5.5, cfg.rateR)) - 0.5) / 5.0) * 240;
                  const approxD = 0.8 / Math.pow(Math.max(0.9, cfg.rateR), 1.4) + 0.02;
                  const py = Math.max(20, Math.min(118, 120 - (approxD / 0.9) * 100));
                  const isSelected = cfg.bits === activeBits;
                  return (
                    <g key={cfg.bits}>
                      <circle
                        cx={px}
                        cy={py}
                        r={isSelected ? "5.5" : "3.5"}
                        fill={isSelected ? "#F43F5E" : "#64748B"}
                        stroke="#FFF"
                        strokeWidth={isSelected ? "1.8" : "0.5"}
                      />
                      <text x={px + 5} y={py - 4} fill={isSelected ? "#F43F5E" : "#94A3B8"} fontSize={isSelected ? "9" : "7.5"} fontWeight={isSelected ? "bold" : "normal"}>
                        {cfg.bits}b
                      </text>
                    </g>
                  );
                })}

                {/* Dynamic Lagrangian Tangent Line: bounded within plot */}
                {(() => {
                  // Calculate theoretical r*(lambda) on Pareto curve: r* = (1.12 * lambda)^(1/2.4)
                  const rOpt = Math.max(1.0, Math.min(5.2, Math.pow(1.12 * lambda, 1.0 / 2.4)));
                  const dOpt = 0.8 / Math.pow(rOpt, 1.4) + 0.02;

                  const curPx = 35 + ((rOpt - 0.5) / 5.0) * 240;
                  const curPy = Math.max(20, Math.min(118, 120 - (dOpt / 0.9) * 100));

                  const svgSlope = 2.315 / Math.max(0.5, lambda);
                  const dx = 40;
                  const dy = svgSlope * dx;

                  return (
                    <g>
                      {/* Tangent line segment */}
                      <line
                        x1={curPx - dx}
                        y1={curPy - dy}
                        x2={curPx + dx}
                        y2={curPy + dy}
                        stroke="#F59E0B"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                      {/* Tangent contact point */}
                      <circle cx={curPx} cy={curPy} r="5.5" fill="#F59E0B" stroke="#FFF" strokeWidth="1.5" />
                      <text x={Math.min(230, curPx + 8)} y={Math.max(25, curPy - 8)} fill="#F59E0B" fontSize="8.5" fontWeight="bold">
                        λ-Tangent (R*={rOpt.toFixed(2)})
                      </text>
                    </g>
                  );
                })()}
              </g>
            </svg>
          </div>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            Lagrangian tangent line <span className="text-amber-400">Slope = −1/λ</span> touches the Pareto frontier at the optimal operating point.
          </p>
        </div>
      </div>

      {/* Metric Cards Matrix */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Metric 1: Rate */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Shannon Rate (R)
          </div>
          <div className="mt-1 text-lg font-black text-cyan-400">
            {activeRate.toFixed(2)} <span className="text-xs font-normal text-slate-400">bits/sym</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Entropy Bound <code className="text-slate-400">H(ẑ)</code>
          </div>
        </div>

        {/* Metric 2: Distortion MSE */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Distortion (MSE)
          </div>
          <div className="mt-1 text-lg font-black text-rose-400">
            {(activeDistortion * 1000).toFixed(2)} <span className="text-xs font-normal text-slate-400">×10⁻³</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Error <code className="text-slate-400">ρ(x, x')</code>
          </div>
        </div>

        {/* Metric 3: Compression Ratio */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Compression Ratio
          </div>
          <div className="mt-1 text-lg font-black text-emerald-400">
            {compressionRatio} : 1
          </div>
          <div className="text-[10px] text-slate-500">
            vs. 32-bit Raw Float
          </div>
        </div>

        {/* Metric 4: Lagrangian Loss */}
        <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Total Loss (λD + R)
          </div>
          <div className="mt-1 text-lg font-black text-amber-400">
            {activeLoss.toFixed(2)}
          </div>
          <div className="text-[10px] text-slate-500">
            Objective Minimized
          </div>
        </div>
      </div>
    </div>
  );
}
