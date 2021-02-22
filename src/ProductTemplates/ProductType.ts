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


