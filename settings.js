export default {
  paypalEnv: 'production', // production || sandbox
  paypalClientApi: {
    sandbox: 'ATlMMD8bGwO1laAg3BeWFW7M7kK94BO4UDEHVQ7nDXuA2faFQQMV-z77UtFyzAkaWyU2_DRayCSXk7n3',
    production: 'AWq0NJTOCegm-zFm33QYiGSponxtW7IZv3Vt3Y_akZ7Y0BcGENtl0JJHmlcoLNW5g_oPs7tB6s56ntPn'
  },
  stripeApiKey: process.env.NODE_ENV === 'production' ? 'pk_live_7TQbRrqhsxdsNDGukBrlUh8O' : 'pk_test_rIqrmLUxV5BDbXNxN9BhyEAY',
  shipping: {
    amountFree: 45,
    canarias: {
      standard: { type: 'canariasStandard', price: 10 },
      fast: { type: 'canariasFast', price: 35 }
    },
    peninsula: {
      standard: { type: 'standard', priceMadrid: 4.5, price: 5 },
      saturday: { type: 'saturday', price: 11, priceDiscount: 6 }
    }
  },
  bank_account: 'IBAN: ES75 0182 0936 0402 0162 6283'
};
