const Filme = require("../models/Filmes");
let message = "";

const getAll = async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.render("index", {
      filmes,
      filmesPut: null,
      filmesDel: null,
      message,
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

//rota para pegar o id do filme selecionado
const getById = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    //encontrando o filme, e o find, tvai procurar a chave primaria que é o id, fazendo ele chegar como parametro.
    res.render("detalhes", {
      filme,
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

//rota de criação do filme
const criar = (req,res ) => {
    try{
        res.render("criar", {message});
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};
const criacao  = async (req,res) =>{
    try{
        const filme = req.body;//a requisição que vem do body, pegando os dados que vem do body
        if(
            !filme.nome ||
            !filme.descricao ||
            !filme.imagem
        ){
            message = "Preencha todos os campos para cadastro!"
            type = "danger";
            return res.redirect("/criar");
        }
        await Filme.create(filme);

        res.redirect('/')
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};

//rota editar filme
const editar1 = async (req,res) =>{
    const filme = await Filme.findByPk(req.params.id);
 
    if(!filme){
        res.render('editar', {
            message: "Filme não foi encontrado!"
        })
    }
    res.render('editar',{
        filme,
        message:''
    })

  

}

  //rota de editar do filme
  const editar = async (req,res) => {
      try{
          const filme = await Filme.findByPk(req.params.id);
          const {nome, descricao, imagem} = req.body;

          filme.nome = nome;
          filme.descricao = descricao;
          filme.imagem = imagem;

          const filmeEditado = await filme.save();
          /* res.render('editar', {
              filme: filmeEditado,
              messsage:'filme editado com sucesso'
          }) */
          res.redirect('/')
      }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
}

//rota delete
const deletar = async (req,res)=>{
    try{
        await Filme.destroy({where: {id: req.params.id}});
        message = 'filme removido com sucesso'
        res.redirect('/')
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
}
module.exports = {
  getAll,
  getById,
  criar,
  criacao,
  editar1,
  editar,
  deletar
};
