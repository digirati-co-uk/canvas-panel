import { saga as manifestSaga } from './spaces/manifest';
import { saga as structureSaga } from './spaces/structure';

const sagas = [manifestSaga, structureSaga];

export default sagas;
