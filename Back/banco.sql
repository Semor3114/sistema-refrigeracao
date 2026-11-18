CREATE TABLE equipamento (
    eqp_id SERIAL PRIMARY KEY,
    eqp_nome VARCHAR(100) NOT NULL,
    eqp_tipo VARCHAR(50) NOT NULL,
    eqp_marca VARCHAR(50),
    eqp_potencia_btu INTEGER
);

INSERT INTO equipamento (eqp_nome, eqp_tipo, eqp_marca, eqp_potencia_btu) VALUES
('Split Inverter Sala', 'Ar-condicionado', 'LG', 12000),
('Geladeira Frost Free', 'Geladeira', 'Brastemp', NULL),
('Freezer Horizontal', 'Freezer', 'Consul', NULL);
