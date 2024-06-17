export enum ModelStatus {
    NOT_STARTED,
    READY_TO_SIMULATE,
    SIMULATED,
}

export interface ModelInfo {
    name: string
    id: string
    status: ModelStatus
}

// const generateRandomString = () => {
//     let randomString = '';
  
//     for (let i = 0; i < 20; i++) {
//       const randomCharCode = Math.floor(Math.random() * (122 - 48) + 48);
//       randomString += String.fromCharCode(randomCharCode);
//     }
  
//     return randomString;
//   };

  