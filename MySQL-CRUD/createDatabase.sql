use express_ti38:
CREATE TABLE funcionario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    funcao VARCHAR(50),
    salario DECIMAL(10, 2)
);
CREATE TABLE Setores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    referencia VARCHAR(100)
);
