import { Kapacitor as BaseKapacitor, VarType } from 'kapacitor';

import * as Enums from './enums';
import * as Tmpl from './template';
import * as Task from './task';

export interface IConfig {
  host: string,
  db: string,
  rp: string
}

export { Enums, Tmpl, Task };

/**
  * @class
  * @classdesc kapacitor监视模块
  */
export class Kapacitor {

  options: IConfig;
  connection: BaseKapacitor;

  constructor(options: IConfig) {
    this.options = options;
    this.connection = new BaseKapacitor({
      host: options.host
    });
  }

  async initTemplate() {
    const templates = (await this.connection.getTemplates()).templates;
    if (!templates.find(tmpl => tmpl.id === Enums.Template.Signal)) {
      await this.connection.createTemplate(Tmpl.signal());
    }
  }

  async initTask() {
    const tasks = (await this.connection.getTasks()).tasks;
    if (!tasks.find(task => task.id === Enums.Template.Signal)) {
      await this.connection.createTask(Task.signal({
        db: this.options.db,
        rp: this.options.rp
      }));
    }
  }

  async dropTemplate() {
    await this.connection.removeTemplate(Enums.Template.Signal);
  }

  async dropTask() {
    await this.connection.removeTask(Enums.Template.Signal);
  }
}
