import { useAlert } from "../../contexts/AlertContext";
import HeaderSticker, { StickerType } from "./HeaderSticker";

const Header = () => {
  const { alert, showAlert } = useAlert();
  return (
    <div className="header">
      <div style={{ display: "flex" }}>
        <h2>evo sim</h2>
        <HeaderSticker
          text={process.env.NODE_ENV}
          stickerType={StickerType.Info}
        />
        {alert && (
                    <HeaderSticker
                    text={alert.message}
                    stickerType={alert.type}
                  />
        )}
      </div>
    </div>
  );
};

export default Header;
