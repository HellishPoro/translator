import {
  autoUpdate,
  flip,
  inline,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';

export const useFloatingTooltip = () => {
  const [openedTooltip, setOpenedTooltip] = useState(false);
  const [sourceText, setSourceText] = useState('');

  const { refs, floatingStyles, context } = useFloating({
    placement: 'top',
    open: openedTooltip,
    onOpenChange: setOpenedTooltip,
    middleware: [inline(), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const closeTooltip = useCallback(() => setOpenedTooltip(false), []);

  const debounsedSelectionChange = useDebouncedCallback(() => {
    try {
      const selection = window.getSelection();
      if (
        !selection ||
        selection.isCollapsed ||
        selection.toString().trim().length === 0
      ) {
        setOpenedTooltip(false);
        return;
      }
      const range =
        typeof selection.rangeCount === 'number' && selection.rangeCount > 0
          ? selection.getRangeAt(0)
          : null;
      if (range) {
        refs.setReference({
          getBoundingClientRect: () => range.getBoundingClientRect(),
          getClientRects: () => range.getClientRects(),
        });

        const chosenText = selection.toString().trim();
        setSourceText(chosenText);
        setOpenedTooltip(true);
      }
    } catch (error) {
      console.error('Ошибка при работе с выделением:', error);
      setOpenedTooltip(false);
    }
  }, 200);

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return;
      }
      debounsedSelectionChange();
    }

    function handleMouseDown(event: MouseEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return;
      }
      if (window.getSelection()?.isCollapsed) {
        setOpenedTooltip(false);
      }
    }
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [refs, debounsedSelectionChange]);

  return {
    refs,
    floatingStyles,
    getFloatingProps,
    openedTooltip,
    closeTooltip,
    sourceText,
  };
};
