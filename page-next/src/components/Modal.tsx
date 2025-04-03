// page-next/src/components/Modal.tsx
import { FormEvent, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Función para enviar el formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Resetear error

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }

      const data = await response.json();
      console.log("Usuario creado:", data); // Manejo de la respuesta de la API

      onClose(); // Cierra el modal después de enviar
      setFormData({ name: "", email: "" }); // Limpiar el formulario
    } catch (error) {
      setError("Error al enviar los datos. Intenta nuevamente."); // Mostrar el error
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  if (!isOpen) return null; // Si el modal no está abierto, no renderizarlo

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Formulario</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Mostrar error si existe */}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={isLoading} // Deshabilitar el botón mientras está cargando
          >
            {isLoading ? "Cargando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
