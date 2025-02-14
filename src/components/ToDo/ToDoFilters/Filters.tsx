import React from "react";
import styles from "./Filters.module.scss";
import { FormControlLabel, MenuItem, Select, Switch } from "@mui/material";
import chevronDown from "../../../assets/down.svg";
import { MdSearch } from "react-icons/md";
import { filters, toDoData } from "../../../utils/types";

const Filters: React.FC<{
  data: toDoData;
  filters: filters;
  setFilters: React.Dispatch<React.SetStateAction<filters>>;
}> = ({ data, filters, setFilters }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const userIDs = [...new Set(data.map((element) => element.userId))];
  console.log("userIDs", userIDs);
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h2>FILTERS</h2>
      </div>
      <div className={styles.filtersInputsContainer}>
        <div className="">
          <h3>SEARCH</h3>
          <div className={styles.filtersSearchbar}>
            <div className={styles.searchIconContainer}>
              <MdSearch color="#fff" size={35} className={styles.searchIcon} />
            </div>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search..."
              value={filters.searchValue}
              onChange={(event) => setFilters({ ...filters, searchValue: event.target.value })}
            />
          </div>
        </div>
        <div className={styles.filtersSwitch}>
          <h3>COMPLEATED</h3>
          <FormControlLabel
            control={
              <Switch
                onChange={() => setFilters({ ...filters, compleated: !filters.compleated })}
              />
            }
            label={filters.compleated ? "YES" : "NO"}
            labelPlacement="start"
          />
        </div>
        <div className={styles.filtersDropdownContainer}>
          <h3>SELECT USER ID</h3>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={undefined}
            className={styles.dropdown}
            onChange={(event) =>
              setFilters({
                ...filters,
                selectedUserId: event.target.value ? Number(event.target.value) : undefined,
              })
            }
            IconComponent={() => (
              <img
                onClick={(event) => {
                  console.log(event);
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                className={styles.dropdownIcon}
                src={chevronDown}
              ></img>
            )}
          >
            <MenuItem value={undefined}>No ID Selected</MenuItem>
            {userIDs.map((ID) => (
              <MenuItem value={ID}>{ID}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className={styles.filtersResetContainer}>
        <a
          onClick={() => {
            setFilters({
              selectedUserId: undefined,
              compleated: undefined,
              searchValue: undefined,
            });
          }}
        >
          Reset Filters
        </a>
      </div>
    </div>
  );
};

export default Filters;
