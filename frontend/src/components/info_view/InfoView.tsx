import { useEffect } from "react";
import { AUTH_URL, EVO_SIM_BASE_URL, getData } from "../../api/RestTemplate";
import { useAlert } from "../../contexts/AlertContext";
import { StickerType } from "../header/HeaderSticker";

const InfoView = () => {
  const { showAlert } = useAlert();

  useEffect(() => {
    const url = EVO_SIM_BASE_URL + AUTH_URL;

    getData(url)
      .then(() => showAlert("Retrieved token", StickerType.SuccessAlert, 3))
      .catch(() => showAlert("Could not get token.", StickerType.ErrorAlert, 7));
  }, []);

  return (
    <>
      <div className="info-view">
        <p>
          Here, you can view an overview of your model. Feel free to add a
          description of your model so collaborators can see what your aims are.
        </p>
      </div>
    </>
  );
};

export default InfoView;
