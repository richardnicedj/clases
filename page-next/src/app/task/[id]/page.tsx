'use client';
import { ModalCreateTask } from "@/components/ModalCreateTask";
import { useEffect, useState } from "react";

interface ITask{
    id ?: number,
    title : string,
  }

  interface PageProps {
    params: {
      id: string;
    };
  }
export default function TaskPage({ params }: PageProps) {
  const id = Number(params.id);
  const[formData, setFormData] = useState<ITask[]>([]);
  const[isLoading, setIsLoading] = useState(true);
  const[error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/tasks/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al obtener los datos");

        const result: ITask[] = await response.json();
        setFormData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const handleCreateTask = async (title: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Task</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsModalOpen(true)}
          >Create Task</button>
      </div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="min-w-full border border-gray-300">
            <thead>
                <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Title</th>
                </tr>
            </thead>
            <tbody>
                {formData.length ? formData.map((task) => (
                <tr key={task.id}>
                    <td className="border px-4 py-2">{task.id}</td>
                    <td className="border px-4 py-2">{task.title}</td>
                </tr>
                )
                ) : (
                <tr>
                    <td className="border px-4 py-2 text-center" colSpan={2}>No hay tareas disponibles</td>
                </tr>
                )}
            </tbody>
        </table>
      )}
      
      <ModalCreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
}