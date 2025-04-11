'use client';

import { Fragment, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
};

export function ModalCreateTask({ isOpen, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    await onCreate(title);
    setLoading(false);
    setTitle('');
    onClose();
  };

  return (
    <Fragment>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Crear Tarea</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la tarea"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
            <button onClick={onClose} className="ml-2 text-red-500">Cancelar</button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
