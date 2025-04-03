import { faBatteryEmpty, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useEffect, useState } from "react"
import Modal from './Modal';

export interface IData{
    name: string,
    lastName: string,
    age: number,
    email: string,
    phone?: string,
    isActive: boolean
}

// interface ITableComponent{
//     data: IData[],
//     total: number
// }

export const TableComponent = () => {
    const [data, setData] = useState<IData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) throw new Error("Error al obtener los datos");

                const result: IData[] = await response.json();
                setData(result); 
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    const openModal = () => setIsModalOpen(true);
    const closeModal = (user:IData) => {
        if (user) {
            setData(data => [...data, user])
        }
        setIsModalOpen(false)
    };


    const tittle = `Table employes ${data.length}`
    return (
        <Fragment>
            <div>
                <h1>{tittle}</h1>
                <button className='border rounded p-1 bg-white text-black hover:bg-sky-500'  onClick={openModal} >
                    New employe
                </button>
            </div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((client: IData) => (
                        <tr key={client.email}>
                            <td className="border px-4 py-2">{client.name}</td>
                            <td className="border px-4 py-2">{client.lastName}</td>
                            <td className="border px-4 py-2">{client.age}</td>
                            <td className="border px-4 py-2">{client.email}</td>
                            <td className="border px-4 py-2">{client.phone}</td>
                            <td className={`text-${client.isActive ? 'green' : 'red'}-500 border px-4 py-2`}>
                                <FontAwesomeIcon
                                    icon={client.isActive ? faBatteryFull : faBatteryEmpty}
                                />
                                User
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </Fragment>
    );
}
