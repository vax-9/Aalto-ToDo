import { Backdrop, Button, Fade, Modal, Switch } from "@mui/material";
import styles from "./NewTodoModal.module.scss";
import { useEffect, useState } from "react";
import { toDo } from "../../utils/types";

const NewTodoModal: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  toModify?: toDo;
}> = ({ isOpen, handleClose, toModify }) => {
  useEffect(() => {
    if (toModify) {
      setToDoValues(toModify);
    } else {
      setToDoValues({
        userId: 0,
        id: 0,
        title: "",
        completed: false,
      });
    }
  }, [toModify]);

  const [toDoValues, setToDoValues] = useState<toDo>({
    userId: 0,
    id: 0,
    title: "",
    completed: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("toDoValues", toDoValues);
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <div className={styles.modalContainer}>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <h2 className={styles.modalTitle}>
                {toDoValues ? "CREATE A NEW TODO" : "MODIFY TODO"}
              </h2>
              <div className={styles.inputContainer}>
                <label htmlFor="ID" className={styles.inputLabel}>
                  user id
                </label>
                <input
                  id="ID"
                  name="ID"
                  type="number"
                  value={toDoValues.userId}
                  onChange={(e) => setToDoValues({ ...toDoValues, userId: Number(e.target.value) })}
                  className={styles.modalInput}
                />
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="toDoText" className={styles.inputLabel}>
                  {" "}
                  TExt
                </label>
                <textarea
                  id="toDoText"
                  name="toDoText"
                  rows={3}
                  className={styles.modalInput}
                  value={toDoValues.title}
                  onChange={(e) => setToDoValues({ ...toDoValues, title: e.target.value })}
                />
              </div>
              <label htmlFor="" className={styles.inputLabel}>
                Compleated
              </label>
              <Switch
                onChange={() => setToDoValues({ ...toDoValues, completed: !toDoValues.completed })}
              />
              <Button variant="contained" type="submit">
                Save
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewTodoModal;
