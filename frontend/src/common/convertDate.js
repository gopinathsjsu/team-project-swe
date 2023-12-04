const formatReleaseDate = (releaseDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(releaseDate).toLocaleDateString(undefined, options);
  return formattedDate;
}

export default formatReleaseDate;
