const Button = ({ text, type, onClick }) => {
  // 반드시 3가지 타입으로 나누기위해 tpye이 존재하면 그 타입 반환하고
  // props로 잘못된 타입이 전달된다면 강제로 default로 처리하기위해 btnType 작성
  const btnType = ["positive", "negative", "conFirm"].includes(type)
    ? type
    : "default";

  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
