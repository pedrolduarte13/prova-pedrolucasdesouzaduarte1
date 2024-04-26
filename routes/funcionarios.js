const express = require('express');

const router = express.Router();

let listaFuncionarios = [
    {
        id: 1,
        nome: "Pedro Lucas",
        email: "pedro@prova.com.br",
        telefone: "61 99999-9999",
        cargo: "suporte",
        salario: 3000.00
    },
    {
        id: 2,
        nome: "Lucas Pedro",
        email: "lucas@prova.com.br",
        telefone: "61 88888-8888",
        cargo: "estagio",
        salario: 1200.00
    }
]

// READ -> Listar todos os funcionários
router.get('/funcionarios', (req, res) => {
    res.json(listaFuncionarios);
});

// READ -> Busca de funcionário por id
router.get('/funcionarios/:id', (req, res) => {
    const id = req.params.id;
    const funcionario = listaFuncionarios.find(funcionario => funcionario.id == id);
    if (funcionario) {
        return res.json(funcionario);
    }
    return res.status(404).json({ mensagem: "Funcionário não encontrado!" });
});

// CREATE -> Cadastro de funcionário
router.post('/funcionarios:id', (req, res) => {
    const dados = req.body;

    if (!dados.nome || !dados.email || !dados.telefone || !dados.cargo || !dados.salario) {
        return res.status(400).json({ mensagem: "Nome, email, telefone, cargo e salario são obrigatórios" });
    }

    const funcionario = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
        salario: dados.salario
    };

    listaFuncionarios.push(funcionario);

    res.json({
        mensagem: "Funcionário cadastrado com sucesso!",
        funcionario: funcionario
    });
});

// UPDATE -> Atualização de funcionário
router.put('/funcionarios/:id', (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    if (!dados.nome || !dados.email || !dados.telefone || !dados.cargo || !dados.salario) {
        return res.status(400).json({ mensagem: "Nome, email, telefone, cargo e salario são obrigatórios" });
    }

    const index = listaFuncionarios.findIndex(funcionario => funcionario.id == id);
    if (index == -1) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado!" });
    }

    const funcionarioAtualizado = {
        id: Number(id),
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cargo: dados.cargo,
        salario: dados.salario
    };

    listaFuncionarios[index] = funcionarioAtualizado;

    res.json({
        mensagem: "Funcionário atualizado com sucesso!",
        funcionario: funcionarioAtualizado
    });
});

// DELETE -> Excluir um funcionário
router.delete('/funcionarios/:id', (req, res) => {
    const id = req.params.id;
    const index = listaFuncionarios.findIndex(funcionario => funcionario.id == id);
    if (index == -1) {
        return res.status(404).json({ mensagem: "Funcionário não encontrado!" });
    }

    listaFuncionarios.splice(index, 1);
    res.json({ mensagem: "Funcionário excluído com sucesso!" });
});

// READ -> Buscar todos os funcionários de um determinado cargo
router.get('/funcionarios/cargo/:cargo', (req, res) => {
    const cargo = req.params.cargo;
    const funcionarios = listaFuncionarios.filter(funcionario => funcionario.cargo.toLowerCase() == cargo.toLowerCase());
    res.json(funcionarios);
});

// Rota para calcular e retornar a média salarial de todos os funcionários
router.get('/funcionarios/media-salarial', (req, res) => {
    const totalSalarios = listaFuncionarios.reduce((acc, funcionario) => acc + funcionario.salario, 0);
    const mediaSalarial = totalSalarios / listaFuncionarios.length;

    res.json({ mediaSalarial: mediaSalarial });
});

module.exports = router;
