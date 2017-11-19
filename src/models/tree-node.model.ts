import * as _ from 'lodash';
import * as uuid from 'uuid';

export interface ITreeNode {
  id?: string;
  label?: string;
  data?: any;
  selected?: boolean;
  collapse?: boolean;
  parent?: ITreeNode;
  children?: Array<ITreeNode>

  isRoot?: () => boolean;
  addChild?: (node: ITreeNode | any) => void;
  reLabel?: (node: ITreeNode | any) => void;
}

export class TreeNode implements ITreeNode {
  public id: string;
  public label: string;
  public data: any;
  public selected: boolean;
  public collapse: boolean;
  public parent: ITreeNode;
  public children: Array<ITreeNode>

  constructor(treeNode: ITreeNode) {
    this.id = _.get(treeNode, 'id', uuid.v4());
    this.parent = _.get(treeNode, 'parent', null);
    this.data = _.get(treeNode, 'data', null);
    this.selected = _.get(treeNode, 'selected', false);
    this.collapse = _.get(treeNode, 'collapse', false);
    this.children = _.get(treeNode, 'children', []);
    this.label = _.get(treeNode, 'label', this.generateLabel(this));
  }

  isRoot() {
    return this.parent === null
  }

  generateLabel(node = this) {
    // debugger
    if(node.isRoot()) {
      return ''
    } else {
      let index = node.parent.children.indexOf(node);
      if(node.parent.isRoot()) {
        node.label = `${index+1}`
      } else {
        node.label = `${node.parent.label}.${index+1}`
      }

      return node.label
      
    }
  }

  reLabel(node = this) {
    // debugger
    this.traverse(node, this.generateLabel)
  }

  traverse(node, fn) {
    fn(node)
    _.forEach(node.children, (child) => {
      this.traverse(child, fn)
    })
  }

  open(){
    this.collapse = false;
  }

  close(){
    this.collapse = true;
  }

  toggle() {
    this.collapse = !this.collapse
  }

  addChild(node: TreeNode) {
    this.children.push(node);
    node.data.descrition += node.label
  }
}