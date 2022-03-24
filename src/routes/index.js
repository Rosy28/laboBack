const { Router } = require('express');
const router = Router();

const { getPacient,
    getPacientById,
    createPacient,
    deletePacient,
    updatePacient } = require('../controllers/pacient.controller');

const { authentication,
    protectedRoutes } = require('../controllers/login.controller');

const { getLab,
    getLabById,
    createLab,
    deleteLab,
    updateLab } = require('../controllers/lab.controller');

const { getRecep,
    getRecepById,
    createRecep,
    deleteRecep,
    updateRecep } = require('../controllers/recep.controller');

const { getAnalysis,
    getAnalysisById,
    createAnalysis,
    deleteAnalysis,
    updateAnalysis } = require('../controllers/analysis.controller');

const { getAnalysisOrder,
    getAnalysisOrderByNameP,
    getAnalysisOrderByNameL,
    createAnalysisOrder,
    deleteAnalysisOrder,
    updateAnalysisOrder } = require('../controllers/analysisOrder.controller');

const { createPdf } = require('../services/pdf.js');

router.get('/pacients', getPacient);
router.get('/pacients/:id', getPacientById);
router.post('/pacients', createPacient);
router.delete('/pacients/:id', deletePacient);
router.put('/pacients/:id', updatePacient);

router.post('/login', authentication);

router.get('/labs', getLab);
router.get('/labs/:id', getLabById);
router.post('/labs', createLab);
router.delete('/labs/:id', deleteLab);
router.put('/labs/:id', updateLab);

router.get('/receps', getRecep);
router.get('/receps/:id', getRecepById);
router.post('/receps', createRecep);
router.delete('/receps/:id', deleteRecep);
router.put('/receps/:id', updateRecep);

router.get('/analysis', getAnalysis);
router.get('/analysis/:id', getAnalysisById);
router.post('/analysis', createAnalysis);
router.delete('/analysis/:id', deleteAnalysis);
router.put('/analysis/:id', updateAnalysis);

router.get('/analysisOrder', getAnalysisOrder);
router.get('/analysisOrderP/:id', getAnalysisOrderByNameP);
router.get('/analysisOrderL/:id', getAnalysisOrderByNameL);
router.get('/analysisOrderPR', createPdf);
router.post('/analysisOrder', createAnalysisOrder);
router.delete('/analysisOrder/:id', deleteAnalysisOrder);
router.put('/analysisOrder', updateAnalysisOrder);

module.exports = router;