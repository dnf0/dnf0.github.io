"use client";

import React, { useState, useMemo } from "react";

interface CharStat {
  char: string;
  count: number;
  prob: number;
  shannonBits: number;
  roundedBits: number;
  huffmanCode: string;
  fixedCode: string;
  colorBg: string;
  colorText: string;
}

// Huffman tree node helper
interface Node {
  char?: string;
  freq: number;
  left?: Node;
  right?: Node;
}

function buildHuffman(freqMap: Record<string, number>): Record<string, string> {
  const chars = Object.keys(freqMap);
  if (chars.length === 0) return {};
  if (chars.length === 1) return { [chars[0]]: "0" };

  const heap: Node[] = chars.map((c) => ({ char: c, freq: freqMap[c] }));
  heap.sort((a, b) => a.freq - b.freq);

  while (heap.length > 1) {
    const left = heap.shift()!;
    const right = heap.shift()!;
    const parent: Node = { freq: left.freq + right.freq, left, right };
    heap.push(parent);
    heap.sort((a, b) => a.freq - b.freq);
  }

  const root = heap[0];
  const codes: Record<string, string> = {};

  function traverse(node: Node, currentCode: string) {
    if (node.char !== undefined) {
      codes[node.char] = currentCode || "0";
      return;
    }
    if (node.left) traverse(node.left, currentCode + "0");
    if (node.right) traverse(node.right, currentCode + "1");
  }

  traverse(root, "");
  return codes;
}

// Distinct badge colors for visualization
const COLOR_PALETTE = [
  { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-300" },
  { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
  { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  { bg: "bg-rose-100", text: "text-rose-800", border: "border-rose-300" },
  { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300" },
  { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300" },
];

export default function CompressionPlayground() {
  const presets = [
    { label: "Skewed Satellite (A-heavy)", text: "AAAAAAABBC" },
    { label: "Weather Record (Sunny/Rain)", text: "SSSSSSSSSSCCCCRRWW" },
    { label: "Equal Frequencies (Uniform)", text: "ABCDABCDABCD" },
    { label: "Single Constant (Extreme)", text: "AAAAAAAAAAAA" },
  ];

  const [inputMessage, setInputMessage] = useState<string>("AAAAAAABBC");

  const stats = useMemo(() => {
    const text = inputMessage.length > 0 ? inputMessage : "A";
    const N = text.length;

    const freqMap: Record<string, number> = {};
    for (const char of text) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }

    const uniqueChars = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a]);
    const M = uniqueChars.length;
    const fixedBitsPerChar = M <= 1 ? 1 : Math.ceil(Math.log2(M));

    const huffmanCodes = buildHuffman(freqMap);

    // Build fixed binary codes
    const fixedCodes: Record<string, string> = {};
    uniqueChars.forEach((c, idx) => {
      fixedCodes[c] = idx.toString(2).padStart(fixedBitsPerChar, "0");
    });

    let entropy = 0;
    const charStats: CharStat[] = uniqueChars.map((char, index) => {
      const count = freqMap[char];
      const prob = count / N;
      const shannonBits = prob > 0 ? -Math.log2(prob) : 0;
      entropy += prob * shannonBits;
      const color = COLOR_PALETTE[index % COLOR_PALETTE.length];

      return {
        char,
        count,
        prob,
        shannonBits,
        roundedBits: Math.ceil(shannonBits),
        huffmanCode: huffmanCodes[char] || "0",
        fixedCode: fixedCodes[char] || "0",
        colorBg: color.bg,
        colorText: color.text,
      };
    });

    const fixedTotalBits = N * fixedBitsPerChar;
    let optimalTotalBits = 0;
    for (const char of text) {
      optimalTotalBits += (huffmanCodes[char] || "0").length;
    }

    const theoreticalLowerBoundBits = N * entropy;
    const savingsPercent = fixedTotalBits > 0 
      ? Math.max(0, ((fixedTotalBits - optimalTotalBits) / fixedTotalBits) * 100) 
      : 0;

    return {
      N,
      M,
      fixedBitsPerChar,
      entropy,
      charStats,
      fixedTotalBits,
      optimalTotalBits,
      theoreticalLowerBoundBits,
      savingsPercent,
      huffmanCodes,
      fixedCodes,
    };
  }, [inputMessage]);

  return (
    <div className="my-8 p-6 rounded-2xl border border-stone-200 bg-stone-50/80 shadow-sm text-stone-900 not-prose">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-3 mb-4 gap-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full font-semibold">
            Interactive Simulation 2
          </span>
          <h3 className="text-lg font-bold text-stone-800 mt-1">
            Lossless Compression Simulator &amp; Lookup Table Generator
          </h3>
        </div>
        <div className="flex gap-4 font-mono text-xs">
          <div className="bg-white p-2 rounded-lg border border-stone-200 text-center">
            <span className="text-stone-500 block">Length (N)</span>
            <span className="font-bold text-stone-900 text-sm">{stats.N}</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-stone-200 text-center">
            <span className="text-stone-500 block">Alphabet (M)</span>
            <span className="font-bold text-stone-900 text-sm">{stats.M}</span>
          </div>
          <div className="bg-white p-2 rounded-lg border border-stone-200 text-center">
            <span className="text-stone-500 block">Entropy H(p)</span>
            <span className="font-bold text-emerald-600 text-sm">{stats.entropy.toFixed(2)} b/sym</span>
          </div>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
          Try a preset or type your own sequence:
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setInputMessage(preset.text)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                inputMessage === preset.text
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-100"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value.toUpperCase())}
          placeholder="TYPE ANY CHARACTERS HERE..."
          className="w-full font-mono text-sm uppercase px-4 py-2.5 rounded-xl border border-stone-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent tracking-widest text-stone-900"
        />
      </div>

      {/* Lookup Table Breakdown */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center justify-between">
          <span>Shannon Symbol Analysis &amp; Lookup Table T</span>
          <span className="text-stone-400 font-normal">Equation (2) &amp; (3)</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-sans">
                <th className="pb-2">Symbol (xᵢ)</th>
                <th className="pb-2">Count (nᵢ)</th>
                <th className="pb-2">Prob (pᵢ)</th>
                <th className="pb-2">Shannon bᵢ = log₂(1/pᵢ)</th>
                <th className="pb-2">Naive Fixed Code</th>
                <th className="pb-2">Optimal Shannon Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stats.charStats.map((item) => (
                <tr key={item.char} className="hover:bg-stone-50/60">
                  <td className="py-2.5 font-bold">
                    <span className={`inline-block px-2 py-0.5 rounded ${item.colorBg} ${item.colorText}`}>
                      {item.char}
                    </span>
                  </td>
                  <td className="py-2.5 text-stone-700">{item.count}</td>
                  <td className="py-2.5 text-stone-700">{(item.prob * 100).toFixed(1)}%</td>
                  <td className="py-2.5 text-stone-900 font-semibold">
                    {item.shannonBits.toFixed(2)} <span className="text-stone-400">bits</span>
                  </td>
                  <td className="py-2.5 text-stone-500">
                    <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">{item.fixedCode}</code> ({stats.fixedBitsPerChar} bits)
                  </td>
                  <td className="py-2.5">
                    <code className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                      {item.huffmanCode}
                    </code> ({item.huffmanCode.length} bits)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 font-mono text-xs">
        <div className="p-4 bg-white rounded-xl border border-stone-200">
          <span className="text-stone-500 block mb-1">Naive Fixed-Length</span>
          <span className="text-xl font-bold text-stone-800 block">{stats.fixedTotalBits} bits</span>
          <span className="text-[11px] text-stone-400 font-sans block mt-1">
            {stats.N} symbols × {stats.fixedBitsPerChar} bits = {stats.fixedTotalBits} bits
          </span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div className="flex justify-between items-center mb-1">
            <span className="text-emerald-700 font-semibold">Shannon Optimal Code</span>
            <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
              -{stats.savingsPercent.toFixed(0)}% Space
            </span>
          </div>
          <span className="text-xl font-bold text-emerald-700 block">{stats.optimalTotalBits} bits</span>
          <span className="text-[11px] text-emerald-600 font-sans block mt-1">
            Average: {(stats.optimalTotalBits / stats.N).toFixed(2)} bits / symbol
          </span>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
          <span className="text-purple-700 font-semibold block mb-1">Theoretical Shannon Limit</span>
          <span className="text-xl font-bold text-purple-700 block">{stats.theoreticalLowerBoundBits.toFixed(1)} bits</span>
          <span className="text-[11px] text-purple-600 font-sans block mt-1">
            N × H(p) = {stats.N} × {stats.entropy.toFixed(2)} bits
          </span>
        </div>
      </div>

      {/* Encoded Bitstream Comparison */}
      <div className="bg-stone-900 text-stone-100 p-4 rounded-xl font-mono text-xs">
        <div className="text-stone-400 uppercase tracking-wider text-[11px] font-semibold mb-2 flex justify-between">
          <span>Transmitted Bitstream Comparison:</span>
          <span className="text-emerald-400">Prefix-free (No separators needed)</span>
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-stone-400 text-[10px] block mb-0.5">Fixed ({stats.fixedTotalBits} bits):</span>
            <div className="bg-stone-950/80 p-2.5 rounded-lg break-all tracking-wider text-stone-400 text-[11px] leading-relaxed">
              {inputMessage.split("").map((c, i) => (
                <span key={i} className="hover:text-white transition-colors mr-0.5">
                  {stats.fixedCodes[c]}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-emerald-400 text-[10px] block mb-0.5">Shannon Optimal ({stats.optimalTotalBits} bits):</span>
            <div className="bg-stone-950/80 p-2.5 rounded-lg break-all tracking-wider text-emerald-400 font-bold text-[11px] leading-relaxed">
              {inputMessage.split("").map((c, i) => {
                const stat = stats.charStats.find((s) => s.char === c);
                return (
                  <span
                    key={i}
                    title={`Symbol ${c}: ${stats.huffmanCodes[c]}`}
                    className="hover:underline hover:text-emerald-200 transition-colors mr-0.5"
                  >
                    {stats.huffmanCodes[c]}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
