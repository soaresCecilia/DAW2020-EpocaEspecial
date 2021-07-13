var express = require('express');
var router = express.Router();
const Aluno = require('../controllers/aluno')

/* GET /api/alunos - Devolve a lista dos alunos, ordenada alfabeticamente por nome, 
com os campos: idAluno, nome e curso;
GET /api/alunos?groupBy=curso - Devolve a lista de cursos, ordenada alfabeticamente, e 
para cada um indica quantos alunos estão registados;
GET /api/alunos?groupBy=projeto - Devolve uma lista de notas registadas no projeto e 
para cada um indica o total de alunos que a obtiveram;
GET /api/alunos?groupBy=recurso - Devolve a lista de alunos, ordenada alfabeticamente 
por nome, que realizaram o exame de recurso: idAluno, nome, curso, recurso;
GET /api/alunos?curso=X - Devolve apenas uma lista, ordenada alfabeticamente por nome, 
com os alunos do curso X;
*/
router.get('/alunos', function(req, res, next) {
  console.log(req.query)
  if (req.query.curso) {
    Aluno.curso(req.query.curso)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
  }
  else if(req.query.groupBy){
    if(req.query.groupBy == 'projeto'){
      Aluno.projeto()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
    }
    if (req.query.groupBy == 'recurso') {
      Aluno.recurso()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
    }
    if (req.query.groupBy == 'curso') {
      Aluno.curso2()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
    }
  }
  else{
    Aluno.listar()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(500).jsonp({ error: e }))
    }
});

/*
GET /api/alunos/tpc - Devolve a lista de alunos (com idAluno, nome e curso), ordenada 
alfabeticamente por nome, e um quarto campo correspondente ao número de TPC realizados;
 */
router.get('/alunos/tpc', function (req, res) {
  Aluno.listatpc()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({ error: e }))
});


/*
GET /api/alunos/avaliados - Devolve uma lista de alunos, ordenada alfabeticamente por 
nome, com o resultado final: idAluno, nome, curso e notaFinal, em que notaFinal poderá 
ser "R" ou um valor entre 10 e 20 calculado da seguinte forma:
Se a nota do Projeto for inferior a 8 o resultado é "R";
Se a o máximo das notas obtidas em exame for inferior a 8 o resultado é "R";
A nota final é calculada somando todos os resultados obtidos nos TPC, e somando a 
este resultado 40% da nota do projeto e 40% da nota máxima obtida em exame; se esta nota 
final for inferior a 10 o resultado é "R" caso contrário o resultado é a nota calculada.
*/

router.get('/alunos/avaliados', function (req, res) {
  Aluno.avaliados()
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({ error: e }))
});
/*GET /api/alunos/:id - Devolve a informação completa de um aluno (nesta rota, considere 
para id o campo idAluno);
*/
router.get('/alunos/:id', function (req, res) {
  Aluno.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({ error: e }))
});

module.exports = router;
