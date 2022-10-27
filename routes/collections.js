import { Router } from 'express'
import * as collectionsCtrl from '../controllers/collections.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, collectionsCtrl.create)
router.get('/', checkAuth, collectionsCtrl.index)
router.get('/:id', checkAuth, collectionsCtrl.show)
router.put('/:id', checkAuth, collectionsCtrl.update)
router.delete('/:id', checkAuth, collectionsCtrl.delete)


export { router }