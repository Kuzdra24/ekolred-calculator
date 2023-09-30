import List from '@/components/admin/moderators/List';
import './style.css';

export default async function AdminList() {
    return (
        <>
            <a href="/admin/list/add">Dodaj użytkownika</a>
            <br />
            <List></List>
        </>
    );    
}   