import { saga as manifestSaga } from './spaces/manifest';
import { saga as annotationSaga } from './spaces/annotations';
import { saga as searchSaga } from './spaces/search';

const sagas = [manifestSaga, annotationSaga, searchSaga];

export default sagas;
