// Controlador para o modelo Filme

var Aluno = require('../models/aluno')



/*Devolve a lista dos alunos, ordenada alfabeticamente por nome, 
com os campos: idAluno, nome e curso;*/
module.exports.listar = () => {
    return Aluno
        .find({}, { nome: 1,_id: 0, idAluno:1, curso: 1})
        .sort('nome')
        .exec()
}

/*
Devolve a lista de alunos (com idAluno, nome e curso), ordenada 
alfabeticamente por nome, e um quarto campo correspondente ao número de TPC realizados;
 */
 module.exports.listatpc = () => {
    return Aluno.aggregate([{"$unwind": "$tpc"}, 
    {$group: {_id:"$tpc.tp",numero:{$sum:1}}},{$project: 
    {_id:0,"nome":"$_id", quantos:"$numero"}}])
        
}

module.exports.consultar = id => {
    return Aluno
        .findOne({ idAluno: id })
        .exec()
}


module.exports.curso = (nome) => {
    return Aluno
        .find({curso:nome}, {})
        .sort('nome')
        .exec()
}
/*
Devolve a lista de alunos, ordenada alfabeticamente 
por nome, que realizaram o exame de recurso: idAluno, nome, curso, recurso;
MAL
*/
module.exports.recurso = () => {
    return Aluno
        .find()
        .sort('nome')
        .exec()
}


/*
Devolve a lista de cursos, ordenada alfabeticamente, e 
para cada um indica quantos alunos estão registados;
 */
 module.exports.curso2 = () => {
    return Aluno
        aggregate([{$group: {_id:"$curso",numero:{$sum:1}}},
        {$project: {_id:0,"nome":"$_id", quantos:"$numero"}}, 
        { $sort : { nome : 1 } }])
}

/*
Devolve uma lista de notas registadas no projeto e 
para cada um indica o total de alunos que a obtiveram;
*/
module.exports.projeto = () => {
    return Aluno
        .aggregate([
            {$group: {_id:"$projeto",numero:{$sum:1}}},
            {$project: {_id:0,"projeto":"$_id",nAlunos:"$numero"}}
        ])
}

/*
Devolve uma lista de alunos, ordenada alfabeticamente por 
nome, com o resultado final: idAluno, nome, curso e notaFinal, em que notaFinal poderá 
ser "R"
 */
 module.exports.avaliados = () => {
    return Aluno
         .find({}, {idAluno:1, _id:0, nome:1, curso:1})
        .sort(-'nome')
        .exec()
}