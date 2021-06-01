// Terceros
import { Router } from 'express';
import { check } from 'express-validator'
const router = Router();

// Controladores
import { getCategoria, getCategorias, postCategoria, putCategoria, deleteCategoria } from '../controllers/categorias';

// Helpers y middlewares
import { categoriaExiste, categoriaNoExiste } from '../helpers/dbv-categoria';
import { validarCampos } from '../middlewares/validar-campos';

// Rutas

// Obtener todas las categorías | !query: estado=false
router.get('/', getCategorias); 

// Obtener una categoría | !query: estado=false
router.get('/:id_categoria',
[
    check('id_categoria').custom( categoriaNoExiste ),
    validarCampos
], getCategoria);

// Crear un usuario
router.post('/',
[
    check('nombre', 'El nombre de la categoría es obligatorio').notEmpty(),
    validarCampos
], postCategoria);

router.put('/:id_categoria',
[
    check('id_categoria').custom( categoriaNoExiste ),
    validarCampos
], putCategoria);

router.delete('/:id_categoria',
[
    check('id_categoria').custom( categoriaNoExiste ),
    validarCampos
], deleteCategoria);

export default router;