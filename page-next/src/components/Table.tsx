import { faBatteryEmpty, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fragment, useState } from "react"
import Modal from './Modal';

export interface IData{
    name: string,
    lastName: string,
    age: number,
    email: string,
    phone?: string,
    isActive: boolean
}

interface ITableComponent{
    data: IData[],
    total: number
}

export const TableComponent = ({ data, total }:  ITableComponent ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tittle = `Table employes ${total}`
    const handleClick = () =>{
        setIsModalOpen(true)
    }
    return (
        <Fragment>
            <div>
                <h1>{tittle}</h1>
                <button className='border rounded p-1 bg-white text-black hover:bg-sky-500'  onClick={handleClick} >
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold">Título del Modal</h2>
                <p className="mt-2">Este es un modal reutilizable en Next.js</p>
                <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Cerrar
                </button>
            </Modal>
        </Fragment>
    );
}
