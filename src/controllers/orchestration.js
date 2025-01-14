'use strict'
const orchestrationHandler = async (packages, req, res) => {
	try {
		const { targetPackages, inSequence, sourceRoute } = req
		console.log(targetPackages, inSequence, sourceRoute)
		console.log(packages)
		let result
		const responses = {}
		if (inSequence) {
			for (const servicePackage of targetPackages) {
				const selectedPackage = packages.find(
					(obj) => obj.packageMeta.basePackageName === servicePackage.basePackageName
				)
				console.log('SelectedPackage: ', selectedPackage)
				req['baseUrl'] =
					process.env[`${selectedPackage.packageMeta.basePackageName.toUpperCase()}_SERVICE_BASE_URL`]
				responses[selectedPackage.packageMeta.basePackageName] = await selectedPackage.packageRouter(
					req,
					res,
					responses
				)
				console.log('RESPONSES::::::::::::: ', responses)
			}
			result = responses
		} else {
			result = await Promise.all(
				targetRoutes.map((route) => {
					const servicePackage = packages.find(
						(obj) => obj.packageMeta.basePackageName === route.basePackageName
					)
					return servicePackage.controllers[route.controllerName][route.functionName].bind(
						null,
						responses
					)(req.body)
				})
			)
		}
		res.status(200).send(result)
	} catch (err) {
		console.log(err)
	}
}

exports.orchestrationController = {
	orchestrationHandler,
}
