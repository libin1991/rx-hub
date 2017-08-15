import {Hub} from 'data-hub';
import Rx from 'rxjs';
import mainStore from '../stores/main';
import * as userServers from '../pipes/server/user';
import * as userActions from '../pipes/actions/user';

const hub = new Hub();

// store
hub.addPipe('store.state', () => {
  let state = mainStore.getState();
  let subject = new Rx.BehaviorSubject(state);
  mainStore.subscribe(subject);
  return subject;
});

hub.addPipe('store.commit', ({mutation, payload}) => {
  console.log('store.commit')
  mainStore.commit(mutation, payload);
  return Rx.Observable.of(1);
});

// actions
hub.addPipes('server.user', userServers);

// server
hub.addPipes('action.user', userActions);

export default hub;
