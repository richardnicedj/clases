import { FormEvent, useState } from "react";
import { IData } from "./Table";

interface ModalProps {
  isOpen: boolean;
  onClose: (user:IData) => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age), // Convertir age a número
        }),
      });

      if (!response.ok) {
        throw new Error("El email ya está registrado o datos inválidos");
      }

      const data = await response.json();
      console.log("Usuario creado:", data);

      onClose(data);
      setFormData({ name: "", lastName: "", age: "", email: "", phone: "", isActive: true });
    } catch (error) {
      setError("El email ya está registrado o los datos son inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
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
            <label className="block text-gray-700">Apellido:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Edad:</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
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

          <div>
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="mr-2"
            />
            <label className="text-gray-700">Usuario activo</label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
