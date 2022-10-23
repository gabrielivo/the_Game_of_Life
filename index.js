    function gamelife(){
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const resolu = 20;
canvas.width = 400;
canvas.height =400;

const linha = canvas.height / resolu;
const coluna = canvas.width / resolu;

function criarTab() {
    return new Array(coluna).fill(null).map(() => new Array(linha).fill(null).map(() => Math.floor(Math.random() * 2)));
}

let tab = criarTab();
requestAnimationFrame(atualizar)

function atualizar(){
    tab = nextGen(tab);
    renderizar(tab);
    requestAnimationFrame(atualizar)
}


function renderizar(tab){
    for(let col = 0; col < tab.length; col++ ){
        for(let lin = 0; lin < tab[col].length; lin++){
            const celula = tab[col][lin];
            contexto.beginPath();
            contexto.rect(col * resolu, lin * resolu, resolu, resolu);
            contexto.fillStyle = celula ? 'black': 'white';
            contexto.fill()
            contexto.stroke();

        }
    }
}

function nextGen(){
    const nextGen = tab.map(array_ => [...array_]);

    for(let col = 0; col < tab.length; col++){
        for(let lin = 0; lin < tab[col].length; lin++){            

            const celula = tab[col][lin]
            let num_vizinhos = 0

            for(let a = -1; a < 2; a++){
                for(b = -1; b < 2; b++ ){
                  
                    if(a === 0 && b === 0){ continue;}

                    const ver_cel1 = col + a;
                    const ver_cel2 = lin + b;

                    if(ver_cel1 >= 0 && ver_cel2 >= 0 && ver_cel1 < coluna && ver_cel2 < linha){
                        const vizinhos_atuais = tab[col + a][lin + b];
                        num_vizinhos += vizinhos_atuais;
                    }
                }
            }

            //regras
            if(celula === 1 && num_vizinhos > 3){
                nextGen[col][lin] = 0;
            } else if(celula === 1 && num_vizinhos < 2){
                nextGen[col][lin] = 0;
            } else if(celula === 0 && num_vizinhos === 3){
                nextGen[col][lin] = 1;
            }

         }
    }
    return nextGen;
}

}
