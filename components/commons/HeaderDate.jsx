const HeaderDate = ({ headText, leftChild, rightChild }) => {
  return (
    <header className="headDataWrapper">
      <div className="headDate_btn_left">{leftChild}</div>
      <div className="headDate_text">{headText}</div>
      <div className="headDate_btn_right">{rightChild}</div>
    </header>
  );
};

export default HeaderDate;
