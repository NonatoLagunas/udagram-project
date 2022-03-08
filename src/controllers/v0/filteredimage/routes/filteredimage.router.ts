import { Router, Request, Response } from 'express';
//import * as AWS from '../../../../aws';

const router: Router = Router();

router.get('/', async(reques : Request, response : Response) => {
    response.send('TODO: filter image');
});

export const FilteredImageRouter: Router = router;