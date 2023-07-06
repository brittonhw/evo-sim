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

  const dragStart = (e: React.DragEvent<HTMLButtonElement>, item: Item) => {
    console.log(e.target);
    console.log(item.id);
  };

  return (
    <>
      <ul>
        <p><b>{props.groupTitle}</b></p>
        {itemList.map((item) => (
          <div>
            <button
              onDragStart={(e) => {
                dragStart(e, item);
              }}
              //   onDragEnter={(e) => dragEnter(e, index)}
              //   onDragEnd={drop}
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
