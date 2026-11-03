# Configuração do D.A.V.I. no Render (plano Free + SQLite)

## Variáveis de ambiente

Configure em Render > seu serviço > Environment:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_KEY=` (gere uma chave Laravel e mantenha-a estável entre deploys)
- `APP_URL=https://SEU-SERVICO.onrender.com`
- `LOG_CHANNEL=stderr`
- `DB_CONNECTION=sqlite`
- `DB_DATABASE=/var/www/html/database/database.sqlite`
- `SESSION_DRIVER=database`
- `CACHE_STORE=database`
- `QUEUE_CONNECTION=database`
- `ADMIN_NAME=Administrador D.A.V.I.`
- `ADMIN_EMAIL=seu-email-de-administrador`
- `ADMIN_PASSWORD=uma-senha-forte-e-exclusiva`
- `GEMINI_API_KEY=sua-chave-do-gemini` (somente se quiser ativar o chatbot)
- `GEMINI_MODEL=gemini-2.5-flash`

Não coloque senhas ou chaves no GitHub. Cadastre-as somente nas variáveis secretas do Render.

## Configuração do serviço

- Runtime: Docker
- Dockerfile: `Dockerfile` (na raiz do repositório)
- Health Check Path: `/up`
- Porta HTTP: `10000` (o Dockerfile já configura Apache nessa porta)
- Branch: `main`

O Dockerfile instala as dependências, compila o frontend com Node 22.18, executa as migrações e popula a biblioteca de conteúdos na inicialização.

## Atenção: SQLite no Render Free

O sistema funciona com SQLite, mas o filesystem de um Web Service Free é temporário. O banco pode ser perdido quando o serviço reiniciar, dormir ou receber um novo deploy. Não use essa configuração para armazenar denúncias reais ou dados sensíveis de forma permanente.

O plano Free também não oferece acesso Shell ao serviço. Por isso, o administrador inicial deve ser criado pelas variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` antes do deploy.

## E-mail

A verificação de e-mail e a recuperação de senha foram desativadas nesta versão de demonstração, porque o projeto não tem um provedor de e-mail configurado. Para reativá-las, configure SMTP ou Resend e depois habilite os recursos correspondentes em `config/fortify.php`.

## Importante sobre a versão do GitHub

O ZIP original estava 27 commits atrás de `origin/main` e continha alterações locais não commitadas. Não faça `git pull`, `git reset --hard` ou force push por cima do projeto sem antes guardar uma cópia e reconciliar essas alterações.
