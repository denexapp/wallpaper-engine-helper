const deilmeter = ' - ';

// eslint-disable-next-line import/prefer-default-export
export const parseFirstArchiveName = (name: string): number | null => {
  if (!(name.endsWith('.7z') || name.endsWith('.7z.001'))) return null;
  const delimeterIndex = name.indexOf(deilmeter);
  if (delimeterIndex === -1) return null;
  const archiveIdString = name.slice(0, delimeterIndex);
  const archiveId = Number.parseInt(archiveIdString, 10);
  if (archiveId.toString(10) !== archiveIdString) return null;
  return archiveId;
};
