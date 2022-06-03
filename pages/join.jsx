import React, { useState, createContext } from "react";
import styles from "../styles/Join.module.css";
import Header from "../components/commons/Header";
import { AiOutlineMenu } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import Form from "../components/join/Form";
import Router from "next/router";

const initialFormData = {
  id: "",
  pw: "",
  confirmPw: "",
  showPassword: false,
  nickname: "",
  email: "",
  phone: "",
  code: "",
};

export const JoinFormContext = createContext({
  formData: initialFormData,
  setFormData: () => {},
});

const Join = () => {
  const [formData, setFormData] = useState(initialFormData);
  return (
    <JoinFormContext.Provider value={{ formData, setFormData }}>
      <section className={styles.container}>
        <Header
          headText={"개인회원 가입"}
          leftChild={<AiOutlineMenu onClick={() => Router.push("/listView")} />}
          rightChild={<BsSearch />}
        />
        <Form />
      </section>
    </JoinFormContext.Provider>
  );
};

export default Join;
