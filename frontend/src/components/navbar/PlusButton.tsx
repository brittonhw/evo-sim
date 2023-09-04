import "./buttons.css";

interface Props {
  show: boolean;
  showColor: string;
  hideColor: string;
}

const PlusButton = (props: Props) => {
  return (
    <div className="xs-button">
      <div
        className="horiz-line"
        style={{
          backgroundColor: props.show ? props.showColor : props.hideColor,
        }}
      ></div>
      <div
        className="vert-line"
        style={{
          backgroundColor: props.show ? props.showColor : props.hideColor,
        }}
      ></div>
      <div
        className="horiz-line right"
        style={{
          backgroundColor: props.show ? props.showColor : props.hideColor,
        }}
      ></div>
    </div>
  );
};

export default PlusButton;
