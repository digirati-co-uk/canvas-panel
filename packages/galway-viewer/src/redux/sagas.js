import { saga as manifestSaga } from './spaces/manifest';
import { saga as structureSaga } from './spaces/structure';
import { saga as annotationSaga } from './spaces/annotations';

const sagas = [manifestSaga, structureSaga, annotationSaga];

export default sagas;
