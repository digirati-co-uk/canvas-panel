const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin ante at massa ullamcorper placerat. Quisque in sollicitudin libero. Pellentesque id finibus eros. Nullam ultrices hendrerit diam nec efficitur. Fusce euismod felis leo, luctus malesuada massa luctus nec. Nulla faucibus posuere metus, vel semper dui semper quis. Etiam quis augue urna. Pellentesque ornare nisl nulla, eget euismod nisi euismod vel. Phasellus ultricies imperdiet cursus. Donec sollicitudin sagittis felis eu viverra.';

export const lipsumN = paragraphs =>
  Array.apply(null, Array(paragraphs)).map(() => LOREM.replace(/\s+/g, ' '));

const lipsumP = paragraphs =>
  Array.apply(null, Array(paragraphs))
    .fill(LOREM)
    .map((lipsum, idx) => <p key={idx}>{lipsum}</p>);
