const assert = require('power-assert');

import QueueStore from '../src/renderer/stores/QueueStore'
import { Context } from 'material-flux';

let queueStore;
describe('QueueStore', function() {

  beforeEach(() => {
    let context = new Context();
    queueStore = new QueueStore(context);
    queueStore.state.queue = [1, 2, 3];
    queueStore.state.nowIndex = 1;
  });

  it('add last single', () => {
    queueStore._addLast(0);
    let result = queueStore.getQueue();
    assert(result.toString() == [1, 2, 3, 0].toString());
  });

  it('add last Array', () => {
    queueStore._addLast([0, 0, 0]);
    let result = queueStore.getQueue();
    assert(result.toString() === [1, 2, 3, 0, 0, 0].toString());
  });


  it('add next single', () => {
    queueStore._addNext(0);
    let result = queueStore.getQueue();
    assert(result.toString() === [1, 2, 0, 3].toString());
  });

  it('add next Array', () => {
    queueStore._addNext([0, 0, 0]);
    let result = queueStore.getQueue();
    assert(result.toString() === [1, 2, 0, 0, 0, 3].toString());
  });

  it('put forward', () => {
    queueStore._putForward();
    assert(queueStore.getNowPlaying() === 3);
  });

  it('when nowIndex is last in queue, putFowerd should change nowIndex to 0', () => {
    queueStore._putForward();
    queueStore._putForward();
    assert(queueStore.getNowPlaying() === 1);
  });

  it('put backward', () => {
    queueStore._putBackward();
    assert(queueStore.getNowPlaying() === 1);
  });

  it('when nowIndex is 0, putBackward should change nowIndex to last in queue', () => {
    queueStore._putBackward();
    queueStore._putBackward();
    assert(queueStore.getNowPlaying() === 3);
  });
});
