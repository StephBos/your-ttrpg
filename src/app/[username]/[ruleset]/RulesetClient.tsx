"use client";
import { useState } from "react";
import Header from "@/Components/Header";
import Background from "@/Components/Background";
import Menu from "@/Components/Menu";
import UploadFileModal from "@/Components/UploadFileModal";
import AddNewModal from "@/Components/AddNewModal";

export default function RulesetClient({ username, slug, id }) {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false)
  const [isNewItemModalOpen, setNewItemModalOpen] = useState(false)

  return (
    <div>
      <Background />
      <Header username={username} />
      <Menu 
        onAddNew={() => setNewItemModalOpen(true)}
        onUploadFile={() => setUploadModalOpen(true)}
      />
      {isUploadModalOpen && <UploadFileModal onClose={() => setUploadModalOpen(false)} />}
      {isNewItemModalOpen && <AddNewModal onClose={() => setNewItemModalOpen(false)} />}
    </div>
  );
}
