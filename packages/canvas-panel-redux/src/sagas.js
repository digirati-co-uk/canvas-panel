import { saga as manifestSaga } from './spaces/manifest';
import { saga as annotationSaga } from './spaces/annotations';

const sagas = [manifestSaga, annotationSaga];

export default sagas;
