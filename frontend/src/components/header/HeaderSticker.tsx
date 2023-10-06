import "./HeaderSticker.css";

interface Props {
  text: any;
  stickerType: StickerType;
}

export enum StickerType {
  Info,
  SuccessAlert,
  ErrorAlert,
}

const StickerTypeColorMap = new Map([
  [StickerType.Info, "#f9cd07"],
  [StickerType.SuccessAlert, "lightgreen"],
  [StickerType.ErrorAlert, "lightpink"],
]);

const HeaderSticker = (props: Props) => {
  const backgroundColor = StickerTypeColorMap.get(props.stickerType);
  return (
    <button
      className="header-sticker"
      style={{ backgroundColor: backgroundColor }}
    >
      {props.text}
    </button>
  );
};

export default HeaderSticker;
