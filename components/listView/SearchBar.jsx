import React from "react";
import styles from "../../styles/listView.module.css";
import { BsSearch } from "react-icons/bs";
const SearchBar = ({ value, changeInput }) => (
  <div className={styles.searchBarWrap}>
    <BsSearch className={styles.searchBarIcon} />
    <input
      type="text"
      placeholder="면접 기업명을 입력해 주세요"
      value={value}
      onChange={changeInput}
    />
  </div>
);

export default SearchBar;
