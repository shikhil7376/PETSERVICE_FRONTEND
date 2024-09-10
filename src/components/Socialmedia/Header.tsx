import React from 'react';
import { CiVideoOn } from "react-icons/ci";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "../../components/ui/input";
import { useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use onOpen to open and onClose to close the modal
  const [value,setValue] = useState("")
  const navigate = useNavigate()
  function openModal() {
    onOpen();  // Explicitly open the modal
  }

  const handleJoinRoom = useCallback(()=>{
      navigate(`/room/${value}`)
  },[navigate,value])

  return (
    <div className='p-3 flex justify-end'>
      <CiVideoOn color='white' size={20} onClick={openModal} />
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onClose}  // Modal uses onOpenChange to handle closing
        classNames={{
          backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">VIDEO CALL</ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      placeholder="Enter Room Code"
                      value={value}
                      onChange={(e)=>setValue(e.target.value)}
                      required
                    />
                  </div>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}> {/* Close the modal using onClose */}
                      Close
                    </Button>
                    <Button className="bg-black text-white font-semibold text-small" onClick={handleJoinRoom} type="submit">
                      JOIN
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Header;
