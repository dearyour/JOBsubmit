import React, { useState } from "react";
import Button from "../commons/Button";
import styles from "../../styles/listView.module.css";
const itemComponent = ({
  categoryResult,
  company,
  nickname,
  content,
  dateTime,
  hitCount,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const strDate = new Date(parseInt(dateTime)).toLocaleDateString();

  return (
    <div className={styles.listViewItem}>
      <div className={styles.dateInfo}>{strDate}</div>
      <div
        className={["pass_wrapper", `pass_wrapper_${categoryResult}`].join(" ")}
      >
        {categoryResult}
      </div>
      <div className={styles.info_wrapper}>
        <div className={styles.company}>
          <span onClick={toggleCart}>{company}</span>
        </div>
        <div className={styles.contnetToggleBtn}>
          <span>
            {isCartOpen ? (
              <Button text={"^"} onClick={toggleCart} />
            ) : (
              <Button text={"ν"} onClick={toggleCart} />
            )}
          </span>
        </div>
        {isCartOpen && <div className={styles.content}>{content}</div>}
      </div>
      <div className={styles.nicknameWrapper}>{nickname}</div>
      <div className={styles.hitCount}>{hitCount}</div>
    </div>
  );
};

export default React.memo(itemComponent);
