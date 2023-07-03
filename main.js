 const cep = document.querySelector('#cep');
 const rua = document.querySelector('#rua');
 const numero = document.querySelector('#numero');
 const bairro = document.querySelector('#bairro');
 const cidade = document.querySelector('#cidade');
 const estado = document.querySelector('#estado');
 const formulario=document.querySelector('#formulario');

 const enderecos=JSON.parse(localStorage.getItem('endereco'))||[];

 enderecos.forEach(endereco=>console.log(endereco));

 cep.addEventListener('focusout',()=> buscaEndereco(cep.value));

     async function buscaEndereco(cepp){

         const cepString=String(cepp);

         if(cepString.length == 8){

             cep.classList.remove('cep_erro');

            try{

                let consultaCep= await fetch(`https://viacep.com.br/ws/${cepp}/json`);
                let cepConvertido = await consultaCep.json();

                if(cepConvertido.erro){

                    throw Error('Esse cep não existe');
                }
                    
                const endereco={

                    rua:cepConvertido.logradouro,
                    bairro:cepConvertido.bairro ,
                    cidade:value=cepConvertido.localidade,
                    estado: value=cepConvertido.uf
                }

                precheDadosEndereco(endereco);


            }catch(erro){

                cep.value='';
                rua.value='';
                bairro.value='';
                cidade.value='';
                estado.value='';
                cep.placeholder='Cep Inexistente';
                cep.classList.add('cep_erro');
                console.log(erro);

            }
    
         }else if(cepString.length < 8 || cepString.length > 8){

             cep.value='';
             cep.placeholder="Cep Invalido";
             cep.classList.add('cep_erro')
             rua.value='';
             bairro.value='';
             cidade.value='';
             estado.value='';
         }
        
     }


function precheDadosEndereco(endereco){
    rua.value=endereco.rua;
    bairro.value=endereco.bairro;
    cidade.value=endereco.cidade;
    estado.value=endereco.estado;
}

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();

    const endereco={
            
        rua:rua.value,
        numero:numero.value,
        bairro:bairro.value,
        cidade:cidade.value,
        estado:estado.value
                
        }
    
        enderecos.push(endereco);
        localStorage.setItem('endereco', JSON.stringify(enderecos))
        
        cep.value=''
        rua.value='';
        numero.value='';
        bairro.value='';
        cidade.value='';
        estado.value=''

    
 })

