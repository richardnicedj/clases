import { faBatteryEmpty, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useEffect, useState } from "react"
import Modal from './Modal';
import { useRouter } from 'next/navigation';

export interface IUser{
    id?: number,
    name: string,
    lastName: string,
    age: number,
    email: string,
    phone?: string,
    isActive: boolean
}

export const TableComponent = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [userEdit, setUserEdit] = useState<IUser | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/users");
            if (!response.ok) throw new Error("Error al obtener los datos");

            const result: IUser[] = await response.json();
            setUsers(result); 
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {  
        fetchData();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    const openModal = (user?:IUser) => {
        if (user) {
            setUserEdit(user)
        }
        setIsModalOpen(true)
    }
    const closeModal = (user?:IUser) => {
        if (user) {
            fetchData();
        }
        setUserEdit(undefined)
        setIsModalOpen(false)
    };

    const deleteUser = async (user:IUser) => {
        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Error al eliminar el usuario");

            setUsers(users.filter((u) => u.id !== user.id));
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const goToUserPage = (user:IUser) => {
        router.push(`/user/${user.id}`);
    };

    const tittle = `Table employes ${users.length}`
    return (
        <Fragment>
            <div className='flex justify-between items-center'>
                <h1>{tittle}</h1>
                <button className='border rounded p-1 bg-white text-black hover:bg-sky-500'  onClick={()=>openModal()} >
                    New User
                </button>
            </div>
            <table className="table-auto mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Last Name</th>
                        <th className="border px-4 py-2">Age</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: IUser) => (
                        <tr key={user.email}>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.lastName}</td>
                            <td className="border px-4 py-2">{user.age}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phone}</td>
                            <td className={`text-${user.isActive ? 'green' : 'red'}-500 border px-4 py-2`}>
                                <FontAwesomeIcon
                                    icon={user.isActive ? faBatteryFull : faBatteryEmpty}
                                />
                                User
                            </td>
                            <td className="border px-4 py-2 gap-2 flex justify-center items-center">
                                <button className='bg-blue-500 text-white rounded p-1' onClick={()=>goToUserPage(user)}>Edit</button>
                                <button className='bg-red-500 text-white rounded p-1' onClick={()=>deleteUser(user)}>Delete</button>
                                <button className='bg-green-500 text-white rounded p-1' onClick={()=>openModal(user)}>Task</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} onClose={closeModal} user={userEdit}/>
        </Fragment>
    );
}
