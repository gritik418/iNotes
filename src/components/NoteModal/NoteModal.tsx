import { getNoteByIdAsync, selectNoteById } from "@/features/notes/notesSlice";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

const NoteModal = ({ id, isOpen, onClose }: PropsType) => {
  const [noteData, setNoteData] = useState<any>({
    content: "",
    label: "General",
    title: "",
  });
  const dispatch = useDispatch<any>();
  const note = useSelector(selectNoteById);

  useEffect(() => {
    dispatch(getNoteByIdAsync(id));
  }, [dispatch, id]);

  useEffect(() => {
    setNoteData(note);
  }, [note]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{ width: "90%", maxWidth: "500px" }}>
        <ModalBody>
          <Stack spacing={3}>
            <label
              htmlFor="label"
              style={{ fontSize: "2.2rem", marginTop: "1rem" }}>
              Label
            </label>
            <Input
              style={{
                fontSize: "2rem",
                padding: "3px 8px",
                height: "3.8rem",
              }}
              id="label"
            />
            <label
              htmlFor="title"
              style={{ fontSize: "2.2rem", marginTop: "1rem" }}>
              Title
            </label>
            <Input
              style={{
                fontSize: "2rem",
                padding: "3px 8px",
                height: "3.8rem",
              }}
              id="title"
            />
            <label
              htmlFor="content"
              style={{ fontSize: "2.2rem", marginTop: "1rem" }}>
              Content
            </label>
            <Textarea
              rows={6}
              style={{
                fontSize: "2rem",
                padding: "3px 8px",
                resize: "none",
              }}
              id="content"
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} size={"lg"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            size={"lg"}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "#fff",
            }}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;
