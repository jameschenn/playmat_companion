import { useState, useRef } from 'react';

export function useDragAndDrop(onSwap: (id1: string, id2: string) => void) {

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [touchStartPos, setTouchStartPos] = useState<{ x: number; y: number } | null>(null);
  const draggedElement = useRef<HTMLElement | null>(null);

  // DESKTOP: Standard drag events
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedId(null);
    
    // Remove visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      onSwap(draggedId, targetId);
    }
    setDraggedId(null);
  };

  // MOBILE: Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, id: string) => {
    // Prevent default to stop context menu
    e.preventDefault();
    
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDraggedId(id);
    draggedElement.current = e.currentTarget as HTMLElement;
    
    // Visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
      e.currentTarget.style.transform = 'scale(1.05)';
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!draggedId || !touchStartPos) return;
    
    // Prevent scrolling while dragging
    e.preventDefault();
    
    const touch = e.touches[0];
    
    // Move the element with finger
    if (draggedElement.current) {
      const deltaX = touch.clientX - touchStartPos.x;
      const deltaY = touch.clientY - touchStartPos.y;
      draggedElement.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!draggedId) return;
    
    const touch = e.changedTouches[0];

    // Temporarily hide the dragged element so elementFromPoint can see through it
    const originalPointerEvents = draggedElement.current?.style.pointerEvents;
    if (draggedElement.current) {
      draggedElement.current.style.pointerEvents = 'none';
    }
    
    // Find element at touch position
    const elementAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);

    // Restore pointer events
    if (draggedElement.current && originalPointerEvents !== undefined) {
      draggedElement.current.style.pointerEvents = originalPointerEvents;
    }
    
    // Find the character slot element
    let targetElement = elementAtPoint;
    while (targetElement && !targetElement.getAttribute('data-character-id')) {
      targetElement = targetElement.parentElement;
    }
    
    const targetId = targetElement?.getAttribute('data-character-id');
    
    if (targetId && targetId !== draggedId) {
      onSwap(draggedId, targetId);
    }
    
    // Reset visual feedback
    if (draggedElement.current) {
      draggedElement.current.style.opacity = '1';
      draggedElement.current.style.transform = '';
    }
    
    setDraggedId(null);
    setTouchStartPos(null);
    draggedElement.current = null;
  };

  return {
    draggedId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}