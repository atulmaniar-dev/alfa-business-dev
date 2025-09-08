'use client';
import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';

export default function ActionMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button onClick={() => setOpen(!open)} className="text-gray-500 hover:text-gray-700">
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="flex flex-wrap absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-md border border-gray-200">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
          >
            <Edit size={16} className="inline mr-2" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-100"
          >
            <Trash2 size={16} className="inline mr-2" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
