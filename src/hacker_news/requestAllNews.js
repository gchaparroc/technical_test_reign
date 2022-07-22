const fetch = require("node-fetch");
const cron = require('node-cron');
var { Pool } = require('pg');
const { date } = require("joi");

var hoy = new Date();
var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

console.log(`Hoy ${fecha} a las ${hora} Iniciamos el proceso.`);

cron.schedule('0 * * * *', () => {
  console.log('Corriendo tarea cada 1 hora');

  fetch('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', {
    method: 'GET',
  })
    .then(function(response) {
      //console.log(response);
      return response.json();
    })
    .then(function(data) {
      procesarData(data);
    })
    .catch(function(err) {
      console.error(err);
    });

    function procesarData(data){

      const pool = new Pool({
        user: 'nico',
        host: 'localhost',
        database: 'my_store',
        password: 'admin123',
        port: '5432'
      });
      module.exports = { pool };
      var iterador = 0;
      const info = data.hits.map((item) => {
        if(item.author === null){
          item.author = 'Sin autor';
        }
        let autor = item.author.replace(/[^a-zA-Z ]/g, "");
        if(item.title === null){
          item.title = 'Sin titulo';
        }
        let titulo = item.title.replace(/[^a-zA-Z ]/g, "");
        if(item.comment_text === null){
          item.comment_text = 'Sin Comentario';
        }
        //console.log("Antes: "+item.comment_text);
        let comentario = item.comment_text.replace(/[^a-zA-Z ]/g, "");
        //console.log("Despues: "+comentario);
        //console.log("****************************************************");
        const res = pool.query(
          `INSERT INTO notice (title, author, comment_text) VALUES ('${titulo}', '${autor}', '${comentario}')`
        );
        iterador++;
      });
      var hoyTermino = new Date();
      var fechaTermino = hoyTermino.getDate() + '-' + ( hoyTermino.getMonth() + 1 ) + '-' + hoyTermino.getFullYear();
      var horaTermino = hoyTermino.getHours() + ':' + hoyTermino.getMinutes() + ':' + hoyTermino.getSeconds();
      console.log(`${iterador}: Hoy ${fechaTermino} a las ${horaTermino} finalizamos el proceso.`);
    }



});  //FIN del cron
