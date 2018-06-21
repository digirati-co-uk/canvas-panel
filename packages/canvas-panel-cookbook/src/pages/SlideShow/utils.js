import lorem from 'lorem-ipsum-simple';

export const lipsumN = paragraphs =>
  Array.apply(null, Array(paragraphs)).map(() =>
    lorem(100).replace(/\s+/g, ' ')
  );

export const lipsumP = paragraphs =>
  lipsumN(paragraphs).map((lipsum, idx) => <p key={idx}>{lipsum}</p>);
