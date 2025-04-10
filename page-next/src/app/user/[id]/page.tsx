'use client';
import { IUser } from "@/components/Table";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const initialUser: IUser = {
  name: "",
  lastName: "",
  age: 0,
  email: "",
  phone: "",
  isActive: true,
};

export default async function UserPage({ params }: PageProps) {
  const id = Number(params.id);

  const [formData, setFormData] = useState<IUser>(initialUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
          try {
            const response = await fetch(`/api/users/${formData.id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (!response.ok) throw new Error("Error al obtener los datos");
  
              const result: IUser = await response.json();
              setFormData(result); 
          } catch (err) {
              setError((err as Error).message);
          } finally {
            setIsLoading(false);
          }
      };
  
    useEffect(() => {  
        fetchData();
    }, []);

    if (isLoading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/users/${formData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            age: Number(formData.age),
          }),
        });
    
        if (!response.ok) {
          throw new Error("El email ya está registrado o datos inválidos");
        }
        router.push(`/`);
        setFormData(initialUser);
      } catch (error) {
        setError("El email ya está registrado o los datos son inválidos.");
      } finally {
        setIsLoading(false);
      }
    };  

  return (
    <div>
      <h1>Test id: {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700">Apellido:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700">Edad:</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-2 border rounded text-black"
            />
          </div>

          <div>
            <label className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full p-2 border rounded text-black"
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
  );
}
