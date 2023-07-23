import { useState } from "react";
import "../index.css";

interface Item {
  label: string;
  id: string;
}

type Props = {
  items: Item[];
  groupTitle: string;
};

const List = (props: Props) => {
  const [itemList, _setItemList] = useState(props.items);

  return (
    <>
      <ul>
        <p><b>{props.groupTitle}</b></p>
        {itemList.map((item) => (
          <div>
            <button
              key={item.id}
              draggable={true}
            >
              {item.label}
            </button>
          </div>
        ))}
      </ul>
    </>
  );
};

export default List;
