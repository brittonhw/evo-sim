import "./buttons.css";

interface Props {
  show: boolean;
  showColor: string;
  hideColor: string;
  handleClick: any;
  id: string;
}

const DotsButton = (props: Props) => {

  return (
    <div className="xs-button left" onClick={() => props.handleClick(props.id)}>
      <div
        className="dot"
        style={{
          backgroundColor: props.show ? props.showColor : props.hideColor,
        }}
      ></div>
      <div
        className="dot"
        style={{
          backgroundColor: props.show ? props.showColor : props.hideColor,
        }}
      ></div>
      <div
        className="dot"
        style={{
          backgroundColor: props.show ? props.showColor : props.hideColor,
        }}
      ></div>
    </div>
  );
};

export default DotsButton;
