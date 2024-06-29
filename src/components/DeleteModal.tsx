import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

interface DeleteModalProps {
  id: number;
  name: string;
  onDelete: (id: number, name: string) => void;
}

const DeleteModalComponent: React.FC<DeleteModalProps> = ({
  id,
  name,
  onDelete,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    onDelete(id, name);
    setOpenModal(false);
  };

  return (
    <>
      <Link
        to="#"
        className="font-medium text-red-600 hover:underline dark:text-red-500"
        onClick={() => setOpenModal(true)}
      >
        Hapus
      </Link>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah kamu yakin menghapus makanan{" "}
              <span className="font-bold">{name}</span> ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yakin
              </Button>

              <Button color="gray" onClick={() => setOpenModal(false)}>
                Batal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModalComponent;
