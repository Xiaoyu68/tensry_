import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_ITEM_SIZE = 120;

const categories = [
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'fabric', label: 'Fabric', icon: '🧵' },
  { id: 'pattern', label: 'Pattern', icon: '🎴' },
  { id: 'color', label: 'Color', icon: '🎨' },
  { id: 'texture', label: 'Texture', icon: '🪵' },
  { id: 'silhouette', label: 'Silhouette', icon: '🕶️' },
  { id: 'accessory', label: 'Accessory', icon: '💍' },
  { id: 'lighting', label: 'Lighting', icon: '💡' },
];

const imageContext = require.context(
  '../assets/icons/sandbox_img',
  false,
  /\.(png|jpe?g|svg)$/
);

const imageAssets = imageContext.keys().map((key, index) => {
  const src = imageContext(key);
  const filename = key.replace('./', '');
  const label = filename.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ');
  const category = 'nature';
  return {
    id: `asset-${index}`,
    category,
    label,
    image: src,
  };
});

const libraryAssets = imageAssets;

const initialCanvasItems = [];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Sandbox = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [canvasItems, setCanvasItems] = useState(initialCanvasItems);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const canvasRef = useRef(null);
  const pointerState = useRef({ mode: null, itemId: null });
  const itemIdCounter = useRef(1);

  const assetMap = useMemo(
    () =>
      libraryAssets.reduce((acc, asset) => {
        acc[asset.id] = asset;
        return acc;
      }, {}),
    []
  );

  const filteredAssets = useMemo(
    () => libraryAssets.filter((asset) => asset.category === activeCategory),
    [activeCategory]
  );

  const handleAssetDragStart = useCallback((event, asset) => {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('application/json', JSON.stringify({ assetId: asset.id }));
  }, []);

  const handleAddAssetToCanvas = useCallback(
    (event, assetId) => {
      event.preventDefault();
      if (!canvasRef.current || !assetMap[assetId]) {
        return;
      }

      const rect = canvasRef.current.getBoundingClientRect();
      const baseSize = BASE_ITEM_SIZE;
      const x = clamp(event.clientX - rect.left - baseSize / 2, 0, Math.max(rect.width - baseSize, 0));
      const y = clamp(event.clientY - rect.top - baseSize / 2, 0, Math.max(rect.height - baseSize, 0));

      const nextId = `canvas-${itemIdCounter.current++}`;
      setCanvasItems((items) => [
        ...items,
        {
          id: nextId,
          assetId,
          x,
          y,
          scale: 1,
        },
      ]);
      setSelectedItemId(nextId);
    },
    [assetMap]
  );

  const handleCanvasDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      const data = event.dataTransfer.getData('application/json');
      if (!data) {
        return;
      }

      try {
        const parsed = JSON.parse(data);
        if (parsed.assetId) {
          handleAddAssetToCanvas(event, parsed.assetId);
        }
      } catch {
        // Ignore malformed payloads.
      }
    },
    [handleAddAssetToCanvas]
  );

  const beginDrag = useCallback(
    (event, item) => {
      event.stopPropagation();
      event.preventDefault();
      if (
        event.target.closest('.sandbox__canvas-remove') ||
        event.target.closest('.sandbox__resize-handle')
      ) {
        return;
      }
      if (!canvasRef.current) {
        return;
      }

      const rect = canvasRef.current.getBoundingClientRect();

      pointerState.current = {
        mode: 'drag',
        itemId: item.id,
        offsetX: event.clientX - (rect.left + item.x),
        offsetY: event.clientY - (rect.top + item.y),
        startScale: item.scale,
        startX: event.clientX,
        startY: event.clientY,
      };

      setSelectedItemId(item.id);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    []
  );

  const beginResize = useCallback((event, item) => {
    event.stopPropagation();
    event.preventDefault();
    pointerState.current = {
      mode: 'resize',
      itemId: item.id,
      startScale: item.scale,
      startX: event.clientX,
      startY: event.clientY,
    };
    setSelectedItemId(item.id);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const continuePointerInteraction = useCallback((event, itemId) => {
    event.preventDefault();
    const state = pointerState.current;
    if (!canvasRef.current || state.itemId !== itemId) {
      return;
    }

    const rect = canvasRef.current.getBoundingClientRect();

    if (state.mode === 'drag') {
      setCanvasItems((items) =>
        items.map((item) => {
          if (item.id !== itemId) {
            return item;
          }
          const size = BASE_ITEM_SIZE * item.scale;
          const nextX = clamp(event.clientX - rect.left - state.offsetX, 0, Math.max(rect.width - size, 0));
          const nextY = clamp(event.clientY - rect.top - state.offsetY, 0, Math.max(rect.height - size, 0));
          return { ...item, x: nextX, y: nextY };
        })
      );
    } else if (state.mode === 'resize') {
      const delta = (event.clientX - state.startX + (event.clientY - state.startY)) / 200;
      const nextScale = clamp(state.startScale + delta, 0.5, 2.5);

      setCanvasItems((items) =>
        items.map((item) => {
          if (item.id !== itemId) {
            return item;
          }
          const size = BASE_ITEM_SIZE * nextScale;
          const maxX = Math.max(rect.width - size, 0);
          const maxY = Math.max(rect.height - size, 0);
          return {
            ...item,
            scale: nextScale,
            x: clamp(item.x, 0, maxX),
            y: clamp(item.y, 0, maxY),
          };
        })
      );
    }
  }, []);

  const endPointerInteraction = useCallback((event) => {
    event.stopPropagation();
    if (pointerState.current.mode) {
      pointerState.current = { mode: null, itemId: null };
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleClearCanvas = useCallback(() => {
    setCanvasItems([]);
    setSelectedItemId(null);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  const handleShare = useCallback(() => {
    if (!canvasItems.length) {
      return;
    }
    const payload = canvasItems.map(({ assetId, x, y, scale }) => ({
      asset: assetMap[assetId]?.label ?? assetId,
      x,
      y,
      scale,
    }));
    // eslint-disable-next-line no-console
    console.table(payload);
  }, [assetMap, canvasItems]);

  const handleGenerateReport = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Generate Style Report - integrate with backend when ready.', canvasItems);
    navigate('/report', { state: { items: canvasItems } });
  }, [canvasItems, navigate]);

  const handleAssetClick = useCallback(
    (assetId) => {
      if (!canvasRef.current) {
        return;
      }
      const rect = canvasRef.current.getBoundingClientRect();
      const baseSize = BASE_ITEM_SIZE;
      const x = clamp(rect.width / 2 - baseSize / 2, 0, Math.max(rect.width - baseSize, 0));
      const y = clamp(rect.height / 2 - baseSize / 2, 0, Math.max(rect.height - baseSize, 0));

      const nextId = `canvas-${itemIdCounter.current++}`;
      setCanvasItems((items) => [
        ...items,
        {
          id: nextId,
          assetId,
          x,
          y,
          scale: 1,
        },
      ]);
      setSelectedItemId(nextId);
    },
    []
  );

  const showPlaceholder = canvasItems.length === 0;

  return (
    <div className="sandbox">
      <section className="sandbox__intro">
        <div>
          <h2 className="sandbox__title">Style Sandbox Canvas</h2>
          <p className="sandbox__description">
            Drag elements from the left to the canvas to create your style combination
          </p>
        </div>
      </section>

      <section className="sandbox__workspace">
        <aside className="sandbox__library">
          <div className="sandbox__library-buttons">
            {categories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`library-button${isActive ? ' library-button--active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="library-button__icon" aria-hidden="true">
                    {category.icon}
                  </span>
                  <span className="library-button__label">{category.label}</span>
                </button>
              );
            })}
          </div>

          <div className="sandbox__library-assets" role="list" aria-label={`${activeCategory} assets`}>
            <div className="sandbox__asset-grid">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  role="button"
                  tabIndex={0}
                  className="sandbox__asset"
                  draggable
                  onClick={() => handleAssetClick(asset.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleAssetClick(asset.id);
                    }
                  }}
                  onDragStart={(event) => handleAssetDragStart(event, asset)}
                >
                  <img src={asset.image} alt={asset.label} className="sandbox__asset-image" />
                </div>
              ))}
            </div>
            <div className="sandbox__scrollbar" aria-hidden="true">
              <div className="sandbox__scrollbar-thumb" />
            </div>
          </div>
        </aside>

        <div
          ref={canvasRef}
          className="sandbox__canvas"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleCanvasDrop}
          onClick={handleCanvasClick}
        >
          {showPlaceholder && (
            <div className="sandbox__canvas-placeholder">
              <span className="sandbox__canvas-emoji" role="img" aria-label="Palette">
                🎨
              </span>
              <p className="sandbox__canvas-text">Drag elements from the left to start creating</p>
            </div>
          )}

          {canvasItems.map((item) => {
            const asset = assetMap[item.assetId];
            const size = BASE_ITEM_SIZE * item.scale;

            if (!asset) {
              return null;
            }

            return (
              <div
                key={item.id}
                className={`sandbox__canvas-item${item.id === selectedItemId ? ' sandbox__canvas-item--selected' : ''}`}
                style={{
                  width: size,
                  height: size,
                  transform: `translate(${item.x}px, ${item.y}px)`,
                }}
                onPointerDown={(event) => beginDrag(event, item)}
                onPointerMove={(event) => continuePointerInteraction(event, item.id)}
                onPointerUp={endPointerInteraction}
                onPointerCancel={endPointerInteraction}
              >
                <img src={asset.image} alt={asset.label} className="sandbox__canvas-item-image" />
                <button
                  type="button"
                  className="sandbox__canvas-remove"
                  onClick={(event) => {
                    event.stopPropagation();
                    setCanvasItems((items) => items.filter((entry) => entry.id !== item.id));
                    if (selectedItemId === item.id) {
                      setSelectedItemId(null);
                    }
                  }}
                >
                  ×
                </button>
                <div
                  className="sandbox__resize-handle"
                  onPointerDown={(event) => beginResize(event, item)}
                  onPointerMove={(event) => continuePointerInteraction(event, item.id)}
                  onPointerUp={endPointerInteraction}
                  onPointerCancel={endPointerInteraction}
                >
                  ⇲
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="sandbox__actions">
        <button
          className="sandbox__action-button sandbox__action-button--muted"
          type="button"
          onClick={handleClearCanvas}
        >
          <span className="sandbox__action-icon" aria-hidden="true">
            🧼
          </span>
          <span>Clear Canvas</span>
        </button>
        <button
          className="sandbox__action-button sandbox__action-button--muted"
          type="button"
          onClick={handleShare}
        >
          <span className="sandbox__action-icon" aria-hidden="true">
            ↗
          </span>
          <span>Share</span>
        </button>
        <button
          className="sandbox__action-button sandbox__action-button--primary"
          type="button"
          onClick={handleGenerateReport}
        >
          <span className="sandbox__action-icon sandbox__action-icon--invert" aria-hidden="true">
            👗
          </span>
          <span>Generate Style Report</span>
        </button>
      </div>

      <div className="sandbox__accent" aria-hidden="true" />
    </div>
  );
};

export default Sandbox;
