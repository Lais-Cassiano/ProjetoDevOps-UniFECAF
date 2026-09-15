# Plataforma de microsserviços - Loja Veloz

Este projeto consiste no desenvolvimento de uma plataforma de pedidos em microsserviços para a "Loja Veloz", proposta no contexto da disciplina de Cloud DevOps: Orchestrating Containers and Micro Services. A solução simula um ambiente real de desenvolvimento e implantação, utilizando Docker e Docker Compose para conteinerização e execução local, Kubernetes para orquestração, GitHub Actions para automação do pipeline CI/CD e Docker Hub para publicação das imagens. O projeto também contempla práticas de segurança, observabilidade, escalabilidade e estratégias de deploy, buscando demonstrar uma arquitetura simples, organizada e alinhada às práticas de DevOps.



## Escopo do projeto

O projeto foi desenvolvido com foco em:

- Arquitetura baseada em microsserviços para gerenciamento de pedidos.
- Conteinerização das aplicações utilizando Docker e Docker Compose.
- Utilização do banco de dados PostgreSQL e persistência de dados.
- Orquestração de serviços utilizando Kubernetes.
- Configuração de Deployments, Services, ConfigMaps, Secrets e volumes persistentes.
- Aplicação de práticas básicas de segurança, como execução dos containers sem privilégios de root.
- Automação do processo de CI/CD utilizando GitHub Actions.
- Validação do código, construção e publicação das imagens Docker no Docker Hub.
- Utilização de HPA para escalabilidade automática e Rolling Update como estratégia de implantação.

A plataforma de pedidos da empresa Loja Veloz tem como requisitos a organização de suas funcionalidades em serviços independentes e também a utilização de ferramentas de DevOps para automatizar a construção, publicação, execução, monitoramento e escalabilidade da aplicação. A arquitetura foi desenvolvida priorizando simplicidade, organização e demonstração prática do desenvolvimento a partir de DevOps.



## Tecnologias e ferramentas utilizadas

Linguagens utilizadas:

- JavaScript, como linguagem de programação principal.
- YAML, como apoio na estruturação de dados e troca de informações.

Recursos utilizados:

- Node.js e Express.js para desenvolvimento das APIs e microsserviços.
- PostgreSQL para persistência de dados.
- Docker e Docker Compose para conteinerização e execução do ambiente local.
- Kubernetes para orquestração dos containers.
- ConfigMaps e Secrets para gerenciamento de configurações.
- GitHub Actions para automação do pipeline CI/CD.
- Docker Hub para publicação das imagens Docker.

Ferramentas:

- Visual Studio Code.
- Docker Desktop.
- Git.
- GitHub.
- Docker Hub.



## Instruções para execução do sistema

### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Docker Desktop.
- Git.
- Node.js 22 ou superior.

E habilitar o Kubernetes no Docker Desktop.

### 1. Clonar o repositório

Clone o projeto e acesse a pasta da aplicação:

```bash
git clone https://github.com/Lais-Cassiano/ProjetoDevOps-UniFECAF.git
cd ProjetoDevOps-UniFECAF
```

### 2. Executar com Docker Compose

O ambiente local possui os serviços de Pedidos, Estoque, Pagamentos, Gateway e PostgreSQL.

Para iniciar todos os serviços de uma vez, abra o terminal e execute:

```bash
docker compose up -d
```

Para verificar o estado dos containers:

```bash
docker compose ps
```

Com os serviços em execução, as páginas podem ser acessados pelos Endpoints:

- http://localhost:5350/pedidos
- http://localhost:5350/estoque
- http://localhost:5350/pagamentos

Para encerrar os serviços:

```bash
docker compose down
```

### 3. Executar com Kubernetes

Com o Kubernetes habilitado no Docker Desktop, e inicialização de um cluster, dentro do terminal aplique os manifests presentes na pasta `k8s`:

```bash
kubectl apply -f k8s/
```

Verifique os Deployments:

```bash
kubectl get deployments
```

Verifique os Pods:

```bash
kubectl get pods
```

Verifique os Services:

```bash
kubectl get services
```

Para acessar o Gateway localmente, utilize o port-forward:

```bash
kubectl port-forward service/gateway 30050:5350
```

Com o port-forward ativo, os Endpoints ficam disponíveis em:

- http://localhost:30050/pedidos
- http://localhost:30050/estoque
- http://localhost:30050/pagamentos


Para encerrar os recursos criados pelo projeto:

```bash
kubectl delete -f k8s/
```



## Arquitetura do Sistema

O sistema foi estruturado com uma arquitetura baseada em microsserviços, separando as principais responsabilidades da plataforma em serviços independentes. Essa organização facilita a manutenção, a escalabilidade e a evolução da aplicação, além de permitir a execução de cada serviço de forma isolada por meio de containers.

- **pedidos/**
  Contém o microsserviço responsável pelo gerenciamento de pedidos da plataforma.

- **estoque/**
  Contém o microsserviço responsável pelas operações relacionadas ao estoque de produtos.

- **pagamentos/**
  Contém o microsserviço responsável pelas operações relacionadas aos pagamentos.

- **gateway/**
  Contém o API Gateway, responsável por receber as requisições externas e encaminhá-las para os respectivos microsserviços.

- **Dockerfile**
  Cada microsserviço possui seu próprio Dockerfile, utilizado para criar sua imagem e definir o ambiente necessário para execução da aplicação.

- **docker-compose.yml**
  Arquivo responsável pela definição do ambiente local, configurando os microsserviços, banco de dados PostgreSQL, redes, volumes, portas e variáveis de ambiente para execução conjunta dos containers.

- **k8s/**
  Diretório que contém os manifests utilizados para implantação da aplicação no Kubernetes:

  - **Deployments:** responsáveis pelo gerenciamento dos Pods dos microsserviços e do PostgreSQL.
  - **Services:** responsáveis pela comunicação e exposição dos serviços dentro do cluster.
  - **ConfigMap:** utilizado para armazenar configurações do PostgreSQL.
  - **Secret:** utilizado para armazenar informações sensíveis do banco de dados.
  - **PersistentVolumeClaim (PVC):** responsável pela persistência dos dados do PostgreSQL.
  - **HPA:** responsável pela escalabilidade automática do Gateway.

- **metrics-server-patch.yaml:** configuração utilizada para possibilitar a coleta de métricas no ambiente Kubernetes.

- **.github/workflows/ci.yml**
  Arquivo responsável pela configuração do pipeline de CI/CD utilizando GitHub Actions. O workflow realiza a instalação das dependências, validação do código, construção das imagens Docker e publicação das imagens no Docker Hub.



## CI/CD

O projeto utiliza **GitHub Actions** para automatizar o processo de integração contínua. A cada alteração enviada ao repositório, o pipeline realiza a instalação das dependências, validação dos arquivos JavaScript e construção das imagens Docker dos microsserviços.

Após a validação e construção, as imagens são publicadas no **Docker Hub**, utilizando credenciais armazenadas de forma segura como **GitHub Secrets**. Dessa forma, o processo de construção e publicação dos artefatos é automatizado.



## Considerações sobre desempenho e escalabilidade

A arquitetura da Loja Veloz foi estruturada utilizando microsserviços, permitindo que cada serviço possa ser executado e escalado de forma independente conforme a necessidade da aplicação.

No ambiente Kubernetes, foi configurado o **Horizontal Pod Autoscaler (HPA)** para o API Gateway, utilizando o consumo de CPU como métrica. O Gateway pode variar entre 1 e 3 réplicas, com objetivo de aumentar a capacidade de atendimento quando houver maior utilização dos recursos.

Também foi utilizado o **Metrics Server** para disponibilizar métricas de utilização de CPU e memória dos Pods, permitindo acompanhar o consumo dos recursos do sistema e fornecer dados para o funcionamento do HPA.

Como estratégia de atualização, foi adotado o **Rolling Update**, permitindo que novas versões dos serviços sejam implantadas gradualmente, reduzindo a possibilidade de indisponibilidade durante uma atualização.

A solução pode ser expandida futuramente com métricas mais detalhadas, ferramentas de monitoramento centralizado e estratégias adicionais de escalabilidade de acordo com o crescimento da aplicação e da demanda.



## Links

- **Imagens no Docker Hub:**
  - https://hub.docker.com/repository/docker/laiscassiano/loja-veloz-gateway
  - https://hub.docker.com/repository/docker/laiscassiano/loja-veloz-pagamentos
  - https://hub.docker.com/repository/docker/laiscassiano/loja-veloz-estoque
  - https://hub.docker.com/repository/docker/laiscassiano/loja-veloz-pedidos



## Licença

- Este projeto está licenciado sob a licença MIT:

Copyright 2026 Lais

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.