import express from 'express';
import { getCompaniesByName, getCompanyById, getTotalCompanies } from '../db';
const router = express.Router();


router.route("/").get(async(req: any, res: any) => {
  const searchParam = req.query.search;
  const perPage = req.query.perPage || 12;
  const offset = req.query.offset || 0;
  try {
    const result = await getCompaniesByName(searchParam, parseInt(perPage), parseInt(offset));
    res.send(result);
  } catch (err) {
    res.status(500).send({error: "Une erreur s'est produite sur le serveur"});
  }
});

router.route("/total").get(async(req: any, res: any) => {
  try {
    const nameParam = req.query.name; 
    const result : any = await getTotalCompanies(nameParam);
    res.send(result)
  } catch(err) {
    console.log(err)
  }
});

router.route("/company").get(async(req: any, res: any) => {
  try {
    const idParam = req.query.id; 
    const result : any = await getCompanyById(idParam);
    res.send(result)
  } catch(err) {
    console.log(err)
  }
});

export default router;