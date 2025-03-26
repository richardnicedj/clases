import { Fragment } from "react"

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
    const tittle = `Table employes ${total}`
    return (
        <Fragment>
            <h1>{tittle}</h1>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((client: IData) => (
                        <tr key={client.email}>
                            <td className="border px-4 py-2">{client.name}</td>
                            <td className="border px-4 py-2">{client.lastName}</td>
                            <td className="border px-4 py-2">{client.age}</td>
                            <td className="border px-4 py-2">{client.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}


export default function Table() {
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Age</th>
                    <th className="px-4 py-2">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border px-4 py-2">John Doe</td>
                    <td className="border px-4 py-2">32</td>
                    <td className="border px-4 py-2">
                        example@gmail.com
                    </td>
                </tr>
                <tr>
                    <td className="border px-4 py-2">Jane Doe</td>
                    <td className="border px-4 py-2">45</td>
                    <td className="border px-4 py-2">example2@gmail.com</td>
                </tr>
            </tbody>
        </table>
    );
}