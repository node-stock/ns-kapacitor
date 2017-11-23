import { ITask, VarType } from 'kapacitor';
import * as Enums from './enums';

export const signal = (options: { db: string, rp: string }): ITask => {
  return {
    id: Enums.Template.Signal,
    templateId: Enums.Template.Signal,
    dbrps: [{ db: options.db, rp: options.rp }],
    status: 'enabled',
    vars: {
      measurement: {
        value: Enums.Template.Signal,
        type: VarType.String
      },
      info: {
        value: 'TRUE',
        type: VarType.Lambda
      },
      message: {
        value: `
<!everyone> 銘柄: {{ index .Tags "symbol"}}，信号: {{ index .Fields "notes"}}，方向: {{ index .Fields "side"}}，价格: {{ index .Fields "price"}}
          `,
        type: VarType.String
      },
      username: {
        value: '株神--重要的事情说2遍',
        type: VarType.String
      }
    }
  };
}
