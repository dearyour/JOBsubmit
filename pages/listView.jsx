import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/listView.module.css";
import Header from "../components/commons/Header";
import Router from "next/router";
import HeaderDate from "../components/commons/HeaderDate";
import Button from "../components/commons/Button";
import ListComponent from "../components/listView/ListComponent";
import { AiOutlineMenu } from "react-icons/ai";
import { filterOptionList, sortOptionList } from "../public/data/category";
import ControlMenu from "../components/listView/ControlMenu";
import SearchBar from "../components/listView/SearchBar";
const ListView = () => {
  const [listItems, setListItems] = useState([]); //변형 배열
  const [data, setData] = useState([]); //  원본 배열

  // Mock Data 받아오기
  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((res) => {
        setListItems(res);
        setData(res);
      });
  }, []);

  const [datefilter, setDateFilter] = useState("latest"); // 날짜 정렬 상태
  const [sortType, setSortType] = useState(""); // 합격 불합격 상태
  const [searchInput, setSearchInput] = useState(""); // 검색 창
  const [curDate, setCurDate] = useState(new Date()); //현재 시간 헤더데이트 날짜 움직임
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  const [privateInfoTime, setPrivateInfoTime] = useState("잡코리아"); // 개인정보 유효기간

  // 날짜 헤더 조작 부분
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  // 정렬순서, 이번달 최신 순, 이번달 오래된 순 , 최다 조회수 순
  const compare = useCallback(
    (a, b) => {
      if (datefilter === "latest") {
        return parseInt(b.dateTime) - parseInt(a.dateTime);
      } else if (datefilter === "oldest") {
        return parseInt(a.dateTime) - parseInt(b.dateTime);
      } else if (datefilter === "hitCount") {
        return parseInt(b.hitCount) - parseInt(a.hitCount);
      }
    },
    [datefilter]
  );

  // 리스트 필터 부분
  const applyFilters = () => {
    let updatedList = data; //원본배열 삽입
    // 예전 처음 필터할 때 몇시간 동안 해맨부분
    // 면접리스트가 담긴 배열을 직접 filter하면 useState 상태 listItems 자체가 변형됩니다.
    // 예를들어 가격 범위가 50원에서 100원까지 구하고 싶어서 50~100 범위로 필터 한 후
    // 다시 120 원 가격을 필터 하고싶다면 이미 위에서 최대 100까지 필터된 상태라
    // 120값은 해당범위 값이 아니라 필터할 수가 없습니다
    // 그래서 비동기통신으로 받은 상태값 자체를 바로필터하면 안되고
    // 깊은복사를 하거나 새로운 상태값
    //(리덕스에저장 or 새로운 원본배열 useState에 저장 or 깊은 복사)에 저장을해서
    // 원본 배열값 data를 유지해주고 해당 listItems 배열값이 변하여 새롭게 필터를해도
    // 원본배열값은 data는 변경이 되지않으므로
    // 50~100으로 필터 후 다시 120을 필터해도 필터가 가능하게 되었습니다.

    if (updatedList) {
      //합격, 불합격 필터
      if (sortType) {
        updatedList = updatedList.filter(
          (item) => item.categoryResult === sortType
        );
      }
      // 검색 필터
      if (searchInput) {
        updatedList = updatedList.filter(
          (item) =>
            item.company
              .toLowerCase()
              .search(searchInput.toLowerCase().trim()) !== -1
        );
      }

      // 해당 월의 날짜만 보여주기
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      updatedList = updatedList.filter(
        (it) => firstDay <= it.dateTime && it.dateTime <= lastDay
      );

      //날짜 최신순
      updatedList = updatedList.sort(compare);
      setListItems(updatedList);
    }
  };

  //의존성 배열값이 변경되면 다시 필터
  useEffect(() => {
    applyFilters();
  }, [searchInput, datefilter, sortType, compare, curDate, data]);

  return (
    <section className={styles.container}>
      <Header
        headText={"면접 족보"}
        leftChild={<AiOutlineMenu onClick={() => Router.push("/join")} />}
      />
      <HeaderDate
        headText={headText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <div className="">
        <SearchBar
          value={searchInput}
          changeInput={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className={styles.menu_wrapper}>
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={filterOptionList}
          />
          <ControlMenu
            value={datefilter}
            onChange={setDateFilter}
            optionList={sortOptionList}
          />
        </div>
        <div className={styles.right_col}>
          <Button type={"positive"} text={"면접 후기 등록"} />
        </div>
      </div>

      <ListComponent listItems={listItems} />
    </section>
  );
};

export default ListView;
