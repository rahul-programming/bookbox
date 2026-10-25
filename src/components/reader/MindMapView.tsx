import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Book, MindMapNode } from '../../types';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2,
  RotateCcw, 
  Search, 
  Download, 
  ChevronRight, 
  BookOpen, 
  Layers,
  Sparkles,
  Info,
  Volume2,
  X
} from 'lucide-react';

interface MindMapViewProps {
  book: Book;
  onStartAudio: (headline: string, text: string) => void;
  fontSizeIndex?: number;
}

interface LayoutNode {
  id: string;
  label: string;
  description?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
  branchIdx: number;
  isLeft: boolean;
  children: LayoutNode[];
  isExpanded: boolean;
  rawNode: MindMapNode;
  parent?: LayoutNode;
}

interface ConnectorPath {
  id: string;
  d: string;
  color: string;
  isHighlighted: boolean;
}

const BRANCH_COLORS = [
  { stroke: '#10b981', fill: '#ecfdf5', darkFill: '#064e3b', border: '#10b981', text: '#065f46', darkText: '#a7f3d0' }, // Emerald
  { stroke: '#6366f1', fill: '#eef2ff', darkFill: '#312e81', border: '#6366f1', text: '#3730a3', darkText: '#c7d2fe' }, // Indigo
  { stroke: '#f59e0b', fill: '#fffbeb', darkFill: '#78350f', border: '#f59e0b', text: '#92400e', darkText: '#fde68a' }, // Amber
  { stroke: '#8b5cf6', fill: '#f5f3ff', darkFill: '#4c1d95', border: '#8b5cf6', text: '#5b21b6', darkText: '#ddd6fe' }, // Violet
  { stroke: '#f43f5e', fill: '#fff1f2', darkFill: '#881337', border: '#f43f5e', text: '#9f1239', darkText: '#fecdd3' }, // Rose
  { stroke: '#06b6d4', fill: '#ecfeff', darkFill: '#164e63', border: '#06b6d4', text: '#155e75', darkText: '#a5f3fc' }, // Cyan
];

export const MindMapView: React.FC<MindMapViewProps> = ({ book, onStartAudio, fontSizeIndex = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Canvas Viewport State (Pan & Zoom)
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map Mode: 'bilateral' (Bilateral radial tree) or 'horizontal' (Left-to-right logic chart)
  const [layoutMode, setLayoutMode] = useState<'bilateral' | 'horizontal'>('bilateral');

  // Search Filter
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Node for Detailed Inspector
  const [selectedNodeId, setSelectedNodeId] = useState<string>(book.mindMap.id);

  // Concept View Mode: 'detailed' (shows in-depth conceptual summaries inside diagram nodes) vs 'compact'
  const [nodeViewMode, setNodeViewMode] = useState<'detailed' | 'compact'>('detailed');

  // Branch Collapse/Expand State
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Toggle fullscreen and lock body scroll
  const toggleFullscreen = () => {
    setIsFullscreen(prev => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return next;
    });
  };

  // Escape key exits fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen]);

  // Toggle Collapse/Expand
  const toggleNodeExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMap(prev => ({
      ...prev,
      [nodeId]: prev[nodeId] === false ? true : false
    }));
  };

  // Dimensions
  const ROOT_WIDTH = nodeViewMode === 'detailed' ? 320 : 250;
  const NODE_WIDTH = nodeViewMode === 'detailed' ? 300 : 210;
  const H_GAP = nodeViewMode === 'detailed' ? 95 : 85;
  const V_GAP = nodeViewMode === 'detailed' ? 24 : 20;

  // Calculate dynamic height for any node to accommodate its full content in place
  const getNodeHeight = (node: MindMapNode, isRoot = false): number => {
    const rawDesc = node.description || '';
    const sentences = rawDesc.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean);
    let descLines = 0;
    for (const s of sentences) {
      descLines += Math.max(1, Math.ceil(s.length / (isRoot ? 38 : 42)));
    }

    if (isRoot) {
      if (nodeViewMode === 'compact') return 70;
      const sentenceBreaks = Math.max(0, sentences.length - 1);
      return Math.max(90, 64 + descLines * 18 + sentenceBreaks * 4);
    }

    if (nodeViewMode === 'compact') return 52;

    const labelLen = node.label.length;
    const labelLines = Math.max(1, Math.ceil(labelLen / 30));

    // Padding (py-3 = 24px) + badge/header row (18px) + label text + description spacing and lines
    let height = 24 + 18 + (labelLines * 17);
    if (descLines > 0) {
      const sentenceBreaks = Math.max(0, sentences.length - 1);
      height += 6 + (descLines * 16) + (sentenceBreaks * 4);
    }
    return Math.max(76, height);
  };

  // Calculate layout coordinates recursively
  const { layoutTree, connectors, bounds } = useMemo(() => {
    const rawRoot = book.mindMap;

    // Helper to calculate total bounding height of a subtree
    const getSubtreeHeight = (node: MindMapNode): number => {
      const isExpanded = expandedMap[node.id] !== false;
      const selfHeight = getNodeHeight(node);
      if (!isExpanded || !node.children || node.children.length === 0) {
        return selfHeight;
      }
      let childrenTotalH = 0;
      for (const child of node.children) {
        childrenTotalH += getSubtreeHeight(child);
      }
      childrenTotalH += (node.children.length - 1) * V_GAP;
      return Math.max(selfHeight, childrenTotalH);
    };

    // Construct LayoutNode hierarchy
    const rootH = getNodeHeight(rawRoot, true);
    const rootLayout: LayoutNode = {
      id: rawRoot.id,
      label: rawRoot.label,
      description: rawRoot.description,
      x: -ROOT_WIDTH / 2,
      y: -rootH / 2,
      width: ROOT_WIDTH,
      height: rootH,
      level: 0,
      branchIdx: 0,
      isLeft: false,
      children: [],
      isExpanded: expandedMap[rawRoot.id] !== false,
      rawNode: rawRoot
    };

    const primaryChildren = rawRoot.children || [];
    let rightChildren: MindMapNode[] = [];
    let leftChildren: MindMapNode[] = [];

    if (layoutMode === 'horizontal') {
      rightChildren = primaryChildren;
      leftChildren = [];
    } else {
      // Bilateral: Alternate branches left and right
      primaryChildren.forEach((child, i) => {
        if (i % 2 === 0) {
          rightChildren.push(child);
        } else {
          leftChildren.push(child);
        }
      });
    }

    // Lay out subtrees recursively
    const layoutSubtree = (
      node: MindMapNode, 
      level: number, 
      branchIdx: number, 
      isLeft: boolean, 
      startX: number, 
      startY: number,
      parent: LayoutNode
    ): LayoutNode => {
      const isExpanded = expandedMap[node.id] !== false;
      const currentHeight = getNodeHeight(node);
      const currentLayout: LayoutNode = {
        id: node.id,
        label: node.label,
        description: node.description,
        x: startX,
        y: startY,
        width: NODE_WIDTH,
        height: currentHeight,
        level,
        branchIdx,
        isLeft,
        children: [],
        isExpanded,
        rawNode: node,
        parent
      };

      if (isExpanded && node.children && node.children.length > 0) {
        let totalChildrenH = 0;
        node.children.forEach(c => {
          totalChildrenH += getSubtreeHeight(c);
        });
        totalChildrenH += (node.children.length - 1) * V_GAP;

        const parentCenterY = startY + currentHeight / 2;
        let currentChildY = parentCenterY - totalChildrenH / 2;
        const nextX = isLeft 
          ? startX - NODE_WIDTH - H_GAP 
          : startX + NODE_WIDTH + H_GAP;

        node.children.forEach(child => {
          const childSubtreeHeight = getSubtreeHeight(child);
          const childH = getNodeHeight(child);
          const childTopY = currentChildY + (childSubtreeHeight - childH) / 2;
          const childLayout = layoutSubtree(
            child, 
            level + 1, 
            branchIdx, 
            isLeft, 
            nextX, 
            childTopY, 
            currentLayout
          );
          currentLayout.children.push(childLayout);
          currentChildY += childSubtreeHeight + V_GAP;
        });
      }

      return currentLayout;
    };

    // Right Side Layout
    if (rightChildren.length > 0) {
      let totalRightH = 0;
      rightChildren.forEach(c => {
        totalRightH += getSubtreeHeight(c);
      });
      totalRightH += (rightChildren.length - 1) * V_GAP;

      let currentY = -totalRightH / 2;
      const startX = ROOT_WIDTH / 2 + H_GAP;

      rightChildren.forEach((childNode) => {
        const origIdx = primaryChildren.indexOf(childNode);
        const branchColorIdx = origIdx % BRANCH_COLORS.length;
        const subH = getSubtreeHeight(childNode);
        const childH = getNodeHeight(childNode);
        const childTopY = currentY + (subH - childH) / 2;

        const childLayout = layoutSubtree(
          childNode,
          1,
          branchColorIdx,
          false,
          startX,
          childTopY,
          rootLayout
        );
        rootLayout.children.push(childLayout);
        currentY += subH + V_GAP;
      });
    }

    // Left Side Layout (Bilateral Mode)
    if (leftChildren.length > 0) {
      let totalLeftH = 0;
      leftChildren.forEach(c => {
        totalLeftH += getSubtreeHeight(c);
      });
      totalLeftH += (leftChildren.length - 1) * V_GAP;

      let currentY = -totalLeftH / 2;
      const startX = -ROOT_WIDTH / 2 - H_GAP - NODE_WIDTH;

      leftChildren.forEach((childNode) => {
        const origIdx = primaryChildren.indexOf(childNode);
        const branchColorIdx = origIdx % BRANCH_COLORS.length;
        const subH = getSubtreeHeight(childNode);
        const childH = getNodeHeight(childNode);
        const childTopY = currentY + (subH - childH) / 2;

        const childLayout = layoutSubtree(
          childNode,
          1,
          branchColorIdx,
          true,
          startX,
          childTopY,
          rootLayout
        );
        rootLayout.children.push(childLayout);
        currentY += subH + V_GAP;
      });
    }

    // Build SVG Connector Paths
    const generatedConnectors: ConnectorPath[] = [];
    let minX = -ROOT_WIDTH / 2;
    let maxX = ROOT_WIDTH / 2;
    let minY = -rootH / 2;
    let maxY = rootH / 2;

    const traverseForConnectors = (node: LayoutNode) => {
      // Update bounds
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x + node.width);
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y + node.height);

      if (node.isExpanded && node.children.length > 0) {
        node.children.forEach(child => {
          let startX: number;
          let startY: number;
          let endX: number;
          let endY: number;

          if (node.level === 0) {
            // Out from root
            if (child.isLeft) {
              startX = -ROOT_WIDTH / 2;
              startY = 0;
              endX = child.x + child.width;
              endY = child.y + child.height / 2;
            } else {
              startX = ROOT_WIDTH / 2;
              startY = 0;
              endX = child.x;
              endY = child.y + child.height / 2;
            }
          } else {
            // Child to grandchild
            if (child.isLeft) {
              startX = node.x;
              startY = node.y + node.height / 2;
              endX = child.x + child.width;
              endY = child.y + child.height / 2;
            } else {
              startX = node.x + node.width;
              startY = node.y + node.height / 2;
              endX = child.x;
              endY = child.y + child.height / 2;
            }
          }

          const dx = Math.abs(endX - startX) * 0.45;
          const cp1x = child.isLeft ? startX - dx : startX + dx;
          const cp1y = startY;
          const cp2x = child.isLeft ? endX + dx : endX - dx;
          const cp2y = endY;

          const pathD = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
          const color = BRANCH_COLORS[child.branchIdx % BRANCH_COLORS.length].stroke;
          const isHighlighted = child.id === selectedNodeId || (child.parent && child.parent.id === selectedNodeId);

          generatedConnectors.push({
            id: `conn-${node.id}-${child.id}`,
            d: pathD,
            color,
            isHighlighted: Boolean(isHighlighted)
          });

          traverseForConnectors(child);
        });
      }
    };

    traverseForConnectors(rootLayout);

    return {
      layoutTree: rootLayout,
      connectors: generatedConnectors,
      bounds: { minX: minX - 100, maxX: maxX + 100, minY: minY - 100, maxY: maxY + 100 }
    };
  }, [book.mindMap, layoutMode, expandedMap, selectedNodeId, nodeViewMode]);

  // Center the view on initial mount or layout switch
  const centerView = () => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setPan({
      x: clientWidth / 2,
      y: clientHeight / 2
    });
    setZoom(0.9);
  };

  useEffect(() => {
    centerView();
  }, [layoutMode]);

  // Mouse Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Pan & Pinch-to-Zoom Handlers (Mobile Touch Support)
  const touchStateRef = useRef<{
    mode: 'none' | 'pan' | 'pinch';
    startPan: { x: number; y: number };
    startTouch1: { x: number; y: number };
    startTouch2: { x: number; y: number };
    startDist: number;
    startZoom: number;
    hasMoved: boolean;
  }>({
    mode: 'none',
    startPan: { x: 0, y: 0 },
    startTouch1: { x: 0, y: 0 },
    startTouch2: { x: 0, y: 0 },
    startDist: 0,
    startZoom: 1,
    hasMoved: false
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStateRef.current = {
        mode: 'pan',
        startPan: { ...pan },
        startTouch1: { x: t.clientX, y: t.clientY },
        startTouch2: { x: 0, y: 0 },
        startDist: 0,
        startZoom: zoom,
        hasMoved: false
      };
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStateRef.current = {
        mode: 'pinch',
        startPan: { ...pan },
        startTouch1: { x: t1.clientX, y: t1.clientY },
        startTouch2: { x: t2.clientX, y: t2.clientY },
        startDist: dist,
        startZoom: zoom,
        hasMoved: true
      };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const t = touchStateRef.current;
    if (t.mode === 'pan' && e.touches.length === 1) {
      const touch = e.touches[0];
      const dx = touch.clientX - t.startTouch1.x;
      const dy = touch.clientY - t.startTouch1.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        t.hasMoved = true;
      }
      setPan({
        x: t.startPan.x + dx,
        y: t.startPan.y + dy
      });
    } else if (t.mode === 'pinch' && e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      if (t.startDist > 0) {
        const factor = dist / t.startDist;
        const newZoom = Math.min(2.0, Math.max(0.35, Number((t.startZoom * factor).toFixed(2))));
        setZoom(newZoom);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      touchStateRef.current.mode = 'none';
      setIsDragging(false);
    } else if (e.touches.length === 1) {
      // Transition from pinch back to pan
      const t = e.touches[0];
      touchStateRef.current.mode = 'pan';
      touchStateRef.current.startPan = { ...pan };
      touchStateRef.current.startTouch1 = { x: t.clientX, y: t.clientY };
    }
  };

  // Zoom Controls
  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(1.8, Math.max(0.4, Number((prev + delta).toFixed(2)))));
  };

  // Find active node object for details card
  const findNodeById = (node: MindMapNode, id: string): MindMapNode | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const c of node.children) {
        const found = findNodeById(c, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeNode = findNodeById(book.mindMap, selectedNodeId) || book.mindMap;

  // Dynamic font sizing based on global app font scaler
  const nodeFontSizes = [
    { title: 'text-xs', desc: 'text-[10px]' },
    { title: 'text-xs sm:text-sm', desc: 'text-[11px]' },
    { title: 'text-sm sm:text-base', desc: 'text-xs' },
    { title: 'text-base sm:text-lg', desc: 'text-sm' },
  ][fontSizeIndex] || { title: 'text-xs sm:text-sm', desc: 'text-[11px]' };

  // Flatten layout tree for rendering HTML nodes
  const allLayoutNodes = useMemo(() => {
    const list: LayoutNode[] = [];
    const collect = (n: LayoutNode) => {
      list.push(n);
      if (n.isExpanded) {
        n.children.forEach(collect);
      }
    };
    collect(layoutTree);
    return list;
  }, [layoutTree]);

  return (
    <div className={`${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col p-3 sm:p-4' 
        : 'max-w-7xl mx-auto pt-5 sm:pt-7 pb-16 space-y-4 w-full max-w-full overflow-x-hidden'
    }`}>
      
      {/* Top Controls Toolbar */}
      <div className={`scroll-mt-36 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-wrap items-center justify-between gap-3 ${isFullscreen ? 'shrink-0' : ''}`}>
        
        {/* Left: Title & Mode Toggle */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <span>Visual Concept Map</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                Visual
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive Bézier mind map. Drag canvas to pan, click nodes to inspect.
            </p>
          </div>
        </div>

        {/* Center / Right: Layout Switcher, Search, Zoom */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search in map */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              className="pl-8 pr-8 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-700/60 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none transition w-36 sm:w-44"
            />
            {searchQuery && (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchQuery('');
                }}
                onClick={() => setSearchQuery('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 flex items-center justify-center rounded-full bg-slate-200/90 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-xs transition-all cursor-pointer z-10"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-2.5 h-2.5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-xs font-medium">
            <button
              onClick={() => setLayoutMode('bilateral')}
              className={`px-2.5 py-1 rounded-lg transition ${
                layoutMode === 'bilateral'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Bilateral Radial Tree"
            >
              Bilateral
            </button>
            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`px-2.5 py-1 rounded-lg transition ${
                layoutMode === 'horizontal'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Left-to-Right Logic Chart"
            >
              Logic Tree
            </button>
          </div>

          {/* Node Detail Density Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700/60 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-600 text-xs">
            <button
              onClick={() => setNodeViewMode('detailed')}
              className={`px-2.5 py-1 rounded-md transition ${
                nodeViewMode === 'detailed'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Show 100% full concept descriptions on diagram nodes in place"
            >
              Full Content
            </button>
            <button
              onClick={() => setNodeViewMode('compact')}
              className={`px-2.5 py-1 rounded-md transition ${
                nodeViewMode === 'compact'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              title="Compact node layout"
            >
              Compact
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center space-x-1 border-l border-slate-200 dark:border-slate-700 pl-2">
            <button
              onClick={() => handleZoom(-0.15)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-medium text-slate-500 w-11 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => handleZoom(0.15)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={centerView}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              title="Center Mind Map"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                const branches = book.mindMap.children ? book.mindMap.children.map(c => c.label).join(', ') : '';
                onStartAudio(`${book.title} Concept Map`, `${book.title} concept architecture. ${book.mindMap.description || ''}. Primary branches: ${branches}.`);
              }}
              className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition flex items-center space-x-1 border border-blue-200/80 dark:border-blue-900/60"
              title="Listen to Mind Map Overview"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold hidden sm:inline">Listen Map</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition border border-slate-200/80 dark:border-slate-700 flex items-center space-x-1"
              title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen Mind Map'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
              <span className="text-xs font-semibold hidden sm:inline">
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${isFullscreen ? 'flex-1 min-h-0' : ''}`}>
        
        {/* Interactive Infinite SVG Canvas */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`lg:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#0b101b] relative overflow-hidden shadow-inner select-none ${
            isFullscreen ? 'h-full' : 'h-[600px] sm:h-[680px]'
          } ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            touchAction: 'none'
          }}
        >
          {/* Draggable & Scalable World Container */}
          <div
            className="absolute origin-center transition-transform duration-75"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {/* SVG Connecting Splines Layer */}
            <svg
              className="absolute pointer-events-none overflow-visible"
              style={{
                left: 0,
                top: 0,
                width: 1,
                height: 1
              }}
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {connectors.map(c => (
                <path
                  key={c.id}
                  d={c.d}
                  fill="none"
                  stroke={c.color}
                  strokeWidth={c.isHighlighted ? 4 : 2.5}
                  strokeOpacity={c.isHighlighted ? 1 : 0.85}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={c.isHighlighted ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />
              ))}
            </svg>

            {/* HTML Mind Map Nodes */}
            {allLayoutNodes.map(node => {
              const isRoot = node.level === 0;
              const isSelected = selectedNodeId === node.id;
              const branchStyle = BRANCH_COLORS[node.branchIdx % BRANCH_COLORS.length];
              const matchesSearch = searchQuery.trim() !== '' && 
                node.label.toLowerCase().includes(searchQuery.toLowerCase());

              const hasChildren = node.rawNode.children && node.rawNode.children.length > 0;
              const isExpanded = node.isExpanded;

              if (isRoot) {
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      if (touchStateRef.current.hasMoved) return;
                      setSelectedNodeId(node.id);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-600/30 cursor-pointer border-2 transition-all transform hover:scale-[1.02] flex items-start space-x-3.5 ${
                      isSelected ? 'ring-4 ring-blue-400/50 border-white' : 'border-blue-400/30'
                    }`}
                    style={{
                      left: 0,
                      top: 0,
                      width: ROOT_WIDTH,
                      minHeight: node.height
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                          Central Architecture
                        </span>
                      </div>
                      <h4 className={`font-extrabold leading-snug break-words ${nodeFontSizes.title} ${nodeViewMode === 'compact' ? 'truncate' : ''}`}>
                        {node.label}
                      </h4>
                      {nodeViewMode === 'detailed' && node.description && (
                        <div className={`text-blue-100/95 leading-relaxed mt-1.5 break-words font-sans space-y-1 ${nodeFontSizes.desc}`}>
                          {(node.description.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                            <span key={idx} className="block leading-relaxed">
                              {sentence}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Non-root branch node
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    if (touchStateRef.current.hasMoved) return;
                    setSelectedNodeId(node.id);
                  }}
                  className={`absolute rounded-xl px-3.5 py-3 transition-all transform hover:scale-[1.02] cursor-pointer shadow-sm border ${
                    isSelected
                      ? 'ring-3 ring-blue-500/50 shadow-md z-20 scale-[1.02]'
                      : matchesSearch
                      ? 'ring-3 ring-amber-400 bg-amber-50 dark:bg-amber-950/60 z-10'
                      : 'bg-white dark:bg-slate-800/95 hover:border-slate-400'
                  }`}
                  style={{
                    left: node.x,
                    top: node.y,
                    width: node.width,
                    minHeight: node.height,
                    borderColor: isSelected ? branchStyle.stroke : undefined,
                    borderLeftWidth: node.level === 1 ? '5px' : '3.5px',
                    borderLeftColor: branchStyle.stroke
                  }}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-1.5 mb-1">
                        {node.level === 1 && (
                          <span 
                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded"
                            style={{
                              backgroundColor: branchStyle.fill,
                              color: branchStyle.text
                            }}
                          >
                            Pillar {node.branchIdx + 1}
                          </span>
                        )}
                        {node.level > 1 && (
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: branchStyle.stroke }} />
                        )}
                      </div>

                      <p className={`font-bold leading-snug break-words ${nodeFontSizes.title} ${
                        isSelected 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-slate-900 dark:text-slate-100'
                      } ${nodeViewMode === 'compact' ? 'truncate' : ''}`}>
                        {node.label}
                      </p>

                      {nodeViewMode === 'detailed' && node.description && (
                        <div className={`text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed font-sans break-words selection:bg-blue-100 dark:selection:bg-blue-900 space-y-1 ${nodeFontSizes.desc}`}>
                          {(node.description.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                            <span key={idx} className="block leading-relaxed">
                              {sentence}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Controls: Audio Listen & Expand/Collapse Toggle */}
                    <div className="flex items-center space-x-1 ml-1 mt-0.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const speechText = `${node.label}. ${node.description || ''}`;
                          onStartAudio(node.label, speechText);
                        }}
                        className="w-5 h-5 rounded-md flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition"
                        title="Listen to this concept"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>

                      {hasChildren && (
                        <button
                          onClick={(e) => toggleNodeExpand(node.id, e)}
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
                          title={isExpanded ? 'Collapse Branch' : `Expand (${node.rawNode.children!.length} items)`}
                        >
                          {isExpanded ? '−' : `+${node.rawNode.children!.length}`}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Controls Watermark / Touch Helper */}
          <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-400 dark:text-slate-500 pointer-events-none bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-800/50 flex items-center space-x-1.5 sm:space-x-2">
            <span>👆 Touch/drag to pan</span>
            <span>•</span>
            <span>🤏 Pinch zoom</span>
            <span>•</span>
            <span>Tap node to inspect</span>
          </div>

        </div>

        {/* Selected Node Detailed Inspector */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Info className="w-4 h-4" />
                <span>Concept Inspector</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                {activeNode.id === book.mindMap.id ? 'Root' : 'Concept'}
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {activeNode.label}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                From {book.title} by {book.author}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
              {activeNode.description ? (
                <div className="space-y-1.5">
                  {(activeNode.description.split(/(?<=[.!?])(?:\s+|\n+)|(?:\r?\n)+/).map(s => s.trim()).filter(Boolean)).map((sentence, idx) => (
                    <span key={idx} className="block leading-relaxed">
                      {sentence}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="italic text-slate-400">
                  Core architectural branch in the book's conceptual framework.
                </span>
              )}
            </div>

            {/* Sub-branches list */}
            {activeNode.children && activeNode.children.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Connected Concepts ({activeNode.children.length}):
                  </span>
                  <button
                    onClick={(e) => toggleNodeExpand(activeNode.id, e)}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {expandedMap[activeNode.id] === false ? 'Expand All' : 'Collapse All'}
                  </button>
                </div>

                <div className="flex flex-col space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {activeNode.children.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedNodeId(c.id)}
                      className={`text-left text-xs px-2.5 py-1.5 rounded-lg border transition flex items-center justify-between ${
                        selectedNodeId === c.id
                          ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-400 text-blue-700 dark:text-blue-300 font-semibold'
                          : 'bg-white dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{c.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-2">
              <button
                onClick={() => {
                  const sub = activeNode.children && activeNode.children.length > 0 
                    ? `. Connected concepts: ${activeNode.children.map(c => c.label).join(', ')}` 
                    : '';
                  onStartAudio(activeNode.label, `${activeNode.label}. ${activeNode.description || 'Core concept.'}${sub}`);
                }}
                className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-xs font-semibold transition flex items-center justify-center space-x-1.5"
                title="Listen to this concept"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>Listen to Concept</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${activeNode.label}: ${activeNode.description || ''}`);
                }}
                className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Copy Concept Note</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
