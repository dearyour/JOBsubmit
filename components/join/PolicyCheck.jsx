import React, { useEffect } from "react";
import styles from "../../styles/Join.module.css";
import { MdArrowForwardIos } from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";

const PolicyCheck = ({
  allCheck,
  setAllCheck,
  ageCheck,
  setAgeCheck,
  useCheck,
  setUseCheck,
  marketingCheck,
  setMarketingCheck,
  privateCheck,
  setPrivateCheck,
  promotionCheck,
  setPromotionCheck,
  setPrivateInfoTime,
}) => {
  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
      setPrivateCheck(true);
      setPromotionCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
      setPrivateCheck(false);
      setPromotionCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };
  const privateBtnEvent = () => {
    if (privateCheck === false) {
      setPrivateCheck(true);
    } else {
      setPrivateCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  const promotionBtnEvent = () => {
    if (promotionCheck === false) {
      setPromotionCheck(true);
    } else {
      setPromotionCheck(false);
    }
  };

  useEffect(() => {
    if (
      ageCheck === true &&
      useCheck === true &&
      marketingCheck === true &&
      privateCheck === true &&
      promotionCheck === true
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck, privateCheck, promotionCheck]);

  return (
    <div>
      <div className={styles.policy}>약관동의</div>
      <div>
        <div className={styles.form_agreement_all}>
          <input
            type="checkbox"
            id="all-check"
            className={styles.checkboxAll}
            checked={allCheck}
            onChange={allBtnEvent}
          />
          <label htmlFor="all-check">
            필수동의 항목 및 마케팅 정보 제공 동의(선택), 광고성
            <br /> 정보 수신 동의(선택)에 전체 동의합니다.
          </label>
        </div>
        <div className={styles.essentialWrapper}>
          <div className={styles.form_agreement}>
            <input
              type="checkbox"
              id="check1"
              className={styles.checkboxs}
              checked={ageCheck}
              onChange={ageBtnEvent}
            />
            <label htmlFor="check1">
              <span className={styles.orenge}>(필수)</span> 만 15세 이상입니다
            </label>
          </div>
          <div className={styles.form_agreement}>
            <input
              type="checkbox"
              id="check2"
              className={styles.checkboxs}
              checked={useCheck}
              onChange={useBtnEvent}
            />
            <label htmlFor="check2" className={styles.checkLabel}>
              <span className={styles.orenge}>(필수)</span> 서비스 이용약관 동의
            </label>
            <div className={styles.check_wrp_right}>
              <MdArrowForwardIos />
            </div>
          </div>
          <div className={styles.form_agreement}>
            <input
              type="checkbox"
              id="check3"
              className={styles.checkboxs}
              checked={privateCheck}
              onChange={privateBtnEvent}
            />
            <label htmlFor="check3" className={styles.checkLabel}>
              <span className={styles.orenge}>(필수)</span> 개인정보수집 및 이용
              동의
            </label>
            <div className={styles.check_wrp_right}>
              <MdArrowForwardIos />
            </div>
          </div>
        </div>
        <div className={styles.form_agreement}>
          <input
            type="checkbox"
            id="check4"
            className={styles.checkboxs}
            checked={marketingCheck}
            onChange={marketingBtnEvent}
          />
          <label htmlFor="check4" className={styles.checkLabel}>
            <span className={styles.grayFont}>(선택)</span> 마케팅 정보 제공
            동의
          </label>
          <div className={styles.check_wrp_right}>
            <MdArrowForwardIos />
          </div>
        </div>
        <div className={styles.form_agreement}>
          <input
            type="checkbox"
            id="check5"
            className={styles.checkboxs}
            checked={promotionCheck}
            onChange={promotionBtnEvent}
          />
          <label htmlFor="check5" className={styles.checkLabel}>
            <span className={styles.grayFont}>(선택)</span> 광고성 정보
            이메일/SMS 수신 동의
          </label>
          <div className={styles.check_wrp_right}>
            <MdArrowForwardIos />
          </div>
        </div>
        <div className={styles.radioHeader}>
          <div className={styles.policy}>개인정보 유효기간</div>
          <div className={styles.question}>
            <BsQuestionCircleFill />
          </div>
        </div>
        <div
          id="order"
          onChange={(e) => setPrivateInfoTime(e.target.value)}
          className={styles.radioWrapper}
        >
          <input type="radio" name="order" id="oneyaer" value="oneyaer" />
          <label htmlFor="oneyaer" className={styles.radioBtn}>
            1년
          </label>
          <input type="radio" name="order" id="threeyaer" value="threeyaer" />
          <label htmlFor="threeyaer" className={styles.radioBtn}>
            3년
          </label>
          <input
            type="radio"
            name="order"
            id="joindone"
            value="joindone"
            defaultChecked={true}
          />
          <label htmlFor="joindone" className={styles.radioBtn}>
            회원 탈퇴시
          </label>
        </div>
      </div>
    </div>
  );
};

export default PolicyCheck;
