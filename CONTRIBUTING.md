### Como contribuo com o projeto?

Para isso, é necessário que o contribuidor crie uma `fork` da `branch: main`<br>
Em seguida, deve-se criar um `pull-request` relacionado a `issue` que ele deseja resolver<br>
Ao enviar o ull-request, são necessários 3 pontos como critério de aceitação:

- `Descrição`: deve-se apresentar uma descrição mínima das alterações realizadas e uma explicação sobre o motivo do pull-request.
- `Código`: seu código deve seguir as especificações em [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- `Coesão`: seu código deve resolver os problemas e necessidades apresentadas na issue em questão

### Como iniciar o projeto?

Caso esteja no windows, irei apresentar um tutorial que funciona tanto em um computador pessoal quanto um da faculdade.

1 - Abra seu `Visual Studio Code` e pressione `Ctrl + J`
2 - No terminal que foi aberto, escreva `cd c:\xampp\htdocs`
3 - Abra seu Github e procure por este arquivo nos documentos do projeto
4 - Use este comando no terminal: git clone `https://github.com/Resfriado/osf.git` NOME_DA_PASTA(Opcional)
5 - Faça a autenticação com o Github se for necessário e use: `cd osf` ou `cd NOME_DA_PASTA`
6 - Use `code .` e você será redirecionado a pasta com o projeto totalmente funcional para desenvolvimento

### Como desenvolver o projeto?

### Instalar pacotes do package.json

Em máquina externa utilize `cmd` antes 

`npm i` ou `npm install`

### Rodar o projeto em modo de desenvolvimento

`npm run dev` (Note que esse "dev" existe no package.json na parte de scripts)

### Reiniciar o projeto em modo de desenvolvimento

`rs`

### Sincronizar o projeto com o github

Isso é para baixar o projeto caso alguém além de você tenha atualizado ele, feito algum
commit novo...

`git pull`

### Subir um novo commit

```
git add .
git commit -am "Alterei X Coisa"
git pull
git push
```
