'use babel';

import AtomMeanjsView from './atom-meanjs-view';
import { CompositeDisposable } from 'atom';

export default {

  atomMeanjsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomMeanjsView = new AtomMeanjsView(state.atomMeanjsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomMeanjsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-meanjs:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomMeanjsView.destroy();
  },

  serialize() {
    return {
      atomMeanjsViewState: this.atomMeanjsView.serialize()
    };
  },

  toggle() {
    console.log('AtomMeanjs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
