"use client";
import { useState } from "react";
import Table from "./components/Table";
import NewUserForm from "./components/NewUserForm";

export default function Home() {
  const [newUserDialogOpen, setnewUserDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    actions: "Edit"
  });
  const [rowData, setRowData] = useState([
    {
      id: 1,
      first_name: 'Shiv',
      last_name: 'Chauhan',
      email: 'shiv@example.com',
      actions: 'Edit'
    },
    {
      id: 2,
      first_name: 'Shiv',
      last_name: 'Chauhan',
      email: 'chauhan@example.com',
      actions: 'Edit'
    },
  ]);
  
  return (
    <div className="relative h-screen w-full">
      {
        newUserDialogOpen && <NewUserForm setRowData={setRowData} setnewUserDialogOpen={setnewUserDialogOpen} user={user} setUser={setUser} isEditing={isEditing} />
      }
      <button onClick={() => { setnewUserDialogOpen(true) }} className="bg-green-400">Add New User</button>
      <Table rowData={rowData} setnewUserDialogOpen={setnewUserDialogOpen} setUser={setUser} setIsEditing={setIsEditing} />

      <div></div>
    </div>
  );
}
