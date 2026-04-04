export const endpointDefs = [
  { method: 'GET',  route: 'me',                       file: 'me.get.js'                   },
  { method: 'POST', route: 'offer',                     file: 'offer.post.js'               },
  { method: 'GET',  route: 'trade-requests',            file: 'tradeRequests.get.js'        },
  { method: 'POST', route: 'trade-request/accept',      file: 'tradeRequest.accept.post.js' },
  { method: 'GET',  route: 'contract',                  file: 'contract.get.js'             },
  { method: 'POST', route: 'contract/confirm-payment',  file: 'paymentConfirm.post.js'      }
]
