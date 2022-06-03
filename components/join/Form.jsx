import { useState, useContext } from "react";
import FormInput from "./FormInput";
import { JoinFormContext } from "../../pages/join";
import Button from "../commons/Button";
import PolicyCheck from "./PolicyCheck";
const initialErrorData = {
  id: "",
  pw: "",
  confirmPw: "",
  nickname: "",
  email: "",
  phone: "",
  code: "",
};

const Form = () => {
  const { formData, setFormData } = useContext(JoinFormContext); // 회원정보
  const [errorData, setErrorData] = useState(initialErrorData); // 정규표현식 false일때 보여 줄 에러메시지
  const [allCheck, setAllCheck] = useState(false); // 약관 전체동의
  const [ageCheck, setAgeCheck] = useState(false); // 15세 이상 동의
  const [useCheck, setUseCheck] = useState(false); // 서비스 이용 약관 동의
  const [privateCheck, setPrivateCheck] = useState(false); //  개인정보 수집 동의
  const [marketingCheck, setMarketingCheck] = useState(false); // 마케팅 정보 제공 동의
  const [promotionCheck, setPromotionCheck] = useState(false); // 광고성 정보 수신 동의
  const [privateInfoTime, setPrivateInfoTime] = useState("joindone"); // 개인정보 유효기간
  // const [disabled, setDisabled] = useState(false); //
  const handleSubmit = (e) => {
    e.preventDefault();
    let isNormal = true;
    let msg = "";

    let idValue = errorData.id != true;
    let pwValue = errorData.pw != true;
    let confirmPwValue = errorData.confirmPw != true;
    let nicknameValue = errorData.nickname != true;
    let emailValue = errorData.email != true;
    let phoneValue = errorData.phone != true;
    let codeValue = errorData.code != true;

    if (!formData.id || idValue) {
      isNormal = false;
      msg = "아이디를 다시 입력해 주세요 ";
    } else if (!formData.pw || pwValue) {
      isNormal = false;
      msg = "비밀번호를 다시 입력해 주세요 ";
    } else if (!formData.confirmPw || confirmPwValue) {
      isNormal = false;
      msg = "비밀번호 확인을 다시 입력해 주세요 ";
    } else if (!formData.nickname || nicknameValue) {
      isNormal = false;
      msg = "닉네임을 다시 입력해 주세요 ";
    } else if (!formData.email || emailValue) {
      isNormal = false;
      msg = "이메일을 다시 입력해 주세요 ";
    } else if (!formData.phone || phoneValue) {
      isNormal = false;
      msg = "핸드폰 번호를 다시 입력해 주세요 ";
    } else if (!formData.code || codeValue) {
      isNormal = false;
      msg = "인증번호를 다시 입력해 주세요 ";
    } else if (!ageCheck) {
      isNormal = false;
      msg = "만 15세 이상만 가입할 수 있습니다.";
    } else if (!useCheck) {
      isNormal = false;
      msg = "서비스 이용약관에 동의 해주세요";
    } else if (!privateCheck) {
      isNormal = false;
      msg = "개인정보 수집 및 이용동의를 해주세요";
    }
    if (isNormal) {
      const data = {
        email: formData.email,
        nickname: formData.nickname,
        pw: formData.pw,
        id: formData.id,
        phone: formData.phone,
        ageCheck,
        useCheck,
        privateCheck,
        marketingCheck,
        promotionCheck,
        privateInfoTime,
      };
      alert("회원가입이 완료 되었습니다.");
      console.log(data);
    } else {
      alert(msg);
    }
  };

  const phoneNumberCheck = (e) => {
    e.preventDefault();
    console.log("인증번호 전송");
  };
  const phoneValueCheck = (e) => {
    e.preventDefault();

    console.log("인증 확인");
  };
  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  return (
    <div id="form" autoComplete="off">
      <FormInput
        id={"id"}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "아이디",
        }}
      />
      <FormInput
        id={"pw"}
        errorData={errorData}
        setErrorData={setErrorData}
        func={handleClickShowPassword}
        type={formData.showPassword ? "text" : "password"}
        inputProps={{
          placeholder: "비밀번호",
          autoComplete: "off",
        }}
      />
      <FormInput
        id={"confirmPw"}
        errorData={errorData}
        setErrorData={setErrorData}
        func={handleClickShowPassword}
        type={formData.showPassword ? "text" : "password"}
        inputProps={{
          placeholder: "비밀번호 확인",
          autoComplete: "off",
        }}
      />
      <FormInput
        id={"nickname"}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "이름",
          autoComplete: "off",
        }}
      />
      <FormInput
        id={"email"}
        errorData={errorData}
        setErrorData={setErrorData}
        inputProps={{
          type: "text",
          placeholder: "이메일",
          autoComplete: "off",
        }}
      />
      <FormInput
        id={"phone"}
        errorData={errorData}
        setErrorData={setErrorData}
        phoneNumberCheck={phoneNumberCheck}
        inputProps={{
          type: "text",
          placeholder: "휴대폰 번호('-'없이 숫자만)",
          autoComplete: "off",
        }}
      />
      <FormInput
        id={"code"}
        errorData={errorData}
        setErrorData={setErrorData}
        phoneValueCheck={phoneValueCheck}
        inputProps={{
          type: "text",
          placeholder: "인증번호",
          autoComplete: "off",
        }}
      />

      {/* 약관 동의  */}
      <PolicyCheck
        allCheck={allCheck}
        setAllCheck={setAllCheck}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        useCheck={useCheck}
        setUseCheck={setUseCheck}
        marketingCheck={marketingCheck}
        setMarketingCheck={setMarketingCheck}
        privateCheck={privateCheck}
        setPrivateCheck={setPrivateCheck}
        promotionCheck={promotionCheck}
        setPromotionCheck={setPromotionCheck}
        setPrivateInfoTime={setPrivateInfoTime}
      />
      <div>
        <Button text={"가입하기"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Form;
