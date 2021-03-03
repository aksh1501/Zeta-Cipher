export type Product= {
  id: string
  name: string
  bin: string
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
  products:Array<Product>
  cardNetworkLogos:cardNetworkLogos
};


