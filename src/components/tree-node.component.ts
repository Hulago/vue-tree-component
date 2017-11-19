import * as Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { ITreeNode } from 'models/node.model'

@Component({
  name: 'v-tree-node',
  template: require('./tree-node.component.html')
})
export class TreeNodeComponent extends Vue {

  @Prop
  node: ITreeNode

  @Prop({ default: (node) => { return node; }}) nodeClick: Function;

  selectNode(node) {
    this.nodeClick(node);
  }
};