import PlusButton from "./PlusButton";
import "./buttons.css"

interface Props {
  title: string;
}

const AddNewSimulation = (props: Props) => {
  const showColor = "#898989";
  const hideColor = "#f7f7f5";


  return (
    <div
    className="group-title add-simulation">
      <PlusButton show={true} showColor={showColor} hideColor={hideColor}/>

      {props.title}

    </div>
  );
};

export default AddNewSimulation;
