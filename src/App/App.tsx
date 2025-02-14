import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ToDoInterface from "../components/ToDo/ToDoInterface/Interface";
import { filters, toDoData } from "../utils/types";
import styles from "./App.module.scss";

import placeholderData from "../utils/queries/placeholderData.json";
import getToDos from "../utils/queries/getTodos";
import Filters from "../components/ToDo/ToDoFilters/Filters";

function App() {
  const [data, setData] = useState<toDoData>(placeholderData);
  const [backupData, setBackupData] = useState<toDoData>(placeholderData);

  const [filters, setFilters] = useState<filters>({
    selectedUserId: undefined,
    compleated: undefined,
    searchValue: undefined,
  });

  async function fetchToDo() {
    setData(await getToDos());
    setBackupData(await getToDos());
  }

  useEffect(() => {
    const filteredData = backupData.filter((element) => {
      if (filters?.selectedUserId && element.userId !== filters.selectedUserId) {
        return false;
      }
      if (filters?.compleated !== undefined && element.completed !== filters.compleated) {
        return false;
      }
      if (filters?.searchValue && !element.title.includes(filters.searchValue)) {
        return false;
      }
      return true;
    });

    setData(filteredData);
    console.log("filteredData", filteredData);
  }, [filters]);

  useEffect(() => {
    fetchToDo();
  }, []);

  return (
    <div className={styles.appContainer}>
      <div className={styles.test}></div>
      <Navbar />
      <div className={styles.toDoContainer}>
        <div className={styles.toDoWrapper}>
          <Filters data={data} filters={filters} setFilters={setFilters} />
          <ToDoInterface data={data} filters={filters} />
        </div>
      </div>
      <Footer />
      <div className={styles.footerPlaceholer}></div>
    </div>
  );
}

export default App;
