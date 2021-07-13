var express = require('express');
var router = express.Router();

var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWQ0YmQwMTY0NDdkMDAxOWQzODAyZSIsImlhdCI6MTYyNjE2NDE3NiwiZXhwIjoxNjI4NzU2MTc2fQ.EAccXEkb8PnuNSlZvCeAxk_5pltOFlALIVCp5gsmWqNWtHvSgDxl7lP9yE5sHljRoMfxyW1yYZnaAmmR8s5lhZQqMH5Fvh37SMCfJke2nnvYgMR7gofdlqmJrhWjLKDzvBQH7qF5ma11xcmegxoVJaYTo8EAvO_p6F2PWIPNtkNLBP3Sk_6PDUk5bBH_SQGRJVfe1yPAxfi2cKUVjgCdceEjyAd6WxyXz08SQI4W-0DmYDtr31gUx7AcMA16U-iwFrGiz3iyCouY8bcAHLO974cereZpfrPNGFZ8To54FQ8ajXTjQ-3DLM9qOAAiguPuWr0yQ3LQk4f9YUb9IbpadQ";

var axios = require('axios');

/* GET página inicial 
Na página inicial, para além de um título e outra 
informação de contexto, deverá aparecer a lista de diplomas (data, tipo, número e sumário);

*/
router.get('/', function(req, res, next) {
	axios.get('http://clav-api.dglab.gov.pt/v2/legislacao?apikey=' + token)
		.then(dados => res.render('index', {diplomas: dados.data}))
		.catch(erro => res.render('error', {error: erro}))
})

/* GET página team */
router.get('/diploma/:id', function(req, res, next) {
	axios.get('http://clav-api.dglab.gov.pt/v2/legislacao/' + req.params.id + '/processos?apikey=' + token)
		.then(dados => res.render('diploma', {diploma: dados.data}))
		.catch(erro => res.render('error', {error: erro}))
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
