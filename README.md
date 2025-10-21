# ViewBus - Back-End

## Endpoints

### Auth
- `POST /register` `[Public]`: Cadastra um novo usuário (Admin);
- `POST /login` `[Public]`: Recebe o token de login do usuário (Admin).

### Admin
- `GET /admin` `[Auth]`: Retorna o usuário logado;
- `PUT /admin` `[Auth]`: Altera os dados do usuário;
- `DELETE /admin` `[Auth]`: Deleta a conta logada.

### Rota
- `GET /rota` `[Auth]`: Busca todas as rotas do usuário `(getByAdmin)`;
- `GET /rota/:id` `[Auth]`: Busca a rota com `id` fornecido;
- `POST /rota` `[Auth]`: Adiciona nova rota, atribuída ao usuário logado;
- `PUT /rota/:id` `[Auth]`: Altera a rota com `id` fornecido;
- `DELETE /rota/:id` `[Auth]`: Deleta a rota com `id` fornecido.
