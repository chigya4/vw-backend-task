import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import { CheckoutData, CompanyDataBody, CustomerDataBody } from '../models/checkout.models';

const router = Router();

let checkoutDataArray: CheckoutData[] = [];

router.post(
  '/checkout',
  body('companyData.name').isLength({ min: 2, max: 60 }),
  body('companyData.name').isAlpha(),
  body('companyData.phone').isLength({ min: 2, max: 20 }),
  body('companyData.phone').isNumeric(),
  (req: Request & { body: CompanyDataBody }, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const data: CheckoutData = {
      id: uuidv4(),
      companyData: req.body.companyData,
    };
    checkoutDataArray.push(data);

    const msg = {
      status: '200 OK',
      message: 'New checkout created with id : ' + data.id,
    };
    res.status(200).json(msg);
  },
);

router.put(
  '/checkout/:id',
  body('customerData.firstName').isLength({ min: 2, max: 60 }),
  body('customerData.firstName').isAlpha(),
  body('customerData.lastName').isLength({ min: 2, max: 60 }),
  body('customerData.lastName').isAlpha(),
  body('customerData.zipCode').isLength({ min: 5, max: 5 }),
  body('customerData.zipCode').isNumeric(),
  body('customerData.mail').isEmail(),
  (req: Request & { body: CustomerDataBody }, res: Response) => {
    let indexFound;
    const findCheckoutData = checkoutDataArray.find((checkoutData, i) => {
      indexFound = i;
      return checkoutData.id === req.params.id
    })
    if (!findCheckoutData) {
      return res.status(404).json({ error: 'No data found for the id : ' + req.params.id });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    findCheckoutData.companyData = req.body.customerData
    checkoutDataArray.splice(indexFound, 1, findCheckoutData)
    const msg = {
      status: '200 OK',
    };
    res.json(msg);
  },
);

router.get('/checkout/:id', (req: Request, res: Response) => {
  const findCheckoutData = checkoutDataArray.find((checkoutData, i) => {
    return checkoutData.id === req.params.id
  })
  if (!findCheckoutData) {
    return res.status(404).json({ error: 'No data found for the id : ' + req.params.id });
  }
  const msg = {
    status: '200 OK',
    data: findCheckoutData,
  };
  res.json(msg);
});

export { router };
