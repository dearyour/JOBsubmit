import { useEffect, useRef, useContext, useState } from "react";
import { JoinFormContext } from "../../pages/join";
import styles from "../../styles/Join.module.css";
import { BsEyeSlashFill } from "react-icons/bs";
import { BiHappyHeartEyes } from "react-icons/bi";
import Button from "../commons/Button";
const ID_REGEX = new RegExp("^[a-z0-9_-]{5,20}$");
const PW_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");
const NICK_REGEX = new RegExp("^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,12}$");
const EMAIL_REGEX = new RegExp(
  "^[0-9a-zA-Z_-]+@[0-9a-zA-Z.-]+\\.[a-zA-Z]{2,6}$"
);
const PHONE_REGEX = new RegExp("^[0-9]{2,11}$");
const CODE_REGEX = new RegExp("^[a-zA-Z0-9]{4,8}$");

const ERROR_MSG = {
  required: "필수 정보입니다.",
  invalidId: "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
  invalidPw: "8~16자 영문 대 소문자, 숫자를 사용하세요.",
  invalidConfirmPw: "비밀번호가 일치하지 않습니다.",
  invalidNick: "한글 or 대,소문자 or 숫자 2~12 글자",
  invalidEmail: "Ex) Email@jobkorea.co.kr",
  invalidPhone: " - 을 제외한 숫자만 입력해주세요",
  invlaidCode: "올바른 인증코드를 작성해주세요",
};

const FormInput = ({
  id,
  inputProps,
  errorData,
  setErrorData,
  phoneNumberCheck,
  phoneValueCheck,
  func,
  type,
}) => {
  const inputRef = useRef(null);
  const { formData, setFormData } = useContext(JoinFormContext);

  const checkRegex = (inputId) => {
    let result;
    const value = formData[inputId];
    if (value.length === 0) {
      result = "required";
    } else {
      switch (inputId) {
        case "id":
          result = ID_REGEX.test(value) ? true : "invalidId";
          break;
        case "pw":
          result = PW_REGEX.test(value) ? true : "invalidPw";
          checkRegex("confirmPw");
          break;
        case "confirmPw":
          result = value === formData["pw"] ? true : "invalidConfirmPw";
          break;
        case "nickname":
          result = NICK_REGEX.test(value) ? true : "invalidNick";
          break;
        case "email":
          result = EMAIL_REGEX.test(value) ? true : "invalidEmail";
          break;
        case "phone":
          result = PHONE_REGEX.test(value) ? true : "invalidPhone";
          break;
        case "code":
          result = CODE_REGEX.test(value) ? true : "invlaidCode";
          break;
        default:
          return;
      }
    }

    setErrorData((prev) => ({ ...prev, [inputId]: result }));
  };

  useEffect(() => {
    if (id === "id") {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          className={styles.joinInput}
          ref={inputRef}
          value={formData[id]}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [id]: e.target.value }))
          }
          onBlur={() => checkRegex(id)}
          {...inputProps}
          type={type}
        />
        {id === "pw" || id === "confirmPw" ? (
          <div className={styles.blindIcon} onClick={func}>
            {!formData.showPassword ? (
              <BsEyeSlashFill style={{ marginTop: 12 }} />
            ) : (
              <BiHappyHeartEyes style={{ marginTop: 12 }} />
            )}
          </div>
        ) : (
          ""
        )}
        {id === "phone" ? (
          <Button
            text={"인증번호받기"}
            onClick={phoneNumberCheck}
            type={"negative"}
          />
        ) : (
          ""
        )}
        {id === "code" ? (
          <Button text={"확인"} onClick={phoneValueCheck} type={"conFirm"} />
        ) : (
          ""
        )}
      </div>
      <div className={styles.redFont}>
        {errorData[id] !== true ? ERROR_MSG[errorData[id]] : ""}
      </div>
    </div>
  );
};

export default FormInput;
