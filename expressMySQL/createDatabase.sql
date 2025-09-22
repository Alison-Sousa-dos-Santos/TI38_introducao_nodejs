-- Criação do banco de dados
CREATE DATABASE express_ti38;

-- Seleciona o banco de dados para uso
USE express_ti38;

-- Criação da tabela alunos
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nota1 DECIMAL(5,2),
    nota2 DECIMAL(5,2),
    nota3 DECIMAL(5,2),
    nota4 DECIMAL(5,2)
);
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    professor VARCHAR(100) NOT NULL
);
