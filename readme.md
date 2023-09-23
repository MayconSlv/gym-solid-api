# app
 gympass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia; 

## RNs (Regras de negócio)

- [x] Usuário nao deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuário nao pode fazer check-in se nao estiver perto (100 metros) da academia;
- [ ] O check-in só pode ser validado até 20 minutos apos ser criado
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos nao funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicaçao precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
