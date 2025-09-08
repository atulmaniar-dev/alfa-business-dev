'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

interface ActionMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export default function ActionMenu({ onEdit, onDelete, disabled }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <MoreVertical size={20} className="text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-xl bg-white shadow-lg border border-gray-200">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full px-4 py-2 flex items-center text-sm text-gray-700 hover:bg-gray-100 transition rounded-t-xl"
          >
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full px-4 py-2 flex items-center text-sm text-red-600 hover:bg-red-100 transition rounded-b-xl"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
