export const BACKEND_IP = 'localhost';
export const PORT = `4000`;
export const BACKEND_URL = `http://${BACKEND_IP}:${PORT}`;

export const BACKEND_SUB = `ws://${BACKEND_IP}:${PORT}`;
export const BACKEND_IMAGES = BACKEND_URL + '/files/images/';
export const BACKEND_URL_FILE_UPLOAD = `http://${BACKEND_IP}:${PORT}/file-upload`;

export const STATUS_ALL = 'All';
export const STATUS_DRAFT = 'DRAFT';
export const STATUS_PENDING = 'PENDING';
export const STATUS_ACTIVE = 'ACTIVE';
export const STATUS_SUCCESS = 'SUCCESS';
export const STATUS_FAILED = 'FAILED';

export const EXIST_USERNAMEGMAIL = 'usernamegmail';
export const EXIST_USERNAME = 'username';
export const EXIST_GMAIL = 'gmail';

export const GG_MAP_API = 'AIzaSyB_8vefOV1JnGvShVFG0BS9_rKgU3BKT-k';

//================================================ OPEN STREET MAP ===========================================
// export function OPEN_STREET_MAP_DISTANCE_MATRIX_API(
//     origin: any,
//     destination: any
// ) {
//     return `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${destination[1]},${destination[0]}?overview=false`;
// }
