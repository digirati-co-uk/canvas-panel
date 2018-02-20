import { saga as manifestSaga } from './spaces/manifest';
import { saga as structureSaga } from './spaces/structure';
import { saga as annotationSaga } from './spaces/annotations';
import { saga as searchSaga } from './spaces/search';

const sagas = [manifestSaga, structureSaga, annotationSaga, searchSaga];

export default sagas;
