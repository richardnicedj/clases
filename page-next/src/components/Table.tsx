export const TableComponent = (data:any) => {
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name2</th>
                    <th className="px-4 py-2">Age2</th>
                    <th className="px-4 py-2">Email2</th>
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