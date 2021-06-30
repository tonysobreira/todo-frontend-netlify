import React from 'react';

export const Home = () => {   

    return (

        <div className="card">
            <p>
                Como criar um nova lista: digite na url, após o último "/", 
                algum nome que deseja para ser o link do Todo 
                (Não pode ser vazio ou about).
            </p>
            <p>
                Como editar um lista: após a criação será redirecionado para a tela de 
                edição.
            </p>
        </div>
        
    );
}
