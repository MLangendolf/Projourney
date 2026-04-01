# PROJOURNEY

---

O **Projourne** é um projeto acadêmico desenvolvido por estudantes do curso de Tecnologia de Sistemas para a Internet - TSI - do Instituto Federal de Pernambuco, Campos Igarassu. O mesmo tem, na sua origem, como principal objetivo o redirecionamento de seus usuários para cursos onlines gratuitos com boa aprovação ou avaliação  popular. Permitindo seguir uma sequencia de cursos online,  denominadas como **Trilas**, que formam o conteúdo educacional necessário para uma determinada formação profissional ou pessoal.

---

## Recursos disponíveis:

- Seguir trilhas de estudos;
- Mural de cursos divulgados por instituições de ensino.

## Recursos futuros:

- Criar trilhas personalizadas com os cursos ofertados; 
- Avaliar/comentar os cursos.

---

## Principais Dependências:

1. **Frontend:**
    - Node.js v22.22.1
    - nmp 10.9.4

1. **Backend:**
    - PHP version 8.5.0
        - php-mysql
    - Conposer 2.8.12
    - mysql-server 8.0


## Instalação:

1. **api_php:**
    - Executar o comando ```composer install```;
    - Criar e configurar arquivo de variáveis de ambiente (```.env```);

1. **frontend_react:**
    - Executar o comando ```npm install```;
    - Criar e configurar arquivo de variáveis de ambiente (```.env```);

1. **Banco de Dados:**
    - Ter instalado o SGBD MySQL;
    - Popular o banco de dados com o script SQL do arquivo "db_backup_projourney_php.sql": 
        - ```mysql -u <usuário> -p < db_backup_projourney_php.sql```

## Arquitetura do Software Para Essa Versão:
```
Projourney
.
├── api_php
│   ├── banco
│   │   ├── db_backup_projournei_php.sql
│   │   └── db_projourney_php.sql
│   ├── composer.json
│   ├── composer.lock
│   ├── css
│   │   └── styles.css
│   ├── src
│   │   ├── atualizar_progresso.php
│   │   ├── auth.php
│   │   ├── cadastrar_aluno.php
│   │   ├── cursos_da_trilha.php
│   │   ├── db.php
│   │   ├── delete_user_trail.php
│   │   ├── index.php
│   │   ├── inscrever_trilha.php
│   │   ├── listar_trilhas.php
│   │   ├── login.php
│   │   └── perfil_aluno.php
│   └── vendor
├── frontend_react
│   ├── dist
│   │   ├── teste2.js
│   │   └── teste.js
│   ├── index.html
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   └── image
│   ├── README.md
│   ├── src
│   │   ├── app.tsx
│   │   ├── assets
│   │   ├── components
│   │   ├── config
│   │   ├── lib
│   │   ├── main.tsx
│   │   ├── pages
│   │   └── types
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tutorial.md
│   └── vite.config.ts
└── README.md

210 directories, 32 files
```

## Desenvolvedores que contribuíram e os que ainda contribuem para o projeto:

* [Matheus Langendolf](https://github.com/MLangendolf)
* [Cristiano Caldas](https://github.com/Criswxyz)
* [Gabriel Saruba](https://github.com/gabrielsaruba)
* [Arthur Pontes](https://github.com/apmrnh)
* [Maviael Melo](https://github.com/MaviMelo)
* [Gabriel Henrique](https://github.com/)
* [Victor](https://github.com/)
* [Diego](https://github.com/Diego-jpeg-27)

## Professores orientadores ao longo do projeto:
* [Liliane](https://github.com/lilialnas)
* [Emaur Florêncio](https://github.com/)
* [Macone J. Silva](https://github.com/)

