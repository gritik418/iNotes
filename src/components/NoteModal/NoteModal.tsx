import {
  selectUpdateLoading,
  updateNoteByIdAsync,
} from "@/features/notes/notesSlice";
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
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type NoteType = {
  title: string;
  label: string;
  content: string;
  _id: string;
};

type PropsType = {
  isOpen: boolean;
  onClose: () => void;
  note: NoteType;
};

const NoteModal = ({ note, isOpen, onClose }: PropsType) => {
  const [noteData, setNoteData] = useState<NoteType>(note);
  const dispatch = useDispatch<any>();

  const loading = useSelector(selectUpdateLoading);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateNoteByIdAsync({ id: note._id, noteData }));
  };

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
              name="label"
              onChange={handleChange}
              value={noteData.label}
              id="label"
            />
            <label
              htmlFor="title"
              style={{ fontSize: "2.2rem", marginTop: "1rem" }}>
              Title
            </label>
            <Input
              value={noteData.title}
              style={{
                fontSize: "2rem",
                padding: "3px 8px",
                height: "3.8rem",
              }}
              name="title"
              onChange={handleChange}
              id="title"
            />
            <label
              htmlFor="content"
              style={{ fontSize: "2.2rem", marginTop: "1rem" }}>
              Content
            </label>
            <Textarea
              value={noteData.content}
              rows={6}
              name="content"
              onChange={handleChange}
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
            onClick={handleUpdate}
            style={{
              backgroundColor: "var(--primary-color)",
              opacity: `${loading ? "0.5" : "1"}`,
              color: "#fff",
            }}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NoteModal;
