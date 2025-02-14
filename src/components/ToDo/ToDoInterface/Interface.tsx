import React, { useState } from "react";
import styles from "./Interface.module.scss";
import { filters, toDo, toDoData } from "../../../utils/types";
import { capitalizeFirstLetter } from "../../../utils/functions";
import { MdCheck, MdClose } from "react-icons/md";
import { COMPLEATED_ICON_DIMENSION, ELEMENT_PER_PAGE, ICON_COLOR } from "../../../utils/constants";
import { Pagination } from "@mui/material";
import usePagination from "../../../hooks/usePagination";
import { IoMdAddCircleOutline } from "react-icons/io";
import NewToDoModal from "../../NewTodoModal/NewTodoModal";

const ToDoInterface: React.FC<{ data: toDoData; filters: filters }> = ({ data }) => {
  const toDos = usePagination(data, ELEMENT_PER_PAGE);
  console.log("data", data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  const [toModify, setToModify] = useState<toDo | undefined>(undefined);

  const [page, setPage] = useState(1);
  const pageTotal: number = Math.ceil(data.length / ELEMENT_PER_PAGE);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    toDos.jump(value);
  };
  return (
    <>
      <div className={styles.interfaceContainer}>
        <div
          className={styles.addIconContainer}
          onClick={() => {
            setToModify(undefined);
            handleOpen();
          }}
        >
          <IoMdAddCircleOutline className={styles.addIcon} size={30} color={ICON_COLOR} />
          <h2 className={styles.createNewLabel}>CREATE NEW</h2>
        </div>
        <NewToDoModal isOpen={isModalOpen} handleClose={handleClose} toModify={toModify} />
        <div className={styles.interfaceHead}>
          <h2 className={styles.userIdColumn}>USER ID</h2>
          <h2 className={styles.titleColumn}>TITLE</h2>
          <h2 className={styles.compleatedColumn}>COMPLETED</h2>
        </div>

        {toDos.currentData().map((element, index) => (
          <div
            key={index}
            className={styles.interfaceElement}
            onClick={() => {
              setToModify(element);
              handleOpen();
            }}
          >
            <div className={styles.userIdColumn}>{element.userId}</div>
            <div className={styles.titleColumn}>{capitalizeFirstLetter(element.title)}</div>
            <div className={styles.compleatedColumn}>
              {element.completed ? (
                <MdCheck size={COMPLEATED_ICON_DIMENSION} color={ICON_COLOR} />
              ) : (
                <MdClose size={COMPLEATED_ICON_DIMENSION} color={ICON_COLOR} />
              )}
            </div>
          </div>
        ))}
        <div className={styles.paginationContainer}>
          <Pagination count={pageTotal} page={page} onChange={handlePageChange} color="primary" />
        </div>
      </div>
    </>
  );
};

export default ToDoInterface;
