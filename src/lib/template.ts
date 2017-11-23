import { ITemplate } from 'kapacitor';
import * as Enums from './enums';

export const signal = (): ITemplate => {
  return {
    id: Enums.Template.Signal,
    type: 'stream',
    script: `
      var measurement string
      var info lambda
      var message string
      var username string
      stream
        |from()
          .measurement(measurement)
          .groupBy("symbol")
        |alert()
            .info(info)
            .message(message)
            .slack()
            .username(username)
  `.replace(/\n/g, '')
  }
}
