const putRequestHandler = (req, res) => {
	try {
		//console.log(req);
		res.status(200).send({ data: 'Happy from put', req });
	} catch (err) {
		console.log(err);
	}
};

exports.putRequestController = {
	putRequestHandler,
};
