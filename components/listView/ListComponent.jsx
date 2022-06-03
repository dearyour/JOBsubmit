import React, { useState } from "react";
import ItemComponent from "./ItemComponent";
import styles from "../../styles/listView.module.css";
import Pagination from "./Pagination";
const ListComponent = ({ listItems }) => {
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <>
      <div className={styles.listHeader}>
        <div className={styles.dateInfos}>작성일</div>
        <div className={styles.pass_fail_wrappers}>합격 여부</div>
        <div className={styles.info_wrappers}>
          <div>면접기업</div>
        </div>
        <div className={styles.nicknameWrapper}>작성자</div>
        <div className={styles.hitCount}>조회수</div>
      </div>
      <div>
        {listItems.slice(offset, offset + limit).map((it) => {
          return <ItemComponent key={it.id} {...it} />;
        })}
      </div>
      <div className="pageControl">
        <label>
          페이지 당 게시물 : &nbsp;
          <select
            className="pageSelect"
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
      <footer>
        <Pagination
          total={listItems.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </>
  );
};

ListComponent.defaultProps = {
  listItems: [],
};
export default ListComponent;
