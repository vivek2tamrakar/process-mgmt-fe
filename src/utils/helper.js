import { authInstance, detailsInstance } from 'service/axiosinstance';
// import { RefreshTokenPayload } from 'views/Dashboard/Connections/CandidateList/interfaces'

export const determineInstance = (type) => {
  switch (type) {
    case 'auth':
      return authInstance;
    case 'details':
      return detailsInstance;
    default:
      return detailsInstance;
  }
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const issuerName = ['SynchroServe', 'Synchroserve'];
