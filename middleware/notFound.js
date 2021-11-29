const notFound = (req, res) => {
  res.status(404).json({
    msg: 'Sorry, page not found',
  });
};
export default notFound;
