import {v4 as uuidv4} from 'uuid'
import { Game } from './games';

type Needle = Tree | string;

export class Tree {
  #children = new Map();
  #parent: Tree | null = null;
  #id = uuidv4();
  #move;
  #record = {
    losses: 0,
    wins: 0,
    draws: 0,
  };

  constructor(move: string) {
    this.#move = move;
  }

  get move() {
    return this.#move;
  }

  set move(move) {
    this.#move = move;
  }

  set record(record) {
    this.#record = record;
  }

  get id() {
    return this.#id;
  }

  get children() {
    return Array.from(this.#children.values());
  }

  set parent(newParent: Tree | null) {
    if (newParent !== this.parent) {
      this.#parent = newParent; 
    }
  }

  get parent() {
    return this.#parent;
  }

  get childrenCount() {
    return this.#children.size;
  }
  
  get record() {
    return this.#record;
  }

  createChild(move: string) {
    const node = new Tree(move);
    this.#children.set(node.id, node);
    node.parent = this;
    return node;
  }

  hasChild(needle: Needle) {
    if (needle instanceof Tree) {
      return this.#children.has(needle.id)
    }
    for (let child of this.children) {
      if (needle === child.move || needle === this.id) {
        return true;
      }
    }
    return false;
  }

  getChild(needle: Needle) {
    for (let child of this.children) {
      if (needle === child.move || needle === this.id) {
        return child;
      }
    }
    return null;
  }

  removeChild(needle: Needle) {
    if (!this.hasChild(needle)) return;

    if (needle instanceof Tree) {
      this.#children.delete(needle.id);
    } else {
      for (let child of this.children) {
        if (needle === child.move || needle === child.id) {
          this.#children.delete(child.id);
          break;
        }
      }
    }
  }

  #getTreeString = (node: Tree, spaceCount = 0) => {
    let str = "\n";
    node.children.forEach(child => {
      str += `${" ".repeat(spaceCount)}${child.move}${this.#getTreeString(child, spaceCount + 2)}`
    })
    return str;
  }

  print() {
    console.log(`${this.move}${this.#getTreeString(this, 2)}`);
  }
}

export const populateTree = (games: Game[], root: Tree) => {
  games.forEach(game => {
    const insert = (node: Tree, i: number) => {
      if (i === 20) return;
      const move = game.moves[i];
      const existingNode = node.getChild(move);
      if (!existingNode) {
        const newNode = node.createChild(move);
        insert(newNode, i+=1);
      } else {
        insert(existingNode, i+=1);
      }
    }
    insert(root, 0);
  })
}
