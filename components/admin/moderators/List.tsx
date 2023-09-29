'use client';

import { useEffect, useState } from 'react';

export const List = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any>([]);

    const fetchAllUsers = async () => {
        let result = await fetch('http://localhost:3000/api/moderators');
        let json = await result.json();

        setUsers(json);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    if (isLoading) {
        return (
            <>Ładowanie...</>
        );
    }

    return (
        <div className='main'>
            <table className='w-3/4 text-sm text-left text-gray-500 dark:text-gray-400 mx-auto mt-20'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400'>
                    <tr>
                        <th></th>
                        <th className='px-6 py-3'>Lp.</th>
                        <th className='px-6 py-3'>Imię</th>
                        <th className='px-6 py-3'>Nazwisko</th>
                        <th className='px-6 py-3'>Email</th>
                        <th className='px-6 py-3'>Ostatnia zmiana hasła</th>
                        <th className='px-6 py-3'>Dodany</th>
                        <th className='px-6 py-3'>Akcje</th>
                    </tr>
                </thead>


                <tbody>
                    {users.map((user: any, idx: number) => (
                        <tr className='bg-white border-b' key={idx}>
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className='px-6 py-4'>{idx + 1}.</td>
                            <td className='px-6 py-4'>{user.firstName}</td>
                            <td className='px-6 py-4'>{user.lastName}</td>
                            <td className='px-6 py-4'>{user.email}</td>
                            <td className='px-6 py-4'>{new Date(user.password_last_changed).toLocaleDateString()}r.</td>
                            <td className='px-6 py-4'>{new Date(user.createdAt).toLocaleDateString()}r.</td>
                            <td className='px-6 py-4'><button className='text-green-500'>Edytuj</button> <button className='text-red-500'>Zablokuj</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;