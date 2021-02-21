export type Product= {
  id: string
  name: string
  bin: number
  cardNetwork: string
  config: { connectorURL: string }
  description: string
  version: string
  authPlans: string[]
};

export type cardNetworkInfo = {
  logoURL: string
  logoBgColor: string
};

export type cardNetworkLogos = {
  amex: cardNetworkInfo
  visa: cardNetworkInfo
  mastercard: cardNetworkInfo
  rupay: cardNetworkInfo
  maestro: cardNetworkInfo
};

export type jsonData = {
  products:Product[]
  cardNetworkLogos:cardNetworkLogos
};

export const aavAlgorithms = ['', 'SPA with CVC2', 'SPA with CVC2(without MerchantName hash)', 'SPA with HMAC', 'SPA with HMAC(without MerchantName hash)'];

export const cardNetworkOptions = ["visa", "mastercard", "rupay", "amex", "maestro"];

