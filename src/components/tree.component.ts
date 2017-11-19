import * as Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { ITreeNode, TreeNode } from 'models/node.model'
import { TreeNodeComponent } from './tree-node.component'

@Component({
  name: 'v-tree',
  template: require('./tree.component.html'),
  components: {
    vTreeNode: TreeNodeComponent
  }
})
export class TreeComponent extends Vue {

  private currentNode: TreeNode;

  constructor(){
    super();
    this.currentNode = this.rootNode;
  }

  @Prop
  rootNode: TreeNode

  @Prop({ default: (node) => { return node; } }) nodeClick: Function;

  selectNode(node) {
    this.currentNode.selected = false
    this.currentNode = node;
    this.currentNode.selected = true;
    this.nodeClick(this.currentNode);
  }

  removeSelectedNode() {
    if(this.currentNode.parent) {
      let index = this.currentNode.parent.children.indexOf(this.currentNode)
      this.currentNode.parent.children.splice(index,1)

      if( (index - 1) >= 0) {
        this.currentNode = this.currentNode.parent.children[index -1] as any;
        this.selectNode(this.currentNode)
      } else {
        this.currentNode = this.currentNode.parent as any;
        this.selectNode(this.currentNode)
      }
    }

    this.currentNode.reLabel(this.currentNode.parent || this.currentNode as any);
  }

  removeNode(node: TreeNode) {
    let parent = node.parent;
    let index = parent.children.indexOf(node)
    parent.children.splice(index,1);
    parent.reLabel(parent)

  }

  addNode(node: TreeNode) {
    node.parent = this.currentNode;
    this.currentNode.addChild(node);
    node.generateLabel(node);
  }

  getCurrentNode() {
    return this.currentNode;
  }
};