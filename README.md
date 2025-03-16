
<div id="top"></div>

## Table of the development environment

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E">
  
  <!-- フロントエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
  <!-- バックエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <!-- バックエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white">
  <!-- ミドルウェア一覧 -->
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">
  <!--<img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
  <img src="https://img.shields.io/badge/-Gunicorn-199848.svg?logo=gunicorn&style=for-the-badge&logoColor=white"> -->
  <!-- インフラ一覧 -->
<!--   <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
  <img src="https://img.shields.io/badge/-githubactions-FFFFFF.svg?logo=github-actions&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Amazon%20aws-232F3E.svg?logo=amazon-aws&style=for-the-badge">
  <img src="https://img.shields.io/badge/-terraform-20232A?style=for-the-badge&logo=terraform&logoColor=844EBA"> -->
</p>

## Table of contents

1. [Project](#Project)
2. [Environment](#Environment)
3. [Directory](#Directory)
4. [CrateDevelopmentEnvironment](#CreateDevelopmentEnvironment)
5. [Troubleshooting](#Troubleshooting)

<!-- READMEの作成方法のドキュメントのリンク -->
<!-- <br />
<div align="right">
    <a href="READMEの作成方法のリンク"><strong>READMEの作成方法 »</strong></a>
</div>
<br />
<!-- Dockerfileのドキュメントのリンク -->
<!-- <div align="right">
    <a href="Dockerfileの詳細リンク"><strong>Dockerfileの詳細 »</strong></a>
</div>
<br /> 
<!-- プロジェクト名を記載 -->

## AI Email Writer

<p><a href="https://github.com/Masahiro-jobson/AI-email-writer-backend.git">This</a> is the backend repository of AI-email-writer</p>

<!-- プロジェクトについて -->

## Project

<p>
   This project is AI Email Writer, which enables for users to create <br/>
  Email contents by sending prompts to the chatbot (used Gemini here).<br/>
  
   In the Backend side, I used SpringBoot framework. There are 4 classes such as <br/>
  EmailWriterApplication, EmailGeneratorController(Controller),  EmailGeneratorService (Service), EmailRequest.<br/>
  EmailWriterApplication is the main class for making the program run. EmailRequest handles<br/>
  Request from @Requestbody in the Controller with emailcontent and tone variables. Due to @Data, it is unnecessary to<br/>
  to make getter, setter, and constructor in this class.<br/>
 EmailGeneratorController has @RequestMapping, which sets the endpoint to "/api/email". In that class, EmailGeneratorService object is created. In other way, Constructor of the EmailGeneratorController is created automatically because of @AllArgsConstructor (Withou this annotation, EmailGenratorService bean object is created in the arguments and passed through).<br/>
ResponseEntity<String> is a class and return type (Spring Framework) of gnerateEmail method. @RequestBody inject the function of conversion from JSON to JAVA object, which refers to EmailRequest class in the arguments. The response variable stores the generateEmailReply method of emailGeneratorService class with the parenthesis "emailRequest". And return "response" String variable with .ok method of ResponseEntity.BodyBuilder.
</p>
<!-- プロジェクトの概要を記載 -->
<!-- 
  <p align="left">
    <br />
    プロジェクト詳細にBacklogのWikiのリンク 
    <a href="Backlogのwikiリンク"><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />　-->

<p align="right">(<a href="#top">Back to Top</a>)</p>
## Environment

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| Language・Framework  | Version |
| --------------------- | ---------- |
| Java                  | 17.0.10    |
| Spring Boot           | 3.4.3      |
| Node.js               | 22.14.0    |
| React                 | 19.0.0     |

For other package version, please refer to pom.xml and package.json.

<p align="right">(<a href="#top">Back to Top</a>)</p>

## Directory

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

❯ tree -I 'node_modules'
```bash
.
.
├── email-writer-backend
│   ├── HELP.md
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src
│       ├── main
│       │   ├── java
│       │   │   └── com
│       │   │       └── email
│       │   │           └── emai
│       │   │               └── writer
│       │   │                   ├── EmailGeneratorController.java
│       │   │                   ├── EmailGeneratorService.java
│       │   │                   ├── EmailRequest.java
│       │   │                   └── EmailWriterApplication.java
│       │   └── resources
│       │       ├── application.properties
│       │       ├── static
│       │       └── templates
│       └── test
│           └── java
│               └── com
│                   └── email
│                       └── emai
│                           └── writer
│                               └── EmailWriterApplicationTests.java
├── email-writer-ext
│   ├── content.css
│   ├── content.js
│   ├── hina_drawing.png
│   └── manifest.json
└── email-writer-frontend
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js


```

<p align="right">(<a href="#top">Back to Top</a>)</p>

## CreateDevelopmentEnvironment


<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->
<!-- 
### コンテナの作成と起動

.env ファイルを以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成

.env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=django-db
MYSQL_USER=django
MYSQL_PASSWORD=django
MYSQL_HOST=db
MYSQL_PORT=3306
SECRET_KEY=django
DJANGO_SETTINGS_MODULE=project.settings.local


.env ファイルを作成後、以下のコマンドで開発環境を構築 -->


### Check how it works

Check if you can access to http://127.0.0.1:8000
If so, it's successful.

<!-- 
<### コンテナの停止

以下のコマンドでコンテナを停止することができます

make down

### 環境変数の一覧

| 変数名                 | 役割                                      | デフォルト値                       | DEV 環境での値                           |
| ---------------------- | ----------------------------------------- | ---------------------------------- | ---------------------------------------- |
| MYSQL_ROOT_PASSWORD    | MySQL のルートパスワード（Docker で使用） | root                               |                                          |
| MYSQL_DATABASE         | MySQL のデータベース名（Docker で使用）   | django-db                          |                                          |
| MYSQL_USER             | MySQL のユーザ名（Docker で使用）         | django                             |                                          |
| MYSQL_PASSWORD         | MySQL のパスワード（Docker で使用）       | django                             |                                          |
| MYSQL_HOST             | MySQL のホスト名（Docker で使用）         | db                                 |                                          |
| MYSQL_PORT             | MySQL のポート番号（Docker で使用）       | 3306                               |                                          |
| SECRET_KEY             | Django のシークレットキー                 | secretkey                          | 他者に推測されないランダムな値にすること |
| ALLOWED_HOSTS          | リクエストを許可するホスト名              | localhost 127.0.0.1 [::1] back web | フロントのホスト名                       |
| DEBUG                  | デバッグモードの切り替え                  | True                               | False                                    |
| TRUSTED_ORIGINS        | CORS で許可するオリジン                   | http://localhost                   |                                          |
| DJANGO_SETTINGS_MODULE | Django アプリケーションの設定モジュール   | project.settings.local             | project.settings.dev                     |

### コマンド一覧

| Make                | 実行する処理                                                            | 元のコマンド                                                                               |
| ------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| make prepare        | node_modules のインストール、イメージのビルド、コンテナの起動を順に行う | docker-compose run --rm front npm install<br>docker-compose up -d --build                  |
| make up             | コンテナの起動                                                          | docker-compose up -d                                                                       |
| make build          | イメージのビルド                                                        | docker-compose build                                                                       |
| make down           | コンテナの停止                                                          | docker-compose down                                                                        |
| make loaddata       | テストデータの投入                                                      | docker-compose exec app poetry run python manage.py loaddata crm.json                      |
| make makemigrations | マイグレーションファイルの作成                                          | docker-compose exec app poetry run python manage.py makemigrations                         |
| make migrate        | マイグレーションを行う                                                  | docker-compose exec app poetry run python manage.py migrate                                |
| make show_urls      | エンドポイントをターミナル上で一覧表示                                  | docker-compose exec app poetry run python manage.py show_urls                              |
| make shell          | テストデータの投入                                                      | docker-compose exec app poetry run python manage.py debugsqlshell                          |
| make superuser      | スーパーユーザの作成                                                    | docker-compose exec app poetry run python manage.py createsuperuser                        |
| make test           | テストを実行                                                            | docker-compose exec app poetry run pytest                                                  |
| make test-cov       | カバレッジを表示させた上でテストを実行                                  | docker-compose exec app poetry run pytest --cov                                            |
| make format         | black と isort を使ってコードを整形                                     | docker-compose exec app poetry run black . <br> docker-compose exec app poetry run isort . |
| make update         | Poetry 内のパッケージの更新                                             | docker-compose exec app poetry update                                                      |
| make app            | アプリケーション のコンテナへ入る                                       | docker exec -it app bash                                                                   |
| make db             | データベースのコンテナへ入る                                            | docker exec -it db bash                                                                    |
| make pdoc           | pdoc ドキュメントの作成                                                 | docker-compose exec app env CI_MAKING_DOCS=1 poetry run pdoc -o docs application           |
| make init           | Terraform の初期化                                                      | docker-compose -f infra/docker-compose.yml run --rm terraform init                         |
| make fmt            | Terraform の設定ファイルをフォーマット                                  | docker-compose -f infra/docker-compose.yml run --rm terraform fmt                          |
| make validate       | Terraform の構成ファイルが正常であることを確認                          | docker-compose -f infra/docker-compose.yml run --rm terraform validate                     |
| make show           | 現在のリソースの状態を参照                                              | docker-compose -f infra/docker-compose.yml run --rm terraform show                         |
| make apply          | Terraform の内容を適用                                                  | docker-compose -f infra/docker-compose.yml run --rm terraform apply                        |
| make destroy        | Terraform で構成されたリソースを削除                                    | docker-compose -f infra/docker-compose.yml run --rm terraform destroy                      |

### リモートデバッグの方法

リモートデバッグ を使用する際は以下の url を参考に設定してください<br>
[Django のコンテナへリモートデバッグしよう！](https://qiita.com/shun198/items/9e4fcb4479385217c323)

## Troubleshooting

### .env: no such file or directory

.env ファイルがないので環境変数の一覧を参考に作成しましょう

### docker daemon is not running

Docker Desktop が起動できていないので起動させましょう

### Ports are not available: address already in use

別のコンテナもしくはローカル上ですでに使っているポートがある可能性があります
<br>
下記記事を参考にしてください
<br>
[コンテナ起動時に Ports are not available: address already in use が出た時の対処法について](https://qiita.com/shun198/items/ab6eca4bbe4d065abb8f)

### Module not found

make build

を実行して Docker image を更新してください-->

<p align="right">(<a href="#top">Back to Top</a>)</p>
