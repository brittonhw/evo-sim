import { useState } from "react";
import {
  EVO_SIM_BASE_URL,
  POSITIONS_URL,
  getBlob,
  postData,
} from "../../api/RestTemplate";
import { useAlert } from "../../contexts/AlertContext";
import { StickerType } from "../header/HeaderSticker";
import {
  AnimationData,
  convert_bytes_to_animation_dto,
} from "../../util/Decoding";

const InfoView = () => {
  const { showAlert } = useAlert();

  const [bytesLen, setBytesLen] = useState<number | null>(null);
  const [animationData, setAnimationData] = useState<AnimationData | null>(
    null
  );

  async function fetchBytes() {
    const url = EVO_SIM_BASE_URL + POSITIONS_URL;
    showAlert("Fetching bytes...", StickerType.Info, 2);

    try {
      const blob = await getBlob(url);
      showAlert("Fetched bytes successfully", StickerType.SuccessAlert, 12);
      const byte_array = new Uint8Array(await blob.arrayBuffer());
      setBytesLen(byte_array.length);
      const animationData: AnimationData =
        convert_bytes_to_animation_dto(byte_array);
      setAnimationData(animationData);
    } catch (error) {
      console.error("Error fetching bytes:", error);
      showAlert("Could not fetch bytes.", StickerType.ErrorAlert, 7);
    }
  }

  async function fetchJsonData() {
    const url = 'http://localhost:8300/evo-sim/creature/population-positions/example?population_size=1000&gameboard_size=256&lifecycle_steps=300'
    try {
      const json = await postData(url, {})
      console.log("json data: creature id:", json[0].id)
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("Could not fetch data.", StickerType.ErrorAlert, 7);
    }
  }

  return (
    <>
      <div className="info-view">
        <p>
          Here, you can view an overview of your model. Feel free to add a
          description of your model so collaborators can see what your aims are.
        </p>
        {bytesLen && <p>bytes len is {bytesLen}</p>}
        {animationData && <p># of creatrues is {animationData.n_creatures}</p>}

        <button onClick={() => fetchBytes()}>Fetch Bytes</button>
        <p></p>
        <button
          onClick={() => {
            setBytesLen(null);
            setAnimationData(null);
          }}
        >
          reset
        </button>
        <p></p>
        <button onClick={() => fetchJsonData()}>fetch json</button>

      </div>
    </>
  );
};

export default InfoView;
