import * as assert from 'power-assert';
import { Kapacitor } from './kapacitor';
import * as Enums from './enums';

const config = {
  host: '127.0.0.1',
  db: 'test',
  rp: 'autogen'
}
const kapacitor = new Kapacitor(config);

const testInitTemplate = async () => {
  await kapacitor.dropTemplate()
  await kapacitor.initTemplate();
  const tmplList = (await kapacitor.connection.getTemplates()).templates;
  assert(tmplList.find(tmpl => tmpl.id === Enums.Template.Signal));
}

const testInitTask = async () => {
  await kapacitor.dropTask();
  await kapacitor.initTask();
  const taskList = (await kapacitor.connection.getTasks()).tasks;
  assert(taskList.find(task => task.id === Enums.Template.Signal));
}

describe('ns-kapacitor', () => {
  it('测试template初始化', testInitTemplate);
  it('测试task初期化', testInitTask);
});
