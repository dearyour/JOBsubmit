import React from "react";
import styles from "../../styles/listView.module.css";
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className={styles.controlMenu}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

export default ControlMenu;
