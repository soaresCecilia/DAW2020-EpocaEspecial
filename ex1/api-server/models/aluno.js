const mongoose = require('mongoose')

var alunoSchema = new mongoose.Schema({
    idAluno: { type: String, required: true },
    nome: String,
    curso: String,
    tpc: [{
            tp: String,
            nota: Number
        }],
    projeto: Number,
    exames: {
            recurso: Number,
            especial: Number,
            normal: Number
        }
  });

module.exports = mongoose.model('aluno', alunoSchema)