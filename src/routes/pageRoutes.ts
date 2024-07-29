    import { Router } from 'express';
    import { createPage, getPages, getPage, updatePage, deletePage } from '../controllers/pageController';

    const router = Router();

    router.post('/pages', createPage);
    router.get('/pages', getPages);
    router.get('/pages/:id', getPage);
    router.patch('/pages/:id', updatePage);
    router.delete('/pages/:id', deletePage);

    export default router;
