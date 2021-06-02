export class Wompi
{

    get apiMetodosValidos()
    {
        return  ['CARD', 'NEQUI', 'PSE', 'BANCOLOMBIA_TRANSFER', 'BANCOLOMBIA_COLLECT'];
    }

    get apiTransaccionEstado()
    {
        return ['PENDING', 'APPROVED', 'DECLINED', 'ERROR', 'VOIDED'];
    }

    constructor()
    {
        
    }

}

export default Wompi;