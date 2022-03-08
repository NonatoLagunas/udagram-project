import { Router, Request, Response } from 'express';
import { isValidUrl, filterImageFromURL, deleteLocalFiles } from '../../../../util/util';
//import * as AWS from '../../../../aws';

const router: Router = Router();

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
router.get('/', async(request : Request, response : Response) => {
    let { image_url } = request.query;

    if(!image_url)
    {
        return response.status(400).send({message : 'Image url is required.'});
    }

    if(!isValidUrl(image_url))
    {
        return response.status(400).send({message : 'Image url is not a valid url.'});
    }

    var image_path : string = "";
    try{
        image_path = await filterImageFromURL(image_url);
    }
    catch
    {
        return response.status(422).send({message : 'Image url cannot be processed.'})
    }
    finally
    {
        response.on('finish', async () => { 
            await deleteLocalFiles([image_path]); 
        }).
        status(200).sendFile(image_path);
    }
});

export const FilteredImageRouter: Router = router;